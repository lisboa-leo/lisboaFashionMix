import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Se roles foram especificadas, verificamos se o perfil do usuário está na lista
  if (allowedRoles && !allowedRoles.includes(usuario.perfil)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
