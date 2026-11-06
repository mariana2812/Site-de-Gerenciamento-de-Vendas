import { AppDataSource } from "../../connection"
import { Produto } from "../../entities/produto.entitie"
import { CreateProduto } from "../../schemas/produto.schemas"

export const createProdutoService = async (produtoData: CreateProduto): Promise<Produto> => {
    const produtoRepository = AppDataSource.getRepository(Produto)

    const createProduto = produtoRepository.create({
        nome: produtoData.nome,
        preco: String(produtoData.preco),
        custo: String(produtoData.custo),
        ativo: produtoData.ativo ?? true
    })
    await produtoRepository.save(createProduto)

    return createProduto
}