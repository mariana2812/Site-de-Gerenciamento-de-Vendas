import { Router } from "express"
import { vendaController } from "../controllers/venda.controller"
import { validateDataValidMiddleware } from "../middleware/validateData.middleware"
import { validateTokenMiddleware } from "../middleware/validateToken.middleware"
import { createVendaSchema, updateVendaSchema } from "../schemas/venda.schemas"

export const vendaRoutes: Router = Router()

vendaRoutes.use(validateTokenMiddleware)

vendaRoutes.get("", vendaController.getVendas)
vendaRoutes.post("", validateDataValidMiddleware(createVendaSchema), vendaController.createVenda)
vendaRoutes.patch("/:id", validateDataValidMiddleware(updateVendaSchema), vendaController.updateVenda)
vendaRoutes.delete("/:id", vendaController.deleteVenda)