import { z } from 'zod';

export const createPontoSchema = z.object({
  dataHora: z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: 'dataHora must be ISO date string' }),
  tipo: z.enum(['IN', 'OUT']),
  observacao: z.string().optional(),
  extensionistaId: z.number(),
  projetoId: z.number().optional(),
});

export const updatePontoSchema = createPontoSchema.partial();