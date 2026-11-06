import { Request, Response } from "express";
import { loginService } from "../services/login/login.service";
import { Login } from "../schemas/user.schemas";

export const loginController = {
  async login(req: Request, res: Response) {
    const loginData: Login = req.body;
    const resposta = await loginService(loginData);

    res.status(200).json(resposta);
  },
};
