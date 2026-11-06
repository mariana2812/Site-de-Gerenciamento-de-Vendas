import { z } from "zod"

export const createVendaSchema = z.object({
    produtoId: z.string("produto é obrigatório"),
    quantidade: z.number("quantidade é obrigatória").int("a quantidade precisa ser um número inteiro").positive("a quantidade precisa ser maior que zero"),
    data: z.string("data é obrigatória").regex(/^\d{4}-\d{2}-\d{2}$/, "data no formato AAAA-MM-DD"),
    //PREÇO E CUSTO SÃO OPCIONAIS: SE NÃO VIER, USA O DO PRODUTO
    //SE VIER, É PORQUE A MARIA DEU UM DESCONTO OU O CUSTO MUDOU NAQUELA VENDA
    preco: z.number().min(0, "o preço não pode ser negativo").optional(),
    custo: z.number().min(0, "o custo não pode ser negativo").optional()
})

export const updateVendaSchema = createVendaSchema.partial()

export type CreateVenda = z.infer<typeof createVendaSchema>
export type UpdateVenda = z.infer<typeof updateVendaSchema>