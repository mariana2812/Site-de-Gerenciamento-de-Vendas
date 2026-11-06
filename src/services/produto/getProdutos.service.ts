import { AppDataSource } from "../../connection"
import { Produto } from "../../entities/produto.entitie"

export const getProdutosService = async (): Promise<Produto[]> => {
    const produtoRepository = AppDataSource.getRepository(Produto)

    //ORDEM ALFABÉTICA
    const produtos: Produto[] = await produtoRepository.find({
        order: { nome: "ASC" }
    })

    return produtos
}