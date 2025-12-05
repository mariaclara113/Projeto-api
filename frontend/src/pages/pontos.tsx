import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { z } from "zod";
import { api } from "../api/axiosClient";
import { createProjetoSchema } from "../schemas/projetos";

type CreateProjeto = z.infer<typeof createProjetoSchema>;

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

export default function ProjetosPage() {
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
      setSnackbar({
        open: true,
        message: "Erro ao carregar projetos.",
        severity: "error",
      });
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
      setSnackbar({
        open: true,
        message: "Projeto criado com sucesso.",
        severity: "success",
      });
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        alert(err.issues.map((i) => i.message).join("\n"));
      } else {
        alert("Erro: " + err.message);
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deletar este projeto?")) return;
    try {
      await api.delete(`/api/projetos/${id}`);
      carregarProjetos();
      setSnackbar({
        open: true,
        message: "Projeto deletado.",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: "Erro ao deletar projeto.",
        severity: "error",
      });
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3} minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={4} sx={{ width: "100%", maxWidth: 900, p: 3, borderRadius: 2 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          mb={3}
          textAlign="center"
          color="#0D3B66"
        >
          Gerenciar Projetos
        </Typography>

        {/* Toolbar */}
        <Stack direction="row" spacing={2} mb={3} flexWrap="wrap" justifyContent="center">
          <Button variant="contained" color="primary" onClick={() => setFormOpen(!formOpen)}>
            {formOpen ? "Fechar" : "Novo"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={carregarProjetos}>
            Atualizar
          </Button>
        </Stack>

        {/* Formulário */}
        {formOpen && (
          <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2, backgroundColor: "#f0f0f0" }}>
            <Stack spacing={2}>
              <TextField
                label="Nome"
                value={form.nome || ""}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                size="small"
              />
              <TextField
                label="Descrição"
                value={form.descricao || ""}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                size="small"
              />
              <Button variant="contained" color="success" onClick={handleCreate}>
                Salvar
              </Button>
            </Stack>
          </Paper>
        )}

        {/* Tabela */}
        {loading ? (
          <Typography>Carregando...</Typography>
        ) : (
          <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
            <Box component="thead">
              <Box component="tr" sx={{ backgroundColor: "#585a5cff", color: "#fff" }}>
                <Box component="th" sx={{ textAlign: "left", padding: 1 }}>ID</Box>
                <Box component="th" sx={{ textAlign: "left", padding: 1 }}>Nome</Box>
                <Box component="th" sx={{ textAlign: "left", padding: 1 }}>Descrição</Box>
                <Box component="th" sx={{ textAlign: "left", padding: 1 }}>Ações</Box>
              </Box>
            </Box>

            <Box component="tbody">
              {projetos.map((p) => (
                <Box
                  component="tr"
                  key={p.id}
                  sx={{
                    "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" },
                    "&:hover": { backgroundColor: "#e3f2fd" },
                  }}
                >
                  <Box component="td" sx={{ padding: 1 }}>{p.id}</Box>
                  <Box component="td" sx={{ padding: 1 }}>{p.nome}</Box>
                  <Box component="td" sx={{ padding: 1 }}>{p.descricao}</Box>
                  <Box component="td" sx={{ padding: 1 }}>
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
}