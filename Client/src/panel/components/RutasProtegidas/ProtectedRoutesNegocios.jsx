import React from "react";
import { useNegocios } from "../../../context/NegociosContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutesNegocios = () => {
  const { negocios } = useNegocios();
  console.log(negocios)
  if (negocios.length === 1) return <Navigate to="/panel/ventas" replace />;

  return <Outlet />;
};
