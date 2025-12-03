import { z } from "zod";

export const createPontoSchema = z.object({
  dataHora: z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: 'Data inválida' }),
  tipo: z.enum(['IN', 'OUT']),
  observacao: z.string().optional(),
  extensionistaId: z.number(),
  projetoId: z.number().optional(),
});

export type CreatePonto = z.infer<typeof createPontoSchema>;
