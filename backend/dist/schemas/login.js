"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
// src/schemas/login.ts
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(), // <- chamando a função email()
    senha: zod_1.z.string().min(6), // <- chamando min() com valor mínimo
});
