import { Router } from "express"
import { resumoController } from "../controllers/resumo.controller"
import { validateTokenMiddleware } from "../middleware/validateToken.middleware"

export const resumoRoutes: Router = Router()

resumoRoutes.use(validateTokenMiddleware)

resumoRoutes.get("", resumoController.getResumo)