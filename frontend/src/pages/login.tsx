// src/pages/login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z, ZodError } from "zod";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

// Schema de validação
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

interface LoginErrors {
  email?: string;
  senha?: string;
}

interface Usuario {
  id: number;
  nome: string;
  role: "secretario" | "extensionista";
  token: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrors({});
    setApiError(null);
    setLoading(true);

    try {
      // Validação local
      loginSchema.parse({ email, senha });

      const response = await fetch("http://localhost:3333/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.error || "Erro desconhecido");
        setLoading(false);
        return;
      }

      const usuario: Usuario = data.usuario;

      // Salva o token e dados do usuário
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          id: usuario.id,
          nome: usuario.nome,
          role: usuario.role,
          token: usuario.token,
        })
      );

      // Redirecionamento baseado no role
      if (usuario.role === "secretario") {
        navigate("/home");
      } else {
        navigate("/projetos");
      }
    } catch (err: any) {
      if (err instanceof ZodError) {
        const fieldErrors: LoginErrors = {};
        const flattened = err.flatten().fieldErrors;
        Object.entries(flattened).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            fieldErrors[key as keyof LoginErrors] = value[0];
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error(err);
        setApiError("Erro inesperado ao tentar logar");
      }
    } finally {
      setLoading(false);
    }
  };

  // Cor de fundo visual apenas para exemplo
  const isSecretario = email.toLowerCase().includes("secretario");

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor={isSecretario ? "#e3f2fd" : "#fff3e0"}
      padding={2}
    >
      <Paper elevation={4} sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Login
        </Typography>

        {apiError && (
          <Typography color="error" mb={2} textAlign="center">
            {apiError}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />

        <TextField
          fullWidth
          label="Senha"
          type="password"
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          error={Boolean(errors.senha)}
          helperText={errors.senha}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: isSecretario ? "#0d47a1" : "#ff6f00",
            "&:hover": {
              bgcolor: isSecretario ? "#1565c0" : "#ff8f00",
            },
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </Paper>
    </Box>
  );
}