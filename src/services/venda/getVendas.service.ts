import { Raw } from "typeorm"
import { AppDataSource } from "../../connection"
import { Venda } from "../../entities/venda.entitie"

//SE VIER O MÊS ("2026-11"), DEVOLVE SÓ AS VENDAS DAQUELE MÊS
export const getVendasService = async (mes?: string): Promise<Venda[]> => {
    const vendaRepository = AppDataSource.getRepository(Venda)

    const vendas: Venda[] = await vendaRepository.find({
        where: mes ? { data: Raw((coluna) => `to_char(${coluna}, 'YYYY-MM') = :mes`, { mes }) } : {},        order: { data: "DESC" }
    })

    return vendas
}