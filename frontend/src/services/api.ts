// src/services/api.ts
import axios from "axios";

// Detecta URL do backend pela variável de ambiente ou usa localhost
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3333";

// Instância global do Axios PARA USAR NO PROJETO
export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Endpoints organizados
export const API_ENDPOINTS = {
  LOGIN: "/login",
  EXTENSIONISTAS: "/api/extensionistas",
  PROJETOS: "/api/projetos",
  PONTOS: "/api/pontos",
};