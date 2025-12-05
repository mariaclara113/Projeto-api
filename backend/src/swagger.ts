import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import type { Application } from "express";

export const setupSwagger = (app: Application): void => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Ponto Extensionista",
        version: "1.0.0",
        description: "Documentação da API de Ponto Extensionista",
      },
    },
   apis: ["./src/routes/**/*.ts"],
 // todas as rotas com comentários Swagger
  };

  const swaggerSpec = swaggerJsdoc(options);

  // Middleware correto, sem type casting
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
