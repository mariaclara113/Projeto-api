import { z } from "zod";

export const createextensionistaSchema = z.object({
  nome: z.string().min(1, { message: "Nome obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().optional(),
});

export type CreateExtensionista = z.infer<typeof createextensionistaSchema>;
