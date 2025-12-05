// src/components/ProtectedRoute.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// Tipos de usuário aceitos
type UserRole = "secretario" | "extensionista";

interface ProtectedRouteProps {
  children: ReactNode;        // Componente protegido
  allowedRoles: UserRole[];   // Roles que podem acessar
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  // Busca dados do usuário no localStorage
  const stored = localStorage.getItem("usuario");

  // Se não estiver logado → redireciona imediatamente
  if (!stored) return <Navigate to="/login" replace />;

  try {
    const usuario = JSON.parse(stored) as { role: UserRole };

    // Se a role do usuário NÃO está na lista permitida → bloqueia
    if (!allowedRoles.includes(usuario.role)) {
      return <Navigate to="/login" replace />;
    }
  } catch {
    // JSON inválido/corrompido → força logout
    return <Navigate to="/login" replace />;
  }

  // Tudo ok → libera acesso
  return <>{children}</>;
}