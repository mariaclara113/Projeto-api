"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const setupSwagger = (app) => {
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
    const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
    // Middleware correto, sem type casting
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
};
exports.setupSwagger = setupSwagger;
