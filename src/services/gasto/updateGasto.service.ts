import { parseId } from "../../utils/id"
import { AppError } from "../../../error"
import { AppDataSource } from "../../connection"
import { Despesa as Gasto } from "../../entities/despesa.entitie"
import { UpdateGasto } from "../../schemas/gasto.schemas"

export const updateGastoService = async (gastoId: string, gastoData: UpdateGasto): Promise<Gasto> => {
    const gastoRepository = AppDataSource.getRepository(Gasto)

    const findGasto: Gasto | null = await gastoRepository.findOne({
        where: { id: parseId(gastoId) }
    })
    if (!findGasto) {
        throw new AppError("Gasto não encontrado", 404)
    }

    //JUNTA OS DADOS NOVOS COM OS QUE JÁ EXISTEM E SALVA
    Object.assign(findGasto, gastoData)
    if (gastoData.valor !== undefined) findGasto.valor = String(gastoData.valor)
    await gastoRepository.save(findGasto)

    return findGasto
}