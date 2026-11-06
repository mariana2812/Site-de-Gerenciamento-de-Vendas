import { z } from "zod"

export const createProdutoSchema = z.object({
    nome: z.string("nome é obrigatório").min(2, "mínimo de 2 caracteres"),
    preco: z.number("preço é obrigatório").positive("o preço precisa ser maior que zero"),
    custo: z.number("custo é obrigatório").min(0, "o custo não pode ser negativo"),
    ativo: z.boolean().optional()
})

export const updateProdutoSchema = createProdutoSchema.partial()

export type CreateProduto = z.infer<typeof createProdutoSchema>
export type UpdateProduto = z.infer<typeof updateProdutoSchema>