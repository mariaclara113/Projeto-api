"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prismaClient_1 = require("../prismaClient");
const validate_1 = require("../middlewares/validate");
const ponto_1 = require("../schemas/ponto");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Pontos
 *   description: Registro de ponto dos extensionistas
 */
/**
 * @swagger
 * /api/pontos:
 *   get:
 *     summary: Lista todos os pontos registrados
 *     tags: [Pontos]
 *     responses:
 *       200:
 *         description: Lista de pontos retornada com sucesso
 */
router.get('/', async (req, res) => {
    const all = await prismaClient_1.prisma.ponto.findMany({
        include: { extensionista: true, projeto: true },
    });
    res.json(all);
});
/**
 * @swagger
 * /api/pontos/{id}:
 *   get:
 *     summary: Obter ponto por ID
 *     tags: [Pontos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ponto encontrado
 *       404:
 *         description: Ponto não encontrado
 */
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const item = await prismaClient_1.prisma.ponto.findUnique({ where: { id }, include: { extensionista: true, projeto: true } });
    if (!item)
        return res.status(404).json({ error: 'Not found' });
    res.json(item);
});
/**
 * @swagger
 * /api/pontos:
 *   post:
 *     summary: Criar um novo ponto
 *     tags: [Pontos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dataHora:
 *                 type: string
 *                 example: "2025-01-01T08:00:00.000Z"
 *               tipo:
 *                 type: string
 *                 example: "entrada"
 *               observacao:
 *                 type: string
 *               extensionistaId:
 *                 type: integer
 *               projetoId:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Ponto criado com sucesso
 */
router.post('/', (0, validate_1.validateBody)(ponto_1.createPontoSchema), async (req, res) => {
    const body = req.body;
    const created = await prismaClient_1.prisma.ponto.create({
        data: {
            dataHora: new Date(body.dataHora),
            tipo: body.tipo,
            observacao: body.observacao,
            extensionistaId: body.extensionistaId,
            projetoId: body.projetoId ?? undefined,
        },
    });
    res.status(201).json(created);
});
/**
 * @swagger
 * /api/pontos/{id}:
 *   put:
 *     summary: Atualizar um ponto
 *     tags: [Pontos]
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
 *         description: Ponto atualizado
 *       404:
 *         description: Não encontrado
 */
router.put('/:id', (0, validate_1.validateBody)(ponto_1.updatePontoSchema), async (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const updated = await prismaClient_1.prisma.ponto.update({
        where: { id },
        data: {
            dataHora: body.dataHora ? new Date(body.dataHora) : undefined,
            tipo: body.tipo,
            observacao: body.observacao,
            extensionistaId: body.extensionistaId,
            projetoId: body.projetoId ?? undefined,
        },
    });
    res.json(updated);
});
/**
 * @swagger
 * /api/pontos/{id}:
 *   delete:
 *     summary: Deletar um ponto
 *     tags: [Pontos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deletado com sucesso
 */
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    await prismaClient_1.prisma.ponto.delete({ where: { id } });
    res.status(204).send();
});
exports.default = router;
