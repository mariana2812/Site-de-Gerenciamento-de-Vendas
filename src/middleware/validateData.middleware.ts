import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateDataValidMiddleware =
  (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const validatedData = schema.parse(req.body);

    req.body = validatedData;

    return next();
  };
