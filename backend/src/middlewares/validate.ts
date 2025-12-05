import { ZodType, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

// Middleware para validar o body da requisição usando Zod
export const validateBody = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Valida e sobrescreve o body
      req.body = schema.parse(req.body);
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return res.status(400).json({ errors: err.errors });
      }
      return res.status(400).json({ error: "Erro de validação desconhecido" });
    }
  };
};