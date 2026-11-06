import { AppDataSource } from "../../connection"
import { Despesa as Gasto } from "../../entities/despesa.entitie"

//SE VIER O MÊS ("2026-11"), DEVOLVE SÓ OS GASTOS DAQUELE MÊS
export const getGastosService = async (mes?: string): Promise<Gasto[]> => {
    const gastoRepository = AppDataSource.getRepository(Gasto)

    const gastos: Gasto[] = await gastoRepository.find({
        where: mes ? { mes } : {},
        order: { mes: "DESC", descricao: "ASC" }
    })

    return gastos
}