"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePonto = exports.createPonto = exports.getPontos = void 0;
let pontos = [];
let nextId = 1;
// GET /pontos
const getPontos = (req, res) => {
    res.json(pontos);
};
exports.getPontos = getPontos;
// POST /pontos
const createPonto = (req, res) => {
    const { extensionistaId, data, horas } = req.body;
    const newPonto = {
        id: nextId++,
        extensionistaId,
        data,
        horas,
    };
    pontos.push(newPonto);
    res.status(201).json(newPonto);
};
exports.createPonto = createPonto;
// DELETE /pontos/:id
const deletePonto = (req, res) => {
    const id = Number(req.params.id);
    pontos = pontos.filter((p) => p.id !== id);
    res.status(204).send();
};
exports.deletePonto = deletePonto;
