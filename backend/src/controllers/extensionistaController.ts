// src/controllers/extensionistaController.ts
import { Request, Response } from "express";
import { z } from "zod";

// Interface do Extensionista
interface Extensionista {
  id: number;
  nome: string;
  email: string;
}

// Dados em memória
let extensionistas: Extensionista[] = [];
let nextId = 1;

// Schema de validação com Zod
const createExtensionistaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
});

// Tipo inferido do corpo
type CreateExtensionistaInput = z.infer<typeof createExtensionistaSchema>;

// GET /extensionistas
export const getExtensionistas = (_req: Request, res: Response<Extensionista[]>) => {
  res.json(extensionistas);
};

// POST /extensionistas
export const createExtensionista = (req: Request<{}, {}, CreateExtensionistaInput>, res: Response<Extensionista | { error: string }>) => {
  // req.body já é do tipo CreateExtensionistaInput
  const parseResult = createExtensionistaSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.errors[0].message });
  }

  const { nome, email } = parseResult.data;

  const newExt: Extensionista = {
    id: nextId++,
    nome,
    email,
  };

  extensionistas.push(newExt);

  res.status(201).json(newExt);
};

// DELETE /extensionistas/:id
export const deleteExtensionista = (req: Request<{ id: string }>, res: Response<{} | { error: string }>) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  extensionistas = extensionistas.filter((e) => e.id !== id);

  res.status(204).send();
};
