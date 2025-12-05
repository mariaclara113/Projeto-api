// src/schemas/login.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),   // <- chamando a função email()
  senha: z.string().min(6),    // <- chamando min() com valor mínimo
});

export type LoginData = z.infer<typeof loginSchema>;