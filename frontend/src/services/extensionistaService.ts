import { api } from "./api";

export const getExtensionistas = async () => {
  const res = await api.get("/api/extensionistas");
  return res.data;
};

export const createExtensionista = async (data: any) => {
  const res = await api.post("/api/extensionistas", data);
  return res.data;
};

export const deleteExtensionista = async (id: number) => {
  await api.delete(`/api/extensionistas/${id}`);
};