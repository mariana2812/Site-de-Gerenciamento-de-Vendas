import { parseId } from "../../utils/id"
import { AppError } from "../../../error"
import { AppDataSource } from "../../connection"
import { Venda } from "../../entities/venda.entitie"

export const deleteVendaService = async (vendaId: string): Promise<void> => {
    const vendaRepository = AppDataSource.getRepository(Venda)

    const findVenda: Venda | null = await vendaRepository.findOne({
        where: { id: parseId(vendaId) }
    })
    if (!findVenda) {
        throw new AppError("Venda não encontrada", 404)
    }

    await vendaRepository.remove(findVenda)
}