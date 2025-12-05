import { api } from "./api";

export const getPontos = async (params?: any) => {
  const res = await api.get("/api/pontos", { params });
  return res.data;
};

export const CreatePonto = async (data: any) => {
  const res = await api.post("/api/pontos", data);
  return res.data;
};

export const deletePonto = async (id: number) => {
  await api.delete(`/api/pontos/${id}`);
};