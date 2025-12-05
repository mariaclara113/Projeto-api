import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Paper,
  TableContainer,
  Stack,
} from "@mui/material";

type Extensionista = {
  id: number;
  nome: string;
  email: string;
};

export default function ExtensionistasPage() {
  const [extensionistas, setExtensionistas] = useState<Extensionista[]>([]);
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

  const handleAdicionar = () => {
    // Aqui você pode abrir um modal ou redirecionar para a página de cadastro
    console.log("Adicionar Extensionista");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#0D3B66",
            fontWeight: "bold",
          }}
        >
          Extensionistas
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={handleAdicionar}
        >
          Adicionar Extensionista
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#0D3B66" }}>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>Nome</TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {extensionistas.map((ext) => (
              <TableRow key={ext.id}>
                <TableCell>{ext.id}</TableCell>
                <TableCell>{ext.nome}</TableCell>
                <TableCell>{ext.email}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="secondary">
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}