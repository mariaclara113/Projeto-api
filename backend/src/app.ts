import express, { Application } from "express";
import cors from "cors";
import { setupSwagger } from "./swagger";

import pontoRoutes from "./routes/ponto";
import projetoRoutes from "./routes/projeto";
import extensionistaRoutes from "./routes/extensionista";
import loginRoutes from "./routes/login";

const app: Application = express();

// ==================== MIDDLEWARES ====================

// Libera CORS para o front-end
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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

export default app;
