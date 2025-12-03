import { z } from 'zod';

export const createProjetoSchema = z.object({
  nome: z.string().min(1),
  descricao: z.string().optional(),
});

export const updateProjetoSchema = createProjetoSchema.partial();
