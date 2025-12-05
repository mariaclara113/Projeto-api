"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = require("./swagger");
const ponto_1 = __importDefault(require("./routes/ponto"));
const projeto_1 = __importDefault(require("./routes/projeto"));
const extensionista_1 = __importDefault(require("./routes/extensionista"));
const login_1 = __importDefault(require("./routes/login"));
const app = (0, express_1.default)();
// ==================== MIDDLEWARES ====================
// Libera CORS para o front-end
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
// Permite que o Express leia JSON no corpo das requisições
app.use(express_1.default.json());
// ==================== ROTAS ====================
// Prefixo /api para todas as rotas
app.use("/api/pontos", ponto_1.default);
app.use("/api/projetos", projeto_1.default);
app.use("/api/extensionistas", extensionista_1.default);
app.use("/api/login", login_1.default);
// ==================== SWAGGER ====================
(0, swagger_1.setupSwagger)(app); // registra o Swagger para todas as rotas
exports.default = app;
