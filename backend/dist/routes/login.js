"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const login_1 = require("../schemas/login"); // Zod
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
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
router.post("/", async (req, res) => {
    try {
        // Valida corpo da requisição
        const loginData = login_1.loginSchema.parse(req.body);
        // Busca usuário no secretário
        let usuario = await prisma.secretario.findUnique({
            where: { email: loginData.email },
        });
        let role = "secretario";
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
        const usuarioResponse = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            role,
        };
        console.log(`Usuário logado: ${role}`);
        return res.json({ message: "Login realizado com sucesso", usuario: usuarioResponse });
    }
    catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json({ error: err.errors });
        }
        console.error(err);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
});
exports.default = router;
