import { useEffect, useState } from "react";
import type { CreateExtensionista } from "../api/apic"; // type-only import
import { apiClient } from "../api/apiClient"; // Certifique-se de ter esse arquivo
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

export default function ExtensionistasPage() {
  const [extensionistas, setExtensionistas] = useState<CreateExtensionista[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExtensionistas = async () => {
      try {
        const res = await apiClient.get("/api/extensionistas");
        setExtensionistas(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchExtensionistas();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Extensionistas</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {extensionistas.map((ext) => (
            <TableRow key={ext.id}>
              <TableCell>{ext.id}</TableCell>
              <TableCell>{ext.nome}</TableCell>
              <TableCell>{ext.email}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary">Editar</Button>
                <Button variant="outlined" color="secondary">Excluir</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
