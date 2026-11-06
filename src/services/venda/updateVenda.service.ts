import { parseId } from "../../utils/id"
import { AppError } from "../../../error"
import { AppDataSource } from "../../connection"
import { Produto, Venda } from "../../entities"
import { UpdateVenda } from "../../schemas/venda.schemas"

export const updateVendaService = async (vendaId: string, vendaData: UpdateVenda): Promise<Venda> => {
    const vendaRepository = AppDataSource.getRepository(Venda)
    const produtoRepository = AppDataSource.getRepository(Produto)

    const findVenda: Venda | null = await vendaRepository.findOne({
        where: { id: parseId(vendaId) },    })
    if (!findVenda) {
        throw new AppError("Venda não encontrada", 404)
    }

    //SE TROCOU O PRODUTO DA VENDA, ATUALIZA O NOME E A LIGAÇÃO
    if (vendaData.produtoId && parseId(vendaData.produtoId) !== findVenda.produtoid) {
        const produto: Produto | null = await produtoRepository.findOne({
            where: { id: parseId(vendaData.produtoId) }
        })
        if (!produto) {
            throw new AppError("Produto não encontrado", 404)
        }
        findVenda.produtoid = produto.id
        findVenda.produtonome = produto.nome
    }

    //QUALQUER CAMPO PODE SER EDITADO
    if (vendaData.quantidade !== undefined) findVenda.quantidade = vendaData.quantidade
    if (vendaData.data !== undefined) findVenda.data = vendaData.data
    if (vendaData.preco !== undefined) findVenda.preco = String(vendaData.preco)
    if (vendaData.custo !== undefined) findVenda.custo = String(vendaData.custo)

    await vendaRepository.save(findVenda)

    return findVenda
}