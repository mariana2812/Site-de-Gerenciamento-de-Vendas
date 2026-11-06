import { Router } from "express"
import { produtoController } from "../controllers/produto.controller"
import { validateDataValidMiddleware } from "../middleware/validateData.middleware"
import { validateTokenMiddleware } from "../middleware/validateToken.middleware"
import { createProdutoSchema, updateProdutoSchema } from "../schemas/produto.schemas"

export const produtoRoutes: Router = Router()

produtoRoutes.use(validateTokenMiddleware)

produtoRoutes.get("", produtoController.getProdutos)
produtoRoutes.post("", validateDataValidMiddleware(createProdutoSchema), produtoController.createProduto)
produtoRoutes.patch("/:id", validateDataValidMiddleware(updateProdutoSchema), produtoController.updateProduto)
produtoRoutes.delete("/:id", produtoController.deleteProduto)