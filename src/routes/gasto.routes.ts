import { Router } from "express";
import { gastoController } from "../controllers/gasto.controller";
import { validateDataValidMiddleware } from "../middleware/validateData.middleware";
import { validateTokenMiddleware } from "../middleware/validateToken.middleware";
import {
  copiarGastosSchema,
  createGastoSchema,
  updateGastoSchema,
} from "../schemas/gasto.schemas";

export const gastoRoutes: Router = Router();

gastoRoutes.use(validateTokenMiddleware);

gastoRoutes.get("", gastoController.getGastos);
gastoRoutes.post(
  "",
  validateDataValidMiddleware(createGastoSchema),
  gastoController.createGasto,
);
gastoRoutes.post(
  "/copiar",
  validateDataValidMiddleware(copiarGastosSchema),
  gastoController.copiarGastos,
);
gastoRoutes.patch(
  "/:id",
  validateDataValidMiddleware(updateGastoSchema),
  gastoController.updateGasto,
);
gastoRoutes.delete("/:id", gastoController.deleteGasto);
