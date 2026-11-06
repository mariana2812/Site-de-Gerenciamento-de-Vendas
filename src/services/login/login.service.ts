import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { AppError } from "../../../error"
import { AppDataSource } from "../../connection"
import { Usuario } from "../../entities"
import { Login, returnUsuarioSchema } from "../../schemas/user.schemas"

export const loginService = async (loginData: Login) => {
    const usuarioRepository = AppDataSource.getRepository(Usuario)

    const usuario: Usuario | null = await usuarioRepository.findOne({
        where: { email: loginData.email }
    })

    //MESMA MENSAGEM PROS DOIS CASOS, PRA NÃO DIZER QUAL DOS DOIS ESTÁ ERRADO
    if (!usuario || !usuario.senha) {
        throw new AppError("E-mail ou senha incorretos", 401)
    }

    //COMPARA A SENHA DIGITADA COM O HASH SALVO NO BANCO
    const senhaCorreta: boolean = await bcrypt.compare(loginData.senha, usuario.senha)
    if (!senhaCorreta) {
        throw new AppError("E-mail ou senha incorretos", 401)
    }

    //GERA O TOKEN, VÁLIDO POR 1 DIA
    const token: string = jwt.sign({}, process.env.SECRET_KEY as string, {
        subject: String(usuario.id),
        expiresIn: "1d"
    })

    return {
        token,
        usuario: returnUsuarioSchema.parse({ ...usuario, nomeLoja: usuario.nomeloja })
    }
}