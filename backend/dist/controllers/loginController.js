"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const login = (req, res) => {
    const { email, senha } = req.body;
    if (email === "admin@admin.com" && senha === "123") {
        return res.json({ message: "Login realizado!", token: "fake-token-123" });
    }
    return res.status(401).json({ message: "Credenciais inválidas" });
};
exports.login = login;
