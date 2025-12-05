// src/controllers/pontoController.ts
import type { Request, Response } from "express";

interface Ponto {
  id: number;
  extensionistaId: number;
  data: string;
  horas: number;
}

let pontos: Ponto[] = [];
let nextId = 1;

// GET /pontos
export const getPontos = (req: Request, res: Response): void => {
  res.json(pontos);
};

// POST /pontos
export const createPonto = (req: Request, res: Response): void => {
  const { extensionistaId, data, horas } = req.body as {
    extensionistaId: number;
    data: string;
    horas: number;
  };

  const newPonto: Ponto = {
    id: nextId++,
    extensionistaId,
    data,
    horas,
  };

  pontos.push(newPonto);
  res.status(201).json(newPonto);
};

// DELETE /pontos/:id
export const deletePonto = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  pontos = pontos.filter((p) => p.id !== id);
  res.status(204).send();
};
