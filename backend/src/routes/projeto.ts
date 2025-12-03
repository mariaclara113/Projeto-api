import { Router } from 'express';
import { prisma } from '../prismaClient';
import { validateBody } from '../middleware/validate';
import { createProjetoSchema, updateProjetoSchema } from '../schemas/projeto';

const router = Router();

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
router.get('/', async (_req, res) => {
  const all = await prisma.projeto.findMany();
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
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.projeto.findUnique({
    where: { id },
    include: { pontos: true },
  });

  if (!item) return res.status(404).json({ error: 'Not found' });
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
router.post('/', validateBody(createProjetoSchema), async (req, res) => {
  const created = await prisma.projeto.create({ data: req.body });
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
router.put('/:id', validateBody(updateProjetoSchema), async (req, res) => {
  const id = Number(req.params.id);
  const updated = await prisma.projeto.update({
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
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  await prisma.projeto.delete({ where: { id } });
  res.status(204).send();
});

export default router;
