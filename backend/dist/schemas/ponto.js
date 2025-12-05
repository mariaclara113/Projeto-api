"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePontoSchema = exports.createPontoSchema = void 0;
const zod_1 = require("zod");
exports.createPontoSchema = zod_1.z.object({
    dataHora: zod_1.z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: 'dataHora must be ISO date string' }),
    tipo: zod_1.z.enum(['IN', 'OUT']),
    observacao: zod_1.z.string().optional(),
    extensionistaId: zod_1.z.number(),
    projetoId: zod_1.z.number().optional(),
});
exports.updatePontoSchema = exports.createPontoSchema.partial();
