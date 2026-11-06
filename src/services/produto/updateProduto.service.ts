import { parseId } from "../../utils/id"
import { AppError } from "../../../error"
import { AppDataSource } from "../../connection"
import { Produto } from "../../entities/produto.entitie"
import { UpdateProduto } from "../../schemas/produto.schemas"

export const updateProdutoService = async (produtoId: string, produtoData: UpdateProduto): Promise<Produto> => {
    const produtoRepository = AppDataSource.getRepository(Produto)

    const findProduto: Produto | null = await produtoRepository.findOne({
        where: { id: parseId(produtoId) }
    })
    if (!findProduto) {
        throw new AppError("Produto não encontrado", 404)
    }

    //MUDAR O PREÇO AQUI NÃO MEXE NAS VENDAS QUE JÁ FORAM FEITAS
    //JUNTA OS DADOS NOVOS COM OS QUE JÁ EXISTEM E SALVA
    Object.assign(findProduto, produtoData)
    if (produtoData.preco !== undefined) findProduto.preco = String(produtoData.preco)
    if (produtoData.custo !== undefined) findProduto.custo = String(produtoData.custo)
    await produtoRepository.save(findProduto)

    return findProduto
}