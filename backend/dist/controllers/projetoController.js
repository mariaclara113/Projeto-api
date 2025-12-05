"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjeto = exports.createProjeto = exports.getProjetos = void 0;
let projetos = [];
let nextId = 1;
const getProjetos = (req, res) => {
    res.json(projetos);
};
exports.getProjetos = getProjetos;
const createProjeto = (req, res) => {
    const newProjeto = {
        id: nextId++,
        nome: req.body.nome,
        descricao: req.body.descricao,
    };
    projetos.push(newProjeto);
    res.status(201).json(newProjeto);
};
exports.createProjeto = createProjeto;
const deleteProjeto = (req, res) => {
    const id = Number(req.params.id);
    projetos = projetos.filter((p) => p.id !== id);
    res.status(204).send();
};
exports.deleteProjeto = deleteProjeto;
