import { z } from "zod"

export const loginSchema = z.object({
    email: z.email("e-mail inválido"),
    senha: z.string("senha é obrigatória").min(1, "senha é obrigatória")
})

export const updateUsuarioSchema = z.object({
    nome: z.string().min(2, "mínimo de 2 caracteres"),
    email: z.email("e-mail inválido"),
    nomeLoja: z.string().min(2, "mínimo de 2 caracteres"),
    senha: z.string().min(4, "a senha precisa de pelo menos 4 caracteres")
}).partial()

export const returnUsuarioSchema = z.object({
    id: z.number().int(),
    nome: z.string().nullable(),
    email: z.string().nullable(),
    nomeLoja: z.string().nullable()
})

export type Login = z.infer<typeof loginSchema>
export type UpdateUsuario = z.infer<typeof updateUsuarioSchema>
export type ReturnUsuario = z.infer<typeof returnUsuarioSchema>