"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExtensionistaSchema = exports.createExtensionistaSchema = void 0;
const zod_1 = require("zod");
exports.createExtensionistaSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    telefone: zod_1.z.string().optional(),
});
exports.updateExtensionistaSchema = exports.createExtensionistaSchema.partial();
