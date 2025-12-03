import { Router } from 'express';
import { prisma } from '../prismaClient';
import { z } from 'zod';
import { validateBody } from '../middleware/validate';

const router = Router();

// Secret para JWT (colocar no .env em produção)
const JWT_SECRET = process.env.JWT_SECRET || 'meu_segredo';

// Schemas Zod
const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
});

const registerSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  senha: z.string().min(6),
});

/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: Autenticação de usuários (secretários)
 */

/**
 * @swagger
 * /api/login/register:
 *   post:
 *     tags: [Login]
 *     summary: Registrar um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Email já cadastrado
 */
router.post('/register', validateBody(registerSchema), async (req, res) => {
  const { nome, email, senha } = req.body;

  const existing = await prisma.secretario.findUnique({ where: { email } });
  if (existing) return res.status(400).json({ error: 'Email já cadastrado' });

  const hashedSenha = await bcrypt.hash(senha, 10);
  const created = await prisma.secretario.create({
    data: { nome, email, senha: hashedSenha },
  });

  res.status(201).json({ id: created.id, nome: created.nome, email: created.email });
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Login]
 *     summary: Realizar login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retorna token
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', validateBody(loginSchema), async (req, res) => {
  const { email, senha } = req.body;

  const user = await prisma.secretario.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

  const isValid = await bcrypt.compare(senha, user.senha);
  if (!isValid) return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = jwt.sign({ userId: user.id, nome: user.nome }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
});

/**
 * @swagger
 * /api/login/me:
 *   get:
 *     tags: [Login]
 *     summary: Retorna informações do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário autenticado
 *       401:
 *         description: Token inválido ou ausente
 */
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token ausente' });

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    res.json(payload);
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

export default router;
