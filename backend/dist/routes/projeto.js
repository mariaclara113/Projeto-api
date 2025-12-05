"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prismaClient_1 = require("../prismaClient");
const validate_1 = require("../middlewares/validate"); // ajuste do caminho
const projeto_1 = require("../schemas/projeto");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Projetos
 *   description: Gerenciamento de projetos
 */
/**
 * @swagger
 * /api/projetos:
 *   get:
 *     summary: Lista todos os projetos
 *     tags: [Projetos]
 *     responses:
 *       200:
 *         description: Lista de projetos retornada
 */
router.get("/", async (_req, res) => {
    const all = await prismaClient_1.prisma.projeto.findMany();
    res.json(all);
});
/**
 * @swagger
 * /api/projetos/{id}:
 *   get:
 *     summary: Obter projeto por ID
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Projeto encontrado
 *       404:
 *         description: Projeto não encontrado
 */
router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const item = await prismaClient_1.prisma.projeto.findUnique({
        where: { id },
        include: { pontos: true },
    });
    if (!item)
        return res.status(404).json({ error: "Not found" });
    res.json(item);
});
/**
 * @swagger
 * /api/projetos:
 *   post:
 *     summary: Criar um novo projeto
 *     tags: [Projetos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nome: "Projeto Comunidade"
 *               descricao: "Atividades de extensão universitária"
 *     responses:
 *       201:
 *         description: Projeto criado com sucesso
 */
router.post("/", (0, validate_1.validateBody)(projeto_1.createProjetoSchema), async (req, res) => {
    const created = await prismaClient_1.prisma.projeto.create({ data: req.body });
    res.status(201).json(created);
});
/**
 * @swagger
 * /api/projetos/{id}:
 *   put:
 *     summary: Atualizar um projeto existente
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Projeto atualizado
 *       404:
 *         description: Projeto não encontrado
 */
router.put("/:id", (0, validate_1.validateBody)(projeto_1.updateProjetoSchema), async (req, res) => {
    const id = Number(req.params.id);
    const updated = await prismaClient_1.prisma.projeto.update({
        where: { id },
        data: req.body,
    });
    res.json(updated);
});
/**
 * @swagger
 * /api/projetos/{id}:
 *   delete:
 *     summary: Deletar um projeto
 *     tags: [Projetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Projeto deletado com sucesso
 */
router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    await prismaClient_1.prisma.projeto.delete({ where: { id } });
    res.status(204).send();
});
exports.default = router;
