import axios from 'axios';

// URL do backend via variável de ambiente
// Fallback para localhost durante desenvolvimento
const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});
