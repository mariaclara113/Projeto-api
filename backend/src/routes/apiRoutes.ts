// src/routes/apiRoutes.ts
import express, { Request, Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/authorizeRoles";

// Tipagem do usuário adicionada pelo authMiddleware
interface User {
  id: number;
  nome?: string;
  role: "secretario" | "extensionista";
}

// Tipagem customizada do Request para TypeScript
interface AuthRequest extends Request {
  user?: User;
}

const router = express.Router();

// Apenas extensionistas podem bater ponto
router.post(
  "/pontos",
  authMiddleware,
  authorizeRoles(["extensionista"]),
  (req: AuthRequest, res: Response) => {
    const usuario = req.user;

    if (!usuario) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    // Aqui você salvaria o ponto no banco
    res.json({
      message: "Ponto registrado com sucesso",
      usuario: usuario.nome,
      role: usuario.role,
      data: new Date().toISOString(),
    });
  }
);

export default router;