import { Raw } from "typeorm"
import { AppDataSource } from "../../connection"
import { Gasto, Produto, Venda } from "../../entities"

//AQUI FICAM AS CONTAS DO NEGÓCIO DA MARIA
// RECEITA        = quantidade x preço de venda
// CUSTO PRODUTOS = quantidade x custo de produção
// LUCRO BRUTO    = receita - custo dos produtos
// LUCRO LÍQUIDO  = lucro bruto - gastos fixos (internet, luz, água...)

interface Totais {
    receita: number,
    custoProdutos: number,
    lucroBruto: number,
    gastosFixos: number,
    lucroLiquido: number,
    quantidade: number
}

//ARREDONDA PRA 2 CASAS (EVITA 0.30000000000000004)
const arredondar = (valor: number): number => Math.round(valor * 100) / 100

//"2026-11" -> "2026-10"
const mesAnterior = (mes: string): string => {
    const [ano, numeroMes] = mes.split("-").map(Number)
    const data = new Date(ano!, numeroMes! - 2, 1)
    return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`
}

const buscarVendas = async (mes: string): Promise<Venda[]> => {
    return await AppDataSource.getRepository(Venda).find({
        where: { data: Raw((coluna) => `to_char(${coluna}, 'YYYY-MM') = :mes`, { mes }) }
    })
}

const buscarGastos = async (mes: string): Promise<Gasto[]> => {
    return await AppDataSource.getRepository(Gasto).find({ where: { mes } })
}

const calcularTotais = (vendas: Venda[], gastos: Gasto[]): Totais => {
    let receita = 0
    let custoProdutos = 0
    let quantidade = 0

    vendas.forEach((venda) => {
        receita += (venda.quantidade ?? 0) * Number(venda.preco)
        custoProdutos += (venda.quantidade ?? 0) * Number(venda.custo)
        quantidade += (venda.quantidade ?? 0)
    })

    const gastosFixos = gastos.reduce((total, gasto) => total + Number(gasto.valor ?? 0), 0)
    const lucroBruto = receita - custoProdutos

    return {
        receita: arredondar(receita),
        custoProdutos: arredondar(custoProdutos),
        lucroBruto: arredondar(lucroBruto),
        gastosFixos: arredondar(gastosFixos),
        lucroLiquido: arredondar(lucroBruto - gastosFixos),
        quantidade
    }
}

export const getResumoService = async (mes: string) => {
    const vendas = await buscarVendas(mes)
    const gastos = await buscarGastos(mes)
    const anterior = mesAnterior(mes)

    const atual: Totais = calcularTotais(vendas, gastos)
    const totaisAnterior: Totais = calcularTotais(await buscarVendas(anterior), await buscarGastos(anterior))

    //VALORES DIA A DIA, PRO GRÁFICO
    const [ano, numeroMes] = mes.split("-").map(Number)
    const diasNoMes: number = new Date(ano!, numeroMes!, 0).getDate()
    const porDia = []
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const dataDia = `${mes}-${String(dia).padStart(2, "0")}`
        const vendasDoDia = vendas.filter((venda) => venda.data === dataDia)
        const totaisDia = calcularTotais(vendasDoDia, [])
        porDia.push({ dia, receita: totaisDia.receita, lucroBruto: totaisDia.lucroBruto, quantidade: totaisDia.quantidade })
    }

    //VENDAS AGRUPADAS POR PRODUTO
    const agrupado: Record<string, { nome: string, quantidade: number, receita: number, lucroBruto: number }> = {}
    vendas.forEach((venda) => {
        const nome = (venda.produtonome ?? "Produto sem nome")
        if (!agrupado[nome]) {
            agrupado[nome] = { nome, quantidade: 0, receita: 0, lucroBruto: 0 }
        }
        agrupado[nome].quantidade += (venda.quantidade ?? 0)
        agrupado[nome].receita = arredondar(agrupado[nome].receita + (venda.quantidade ?? 0) * Number(venda.preco))
        agrupado[nome].lucroBruto = arredondar(agrupado[nome].lucroBruto + (venda.quantidade ?? 0) * (Number(venda.preco) - Number(venda.custo)))
    })
    const porProduto = Object.values(agrupado).sort((a, b) => b.receita - a.receita)

    //PONTO DE EQUILÍBRIO: QUANTO FALTA DE LUCRO BRUTO PRA PAGAR OS GASTOS FIXOS
    //E QUANTAS UNIDADES DE CADA PRODUTO ISSO DÁ
    const falta: number = Math.max(0, arredondar(atual.gastosFixos - atual.lucroBruto))
    const progresso: number = atual.gastosFixos === 0
        ? 100
        : Math.min(100, Math.round((atual.lucroBruto / atual.gastosFixos) * 100))

    const produtosAtivos: Produto[] = await AppDataSource.getRepository(Produto).find({ where: { ativo: true } })
    const unidadesParaEquilibrio = produtosAtivos
        .filter((produto) => Number(produto.preco) - Number(produto.custo) > 0)
        .map((produto) => {
            const margem = Number(produto.preco) - Number(produto.custo)
            return {
                nome: produto.nome,
                margem: arredondar(margem),
                //UNIDADES QUE FALTAM VENDER NO MÊS
                faltam: Math.ceil(falta / margem),
                //UNIDADES QUE PRECISA VENDER NO MÊS TODO PRA PAGAR OS GASTOS FIXOS
                total: Math.ceil(atual.gastosFixos / margem)
            }
        })

    return {
        mes,
        mesAnterior: anterior,
        atual,
        anterior: totaisAnterior,
        porDia,
        porProduto,
        equilibrio: {
            falta,
            progresso,
            produtos: unidadesParaEquilibrio
        }
    }
}