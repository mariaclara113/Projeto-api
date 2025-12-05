import express, { Application } from "express";
import cors from "cors";
import { setupSwagger } from "./swagger";

import pontoRoutes from "./routes/ponto";
import projetoRoutes from "./routes/projeto";
import extensionistaRoutes from "./routes/extensionista";
import loginRoutes from "./routes/login";

const app: Application = express();

// ==================== MIDDLEWARES ====================

// Libera CORS apenas para o frontend do Render
app.use(cors({
  origin: "https://projeto-extensionista-frontend.onrender.com",
  credentials: true,
}));

// Permite que o Express leia JSON no corpo das requisições
app.use(express.json());

// ==================== ROTAS ====================
// Prefixo /api para todas as rotas
app.use("/api/pontos", pontoRoutes);
app.use("/api/projetos", projetoRoutes);
app.use("/api/extensionistas", extensionistaRoutes);
app.use("/api/login", loginRoutes);

// ==================== SWAGGER ====================
setupSwagger(app); // registra o Swagger para todas as rotas

// ==================== HEALTH CHECK ====================
// Opcional: para testar se o backend está vivo
app.get("/health", (_req, res) => res.json({ status: "ok" }));

export default app;
