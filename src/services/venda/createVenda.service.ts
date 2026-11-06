import { parseId } from "../../utils/id"
import { AppError } from "../../../error"
import { AppDataSource } from "../../connection"
import { Produto, Venda } from "../../entities"
import { CreateVenda } from "../../schemas/venda.schemas"

export const createVendaService = async (vendaData: CreateVenda): Promise<Venda> => {
    const vendaRepository = AppDataSource.getRepository(Venda)
    const produtoRepository = AppDataSource.getRepository(Produto)

    const produto: Produto | null = await produtoRepository.findOne({
        where: { id: parseId(vendaData.produtoId) }
    })
    if (!produto) {
        throw new AppError("Produto não encontrado", 404)
    }

    //SE A MARIA NÃO INFORMAR PREÇO/CUSTO, USA O QUE ESTÁ CADASTRADO NO PRODUTO
    const createVenda = vendaRepository.create({
        quantidade: vendaData.quantidade,
        data: vendaData.data,
        preco: String(vendaData.preco ?? produto.preco),
        custo: String(vendaData.custo ?? produto.custo),
        produtonome: produto.nome,
        produtoid: produto.id
    })
    await vendaRepository.save(createVenda)

    return createVenda
}