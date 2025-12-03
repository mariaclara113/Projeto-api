import { api } from "./api";

export const getProjetos = async () => {
  const res = await api.get("/api/projetos");
  return res.data;
};

export const createProjeto = async (data: any) => {
  const res = await api.post("/api/projetos", data);
  return res.data;
};

export const deleteProjeto = async (id: number) => {
  await api.delete(`/api/projetos/${id}`);
};
