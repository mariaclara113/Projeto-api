// src/controllers/projetoController.ts
import { Request, Response } from "express";

interface Projeto {
  id: number;
  nome: string;
  descricao: string;
}

let projetos: Projeto[] = [];
let nextId = 1;

export const getProjetos = (req: Request, res: Response) => {
  res.json(projetos);
};

export const createProjeto = (req: Request, res: Response) => {
  const newProjeto: Projeto = {
    id: nextId++,
    nome: req.body.nome,
    descricao: req.body.descricao,
  };

  projetos.push(newProjeto);

  res.status(201).json(newProjeto);
};

export const deleteProjeto = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  projetos = projetos.filter((p) => p.id !== id);

  res.status(204).send();
};