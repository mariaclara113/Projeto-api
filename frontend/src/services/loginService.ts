import { apic } from "./apic";

export const login = async (email: string, senha: string) => {
  const res = await apic.post("/login", { email, senha });
  return res.data; // retorna dados do usuário
};
