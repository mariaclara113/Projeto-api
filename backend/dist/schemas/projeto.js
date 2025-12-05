"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjetoSchema = exports.createProjetoSchema = void 0;
const zod_1 = require("zod");
exports.createProjetoSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1),
    descricao: zod_1.z.string().optional(),
});
exports.updateProjetoSchema = exports.createProjetoSchema.partial();
