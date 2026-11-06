import { AppDataSource } from "../../connection"
import { Despesa as Gasto } from "../../entities/despesa.entitie"
import { CreateGasto } from "../../schemas/gasto.schemas"

export const createGastoService = async (gastoData: CreateGasto): Promise<Gasto> => {
    const gastoRepository = AppDataSource.getRepository(Gasto)

    const createGasto = gastoRepository.create({
        descricao: gastoData.descricao,
        valor: String(gastoData.valor),
        mes: gastoData.mes
    })
    await gastoRepository.save(createGasto)

    return createGasto
}