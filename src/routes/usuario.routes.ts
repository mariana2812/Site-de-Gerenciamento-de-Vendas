import { Router } from "express"
import { usuarioController } from "../controllers/usuario.controller"
import { validateDataValidMiddleware } from "../middleware/validateData.middleware"
import { validateTokenMiddleware } from "../middleware/validateToken.middleware"
import { updateUsuarioSchema } from "../schemas/user.schemas"

export const usuarioRoutes: Router = Router()

//TODAS AS ROTAS DAQUI PRA BAIXO PRECISAM DE LOGIN
usuarioRoutes.use(validateTokenMiddleware)

usuarioRoutes.get("", usuarioController.getUsuario)
usuarioRoutes.patch("", validateDataValidMiddleware(updateUsuarioSchema), usuarioController.updateUsuario)