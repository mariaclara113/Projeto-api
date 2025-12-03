// src/api/apiClient.ts
import axios from "axios";
import { API_BASE_URL } from "./apic";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptador para logar erros (opcional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
