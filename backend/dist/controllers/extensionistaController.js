"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExtensionista = exports.createExtensionista = exports.getExtensionistas = void 0;
const zod_1 = require("zod");
// Dados em memória
let extensionistas = [];
let nextId = 1;
// Schema de validação com Zod
const createExtensionistaSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, "Nome é obrigatório"),
    email: zod_1.z.string().email("Email inválido"),
});
// GET /extensionistas
const getExtensionistas = (_req, res) => {
    res.json(extensionistas);
};
exports.getExtensionistas = getExtensionistas;
// POST /extensionistas
const createExtensionista = (req, res) => {
    // req.body já é do tipo CreateExtensionistaInput
    const parseResult = createExtensionistaSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.errors[0].message });
    }
    const { nome, email } = parseResult.data;
    const newExt = {
        id: nextId++,
        nome,
        email,
    };
    extensionistas.push(newExt);
    res.status(201).json(newExt);
};
exports.createExtensionista = createExtensionista;
// DELETE /extensionistas/:id
const deleteExtensionista = (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    extensionistas = extensionistas.filter((e) => e.id !== id);
    res.status(204).send();
};
exports.deleteExtensionista = deleteExtensionista;
