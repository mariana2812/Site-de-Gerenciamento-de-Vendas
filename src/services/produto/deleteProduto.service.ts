import { parseId } from "../../utils/id"
import { AppError } from "../../../error"
import { AppDataSource } from "../../connection"
import { Produto } from "../../entities/produto.entitie"

export const deleteProdutoService = async (produtoId: string): Promise<void> => {
    const produtoRepository = AppDataSource.getRepository(Produto)

    const findProduto: Produto | null = await produtoRepository.findOne({
        where: { id: parseId(produtoId) }
    })
    if (!findProduto) {
        throw new AppError("Produto não encontrado", 404)
    }

    //AS VENDAS DESSE PRODUTO NÃO SÃO APAGADAS (onDelete: "SET NULL" NA ENTIDADE)
    //ELAS CONTINUAM COM O NOME, PREÇO E CUSTO QUE FORAM SALVOS NA HORA DA VENDA
    await produtoRepository.remove(findProduto)
}