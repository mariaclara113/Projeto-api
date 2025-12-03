import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { setupSwagger } from "./swagger";

import extensionistaRoutes from "./routes/extensionista";
import loginRoutes from "./routes/login"; // 🔥 Adicionada

dotenv.config();

const app = express();

// Middleware
app.use(cors());            // Permite requisições do front-end
app.use(express.json());     // Permite JSON no corpo da requisição

// Rotas
app.use("/api/login", loginRoutes);                 // 🔥 Rota de login
app.use("/api/extensionistas", extensionistaRoutes); // Rota de extensionista

// Swagger (documentação)
setupSwagger(app);

// Porta
const PORT = process.env.PORT || 3333;

// Start do servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📘 Swagger disponível em http://localhost:${PORT}/api-docs`);
});
