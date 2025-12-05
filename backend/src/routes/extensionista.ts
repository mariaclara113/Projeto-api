import { Router } from "express";
import { prisma } from "../prismaClient";
import { validateBody } from "../middlewares/validate";
import {
  createExtensionistaSchema,
  updateExtensionistaSchema,
} from "../schemas/extensionista";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Extensionistas
 *   description: Gerenciamento de extensionistas
 */

/**
 * @swagger
 * /api/extensionistas:
 *   get:
 *     summary: Lista todos os extensionistas
 *     tags: [Extensionistas]
 *     responses:
 *       200:
 *         description: Lista de extensionistas
 */
router.get("/", async (req, res) => {
  try {
    const all = await prisma.extensionista.findMany();
    return res.json(all);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar extensionistas" });
  }
});

/**
 * @swagger
 * /api/extensionistas/{id}:
 *   get:
 *     summary: Retorna extensionista pelo ID
 *     tags: [Extensionistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Extensionista encontrado
 *       404:
 *         description: Extensionista não encontrado
 */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const item = await prisma.extensionista.findUnique({
      where: { id },
      include: { pontos: true },
    });
    if (!item) return res.status(404).json({ error: "Extensionista não encontrado" });
    return res.json(item);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar extensionista" });
  }
});

/**
 * @swagger
 * /api/extensionistas:
 *   post:
 *     summary: Cria um novo extensionista
 *     tags: [Extensionistas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nome: "Maria Clara"
 *               email: "maria@exemplo.com"
 *               telefone: "123456789"
 *     responses:
 *       201:
 *         description: Extensionista criado com sucesso
 */
router.post("/", validateBody(createExtensionistaSchema), async (req, res) => {
  try {
    const created = await prisma.extensionista.create({ data: req.body });
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar extensionista" });
  }
});

/**
 * @swagger
 * /api/extensionistas/{id}:
 *   put:
 *     summary: Atualiza um extensionista
 *     tags: [Extensionistas]
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
 *             example:
 *               nome: "Maria Clara Atualizada"
 *               email: "maria@exemplo.com"
 *               telefone: "987654321"
 *     responses:
 *       200:
 *         description: Extensionista atualizado
 */
router.put("/:id", validateBody(updateExtensionistaSchema), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updated = await prisma.extensionista.update({ where: { id }, data: req.body });
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar extensionista" });
  }
});

/**
 * @swagger
 * /api/extensionistas/{id}:
 *   delete:
 *     summary: Deleta um extensionista
 *     tags: [Extensionistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Extensionista deletado com sucesso
 */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.extensionista.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar extensionista" });
  }
});

export default router;