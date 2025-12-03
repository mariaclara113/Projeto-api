import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z, ZodError } from "zod";
import { apiClient } from "../api/apiClient";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      loginSchema.parse({ email, senha });

      const response = await apiClient.post("/login", { email, senha });
      console.log("Usuário logado:", response.data);

      navigate("/projetos"); // Redireciona após login
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        setErrors({
          email: fieldErrors.email?.[0],
          senha: fieldErrors.senha?.[0],
        });
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {errors.senha && <span style={{ color: "red" }}>{errors.senha}</span>}
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
