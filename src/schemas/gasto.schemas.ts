import { z } from "zod"

const mesRegex = /^\d{4}-(0[1-9]|1[0-2])$/

export const createGastoSchema = z.object({
    descricao: z.string("descrição é obrigatória").min(2, "mínimo de 2 caracteres"),
    valor: z.number("valor é obrigatório").min(0, "o valor não pode ser negativo"),
    mes: z.string("mês é obrigatório").regex(mesRegex, "mês no formato AAAA-MM")
})

export const updateGastoSchema = createGastoSchema.partial()

//COPIA OS GASTOS DE UM MÊS PRO OUTRO (EX: OUTUBRO -> NOVEMBRO)
export const copiarGastosSchema = z.object({
    de: z.string().regex(mesRegex, "mês no formato AAAA-MM"),
    para: z.string().regex(mesRegex, "mês no formato AAAA-MM")
})

export type CreateGasto = z.infer<typeof createGastoSchema>
export type UpdateGasto = z.infer<typeof updateGastoSchema>
export type CopiarGastos = z.infer<typeof copiarGastosSchema>