import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { z } from "zod";
import { api } from "../api/axiosClient";
import { createProjetoSchema, CreateProjeto } from "../schemas/projetos";

type Projeto = {
  id: number;
  nome: string;
  descricao?: string;
};

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

export const ProjetosPage = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<Partial<CreateProjeto>>({});
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const carregarProjetos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/projetos");
      setProjetos(res.data);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Erro ao carregar projetos.", severity: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarProjetos();
  }, [carregarProjetos]);

  const handleCreate = async () => {
    try {
      const parsed = createProjetoSchema.parse(form);
      await api.post("/api/projetos", parsed);
      setForm({});
      setFormOpen(false);
      carregarProjetos();
      setSnackbar({ open: true, message: "Projeto criado com sucesso.", severity: "success" });
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        alert(err.issues.map((i) => i.message).join("\n"));
      } else {
        alert("Erro: " + err.message);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deletar?")) return;
    try {
      await api.delete(`/api/projetos/${id}`);
      carregarProjetos();
      setSnackbar({ open: true, message: "Projeto deletado.", severity: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Erro ao deletar projeto.", severity: "error" });
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3} minHeight="100vh">
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 900, p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
          Gerenciar Projetos
        </Typography>

        {/* Toolbar */}
        <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
          <Button variant="contained" onClick={() => setFormOpen(!formOpen)}>
            {formOpen ? "Fechar" : "Novo"}
          </Button>
          <Button variant="outlined" onClick={carregarProjetos}>
            Atualizar
          </Button>
        </Box>

        {/* Formulário */}
        {formOpen && (
          <Box display="flex" flexDirection="column" gap={2} mb={3}>
            <TextField
              label="Nome"
              value={form.nome || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, nome: e.target.value })
              }
              size="small"
            />
            <TextField
              label="Descrição"
              value={form.descricao || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, descricao: e.target.value })
              }
              size="small"
            />
            <Button variant="contained" onClick={handleCreate}>
              Salvar
            </Button>
          </Box>
        )}

        {/* Tabela */}
        {loading ? (
          <Typography>Carregando...</Typography>
        ) : (
          <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
            <Box component="thead">
              <Box component="tr">
                <Box component="th">ID</Box>
                <Box component="th">Nome</Box>
                <Box component="th">Descrição</Box>
                <Box component="th">Ações</Box>
              </Box>
            </Box>
            <Box component="tbody">
              {projetos.map((p) => (
                <Box component="tr" key={p.id}>
                  <Box component="td">{p.id}</Box>
                  <Box component="td">{p.nome}</Box>
                  <Box component="td">{p.descricao}</Box>
                  <Box component="td">
                    <Button color="error" size="small" onClick={() => handleDelete(p.id)}>
                      Excluir
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};
