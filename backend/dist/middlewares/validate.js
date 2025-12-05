"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const zod_1 = require("zod");
// Middleware para validar o body da requisição usando Zod
const validateBody = (schema) => {
    return (req, res, next) => {
        try {
            // Valida e sobrescreve o body
            req.body = schema.parse(req.body);
            next();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                return res.status(400).json({ errors: err.errors });
            }
            return res.status(400).json({ error: "Erro de validação desconhecido" });
        }
    };
};
exports.validateBody = validateBody;
