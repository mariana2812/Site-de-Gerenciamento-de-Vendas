import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../../error";

//PROTEGE AS ROTAS: SÓ PASSA QUEM FEZ LOGIN E MANDOU O TOKEN
//O FRONT MANDA NO HEADER: Authorization: Bearer <token>
export const validateTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization: string | undefined = req.headers.authorization;

  if (!authorization) {
    throw new AppError("Token não enviado, faça login", 401);
  }

  const [scheme, token] = authorization.split(" ");
  if (scheme !== "Bearer" || !token) throw new AppError("Token invalido", 401);

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string,
    ) as JwtPayload;
    if (typeof decoded.sub !== "string" || !/^\d+$/.test(decoded.sub))
      throw new Error("Token sem usuario");
    //GUARDA O ID DO USUÁRIO PRA USAR NOS CONTROLLERS
    res.locals.usuarioId = decoded.sub;
  } catch (error) {
    throw new AppError("Token inválido ou expirado, faça login novamente", 401);
  }

  return next();
};
