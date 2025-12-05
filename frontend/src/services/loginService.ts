import { api, API_ENDPOINTS } from "./api";

export const loginService = {
  login: (email: string, senha: string) =>
    api.post(API_ENDPOINTS.LOGIN, { email, senha }),
};