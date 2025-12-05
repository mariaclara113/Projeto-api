// src/App.tsx
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { useState } from "react";
import Routes from "./routes"; // default export
import ThemeToggleFloating from "./components/ThemeToggleFloating";

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const theme = createTheme({ palette: { mode } });

  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Botão flutuante para alternar tema */}
      <ThemeToggleFloating toggleColorMode={toggleColorMode} mode={mode} />

      {/* Apenas renderiza as rotas */}
      <Routes />
    </ThemeProvider>
  );
}
