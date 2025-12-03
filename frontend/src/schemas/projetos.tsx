import { z } from 'zod';

export const createProjetoSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  descricao: z.string().optional(),
});

export type CreateProjeto = z.infer<typeof createProjetoSchema>;
