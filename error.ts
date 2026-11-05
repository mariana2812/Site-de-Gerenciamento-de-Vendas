import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}
export const handleErrors = (
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }
  if (err instanceof ZodError) {
    // console.log(err.flatten((it) => console.log(it.)));
    return response.status(400).json({
      message: err.flatten().fieldErrors,
    });
  }

  return response.status(500).json({
    message: "Internal server error",
  });
};