import { apic } from "./apic";

export const getExtensionistas = async () => {
  const res = await apic.get("/api/extensionistas");
  return res.data;
};

export const createExtensionista = async (data: any) => {
  const res = await apic.post("/api/extensionistas", data);
  return res.data;
};

export const deleteExtensionista = async (id: number) => {
  await apic.delete(`/api/extensionistas/${id}`);
};
