import { z } from 'zod';

export const createExtensionistaSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  telefone: z.string().optional(),
});

export const updateExtensionistaSchema = createExtensionistaSchema.partial();