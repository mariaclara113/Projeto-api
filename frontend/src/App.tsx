import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Componente de troca de tema
import ThemeToggleFloating from "./components/ThemeToggleFloating";

// Páginas
import Login from "./pages/login";
import { ProjetosPage } from "./pages/projetos";
import { ExtensionistasPage } from "./pages/extensionistas";
import { PontosPage } from "./pages/pontos";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = createTheme({ palette: { mode } });

  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeToggleFloating toggleColorMode={toggleColorMode} mode={mode} />
      <Router>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Login />} />

          {/* Rotas privadas */}
          <Route path="/projetos" element={<ProjetosPage />} />
          <Route path="/extensionistas" element={<ExtensionistasPage />} />
          <Route path="/pontos" element={<PontosPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
