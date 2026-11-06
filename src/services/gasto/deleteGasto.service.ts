import { parseId } from "../../utils/id"
import { AppError } from "../../../error"
import { AppDataSource } from "../../connection"
import { Despesa as Gasto } from "../../entities/despesa.entitie"

export const deleteGastoService = async (gastoId: string): Promise<void> => {
    const gastoRepository = AppDataSource.getRepository(Gasto)

    const findGasto: Gasto | null = await gastoRepository.findOne({
        where: { id: parseId(gastoId) }
    })
    if (!findGasto) {
        throw new AppError("Gasto não encontrado", 404)
    }

    await gastoRepository.remove(findGasto)
}