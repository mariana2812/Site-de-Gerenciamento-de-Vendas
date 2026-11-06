import { Request, Response } from "express";
import { getUsuarioService } from "../services/usuario/getUsuario.service";
import { updateUsuarioService } from "../services/usuario/updateUsuario.service";
import { ReturnUsuario, UpdateUsuario } from "../schemas/user.schemas";

export const usuarioController = {
  //O ID VEM DO TOKEN (validateTokenMiddleware), NÃO DA URL
  async getUsuario(req: Request, res: Response) {
    const usuarioId: string = res.locals.usuarioId;
    const usuario: ReturnUsuario = await getUsuarioService(usuarioId);

    res.status(200).json(usuario);
  },
  async updateUsuario(req: Request, res: Response) {
    const usuarioId: string = res.locals.usuarioId;
    const usuarioData: UpdateUsuario = req.body;
    const usuario: ReturnUsuario = await updateUsuarioService(
      usuarioId,
      usuarioData,
    );

    res.status(200).json(usuario);
  },
};
