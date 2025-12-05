// src/controllers/loginController.ts
import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (email === "admin@admin.com" && senha === "123") {
    return res.json({ message: "Login realizado!", token: "fake-token-123" });
  }

  return res.status(401).json({ message: "Credenciais inválidas" });
};