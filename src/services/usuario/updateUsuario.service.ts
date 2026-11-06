import { parseId } from "../../utils/id"
import bcrypt from "bcryptjs"
import { AppError } from "../../../error"
import { AppDataSource } from "../../connection"
import { User } from "../../entities/user.entitie"
import { ReturnUsuario, returnUsuarioSchema, UpdateUsuario } from "../../schemas/user.schemas"

export const updateUsuarioService = async (usuarioId: string, usuarioData: UpdateUsuario): Promise<ReturnUsuario> => {
    const usuarioRepository = AppDataSource.getRepository(User)

    const findUsuario: User | null = await usuarioRepository.findOne({
        where: { id: parseId(usuarioId) }
    })
    if (!findUsuario) {
        throw new AppError("Usuário não encontrado", 404)
    }

    //SE TROCOU A SENHA, CRIPTOGRAFA ANTES DE SALVAR
    if (usuarioData.senha) {
        usuarioData.senha = await bcrypt.hash(usuarioData.senha, 10)
    }

    //JUNTA OS DADOS NOVOS COM OS QUE JÁ EXISTEM E SALVA
    const { nomeLoja, ...campos } = usuarioData
    Object.assign(findUsuario, campos)
    if (nomeLoja !== undefined) findUsuario.nomeloja = nomeLoja
    await usuarioRepository.save(findUsuario)

    return returnUsuarioSchema.parse({ ...findUsuario, nomeLoja: findUsuario.nomeloja })
}