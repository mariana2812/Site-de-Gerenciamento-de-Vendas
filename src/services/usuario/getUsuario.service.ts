import { parseId } from "../../utils/id"
import { AppError } from "../../../error"
import { AppDataSource } from "../../connection"
import { User } from "../../entities/user.entitie"
import { ReturnUsuario, returnUsuarioSchema } from "../../schemas/user.schemas"

export const getUsuarioService = async (usuarioId: string): Promise<ReturnUsuario> => {
    const usuarioRepository = AppDataSource.getRepository(User)

    const usuario: User | null = await usuarioRepository.findOne({
        where: { id: parseId(usuarioId) }
    })
    if (!usuario || !usuario.senha) {
        throw new AppError("Usuário não encontrado", 404)
    }

    //O SCHEMA DE RETORNO NÃO TEM SENHA, ENTÃO ELA NUNCA VAI PRO FRONT
    return returnUsuarioSchema.parse({ ...usuario, nomeLoja: usuario.nomeloja })
}