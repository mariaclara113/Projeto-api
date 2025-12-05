// src/server.ts
import app from "./app";

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📘 Swagger disponível em /api-docs`);
});
