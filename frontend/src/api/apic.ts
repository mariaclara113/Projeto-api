// src/api/api.ts
export const getApiUrl = (): string => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

  return "http://localhost:3333"; // URL do backend
};

export const API_BASE_URL = getApiUrl();

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  EXTENSIONISTAS: `${API_BASE_URL}/api/extensionistas`,
  PROJETOS: `${API_BASE_URL}/api/projetos`,
  PONTOS: `${API_BASE_URL}/api/pontos`,
};