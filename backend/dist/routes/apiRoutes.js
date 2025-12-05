"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/apiRoutes.ts
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authorizeRoles_1 = require("../middlewares/authorizeRoles");
const router = express_1.default.Router();
// Apenas extensionistas podem bater ponto
router.post("/pontos", authMiddleware_1.authMiddleware, (0, authorizeRoles_1.authorizeRoles)(["extensionista"]), (req, res) => {
    const usuario = req.user;
    if (!usuario) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }
    // Aqui você salvaria o ponto no banco
    res.json({
        message: "Ponto registrado com sucesso",
        usuario: usuario.nome,
        role: usuario.role,
        data: new Date().toISOString(),
    });
});
exports.default = router;
