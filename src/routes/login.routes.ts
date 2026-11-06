import { Router } from "express";
import { loginController } from "../controllers/login.controller";
import { validateDataValidMiddleware } from "../middleware/validateData.middleware";
import { loginSchema } from "../schemas/user.schemas";

export const loginRoutes: Router = Router();

//ÚNICA ROTA QUE NÃO PRECISA DE TOKEN
loginRoutes.post(
  "",
  validateDataValidMiddleware(loginSchema),
  loginController.login,
);
