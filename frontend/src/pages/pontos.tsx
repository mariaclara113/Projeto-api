import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { z } from "zod";
import { api } from "../api/axiosClient";
import { createPontoSchema, Createpontos } from "../schemas/pontos";

type Ponto = {
  id: number;
  dataHora: string;
  tipo: "IN" | "OUT";
  observacao?: string;
  extensionista?: { id: number; nome: string };
  projeto?: { id: number; nome: string };
};

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

export const PontosPage = () => {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<Partial<Createpontos>>({});
  const [filters, setFilters] = useState({
    extensionistaId: "",
    projetoId: "",
    from: "",
    to: "",
  });
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const carregarPontos = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (filters.extensionistaId) params.extensionistaId = filters.extensionistaId;
      if (filters.projetoId) params.projetoId = filters.projetoId;
      if (filters.from) params.from = filters.from;
      if (filters.to) params.to = filters.to;

      const res = await api.get("/api/pontos", { params });
      setPontos(res.data);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Erro ao carregar pontos.", severity: "error" });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    carregarPontos();
  }, [carregarPontos]);

  const handleCreate = async () => {
    try {
      const parsed = createPontoSchema.parse({
        ...form,
        dataHora: String(form.dataHora),
      });
      await api.post("/api/pontos", parsed);
      setForm({});
      setFormOpen(false);
      carregarPontos();
      setSnackbar({ open: true, message: "Ponto criado com sucesso.", severity: "success" });
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
      await api.delete(`/api/pontos/${id}`);
      carregarPontos();
      setSnackbar({ open: true, message: "Ponto deletado.", severity: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Erro ao deletar ponto.", severity: "error" });
    }
  };

  const exportCsv = () => {
    const csv = [
      "id,dataHora,tipo,extensionista,projeto",
      ...pontos.map(
        (p) =>
          `${p.id},"${p.dataHora}","${p.tipo}","${p.extensionista?.nome || ""}","${
            p.projeto?.nome || ""
          }"`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pontos.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3} minHeight="100vh">
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 1200, p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
          Gerenciar Pontos
        </Typography>

        {/* Toolbar */}
        <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
          <Button variant="contained" onClick={() => setFormOpen(!formOpen)}>
            {formOpen ? "Fechar" : "Novo"}
          </Button>
          <Button variant="outlined" onClick={carregarPontos}>
            Atualizar
          </Button>
          <Button variant="outlined" onClick={exportCsv}>
            Exportar CSV
          </Button>
        </Box>

        {/* Filtros */}
        <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
          <TextField
            label="Extensionista ID"
            type="number"
            value={filters.extensionistaId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters({ ...filters, extensionistaId: e.target.value })
            }
            size="small"
          />
          <TextField
            label="Projeto ID"
            type="number"
            value={filters.projetoId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters({ ...filters, projetoId: e.target.value })
            }
            size="small"
          />
          <TextField
            label="De"
            type="date"
            value={filters.from}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters({ ...filters, from: e.target.value })
            }
            size="small"
          />
          <TextField
            label="Até"
            type="date"
            value={filters.to}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFilters({ ...filters, to: e.target.value })
            }
            size="small"
          />
          <Button variant="outlined" onClick={carregarPontos}>
            Aplicar filtros
          </Button>
        </Box>

        {/* Formulário */}
        {formOpen && (
          <Box display="flex" flexDirection="column" gap={2} mb={3}>
            <TextField
              label="Data e hora"
              type="datetime-local"
              value={form.dataHora || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, dataHora: e.target.value })
              }
              size="small"
            />
            <TextField
              label="Tipo"
              select
              value={form.tipo || "IN"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, tipo: e.target.value as "IN" | "OUT" })
              }
              size="small"
            >
              <MenuItem value="IN">IN</MenuItem>
              <MenuItem value="OUT">OUT</MenuItem>
            </TextField>
            <TextField
              label="Observação"
              value={form.observacao || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, observacao: e.target.value })
              }
              size="small"
            />
            <TextField
              label="Extensionista ID"
              type="number"
              value={form.extensionistaId || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, extensionistaId: Number(e.target.value) })
              }
              size="small"
            />
            <TextField
              label="Projeto ID"
              type="number"
              value={form.projetoId || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, projetoId: Number(e.target.value) })
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
                <Box component="th">Data</Box>
                <Box component="th">Tipo</Box>
                <Box component="th">Extensionista</Box>
                <Box component="th">Projeto</Box>
                <Box component="th">Ações</Box>
              </Box>
            </Box>
            <Box component="tbody">
              {pontos.map((p) => (
                <Box component="tr" key={p.id}>
                  <Box component="td">{p.id}</Box>
                  <Box component="td">{new Date(p.dataHora).toLocaleString()}</Box>
                  <Box component="td">{p.tipo}</Box>
                  <Box component="td">{p.extensionista?.nome}</Box>
                  <Box component="td">{p.projeto?.nome}</Box>
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
