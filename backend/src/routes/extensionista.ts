import { Router } from 'express';
import { prisma } from '../prismaClient';
import { validateBody } from '../middleware/validate';
import { createExtensionistaSchema, updateExtensionistaSchema } from '../schemas/extensionista';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Extensionistas
 *     description: Gerenciamento de extensionistas
 */

/**
 * @swagger
 * /api/extensionistas:
 *   get:
 *     tags: [Extensionistas]
 *     summary: Lista todos extensionistas
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', async (req, res) => {
  const all = await prisma.extensionista.findMany();
  res.json(all);
});

/**
 * @swagger
 * /api/extensionistas/{id}:
 *   get:
 *     tags: [Extensionistas]
 *     summary: Obter extensionista por id
 */
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.extensionista.findUnique({
    where: { id },
    include: { pontos: true },
  });
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

/**
 * @swagger
 * /api/extensionistas:
 *   post:
 *     tags: [Extensionistas]
 *     summary: Criar extensionista
 */
router.post('/', validateBody(createExtensionistaSchema), async (req, res) => {
  const created = await prisma.extensionista.create({ data: req.body });
  res.status(201).json(created);
});

/**
 * @swagger
 * /api/extensionistas/{id}:
 *   put:
 *     tags: [Extensionistas]
 *     summary: Atualizar extensionista
 */
router.put('/:id', validateBody(updateExtensionistaSchema), async (req, res) => {
  const id = Number(req.params.id);
  const updated = await prisma.extensionista.update({ where: { id }, data: req.body });
  res.json(updated);
});

/**
 * @swagger
 * /api/extensionistas/{id}:
 *   delete:
 *     tags: [Extensionistas]
 *     summary: Deletar extensionista
 */
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  await prisma.extensionista.delete({ where: { id } });
  res.status(204).send();
});

export default router;
