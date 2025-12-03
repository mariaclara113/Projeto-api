// src/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Ponto Extensionista",
      version: "1.0.0",
      description: "Documentação da API de Ponto Extensionista",
    },
    servers: [
      { url: "http://localhost:3333" } // porta do seu backend
    ],
  },
  apis: ["./src/routes/*.ts"], // onde estão suas rotas com comentários Swagger
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
