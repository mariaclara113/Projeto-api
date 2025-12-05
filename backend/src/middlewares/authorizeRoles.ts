// src/middlewares/authorizeRoles.ts
import { Request, Response, NextFunction } from "express";

// Tipagem do usuário que o authMiddleware deve popular em req.user
interface User {
  id: number;
  nome: string;
  role: "secretario" | "extensionista";
}

// Request estendido com user
interface AuthRequest extends Request {
  user?: User;
}

// Middleware para autorizar roles específicos
export const authorizeRoles = (allowedRoles: User["role"][]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    next();
  };
};