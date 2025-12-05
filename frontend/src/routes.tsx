// src/routes.tsx
import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/homee"; // corrigido
import ProjetosPage from "./pages/projetos"; // default export
import ExtensionistasPage from "./pages/extensionistas";
import PontosPage from "./pages/pontos"; // default export
import Layout from "./components/Layoutt"; // corrigido
import ProtectedRoute from "./components/ProtectedRoutes"; // corrigido

export default function Routes() {
  return (
    <RouterRoutes>
      {/* Rota pública: login */}
      <Route path="/" element={<Login />} />

      {/* Rotas protegidas dentro do layout */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />

        <Route
          path="/projetos"
          element={
            <ProtectedRoute allowedRoles={["secretario", "extensionista"]}>
              <ProjetosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/extensionistas"
          element={
            <ProtectedRoute allowedRoles={["secretario"]}>
              <ExtensionistasPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pontos"
          element={
            <ProtectedRoute allowedRoles={["secretario", "extensionista"]}>
              <PontosPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Redirecionamento padrão para login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
}
