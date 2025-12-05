import { Router, Request, Response } from "express";
import { PrismaClient, Secretario, Extensionista } from "@prisma/client";
import { loginSchema } from "../schemas/login"; // Zod
import bcrypt from "bcrypt"; // se quiser usar hash

const router = Router();
const prisma = new PrismaClient();

interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  role: "secretario" | "extensionista";
}

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Autenticação de usuários
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Realiza login do usuário (Secretário ou Extensionista)
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *             example:
 *               email: "usuario@exemplo.com"
 *               senha: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 usuario:
 *                   type: object
 *       400:
 *         description: Dados inválidos (Zod validation)
 *       401:
 *         description: Senha incorreta
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    // Valida corpo da requisição
    const loginData = loginSchema.parse(req.body);

    // Busca usuário no secretário
    let usuario: Secretario | Extensionista | null = await prisma.secretario.findUnique({
      where: { email: loginData.email },
    });

    let role: "secretario" | "extensionista" = "secretario";

    // Se não achou, busca extensionista
    if (!usuario) {
      usuario = await prisma.extensionista.findUnique({
        where: { email: loginData.email },
      });
      role = "extensionista";
    }

    // Se não existe usuário
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verifica senha
    if ("senha" in usuario && usuario.senha !== loginData.senha) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    // Retorna objeto para front sem senha, com role
    const usuarioResponse: UsuarioResponse = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role,
    };

    console.log(`Usuário logado: ${role}`);

    return res.json({ message: "Login realizado com sucesso", usuario: usuarioResponse });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors });
    }
    console.error(err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
});

export default router;
