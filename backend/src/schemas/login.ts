// src/schemas/login.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email.,
  senha: z.string().min,
});

export type LoginData = z.infer<typeof loginSchema>;
