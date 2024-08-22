import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const RutasProtegidas = () => {
  const { isAutenticated } = useAuth();

  if(isAutenticated){
    console.log("Verdadero")
  }else{
    console.log("Falso")
  }

  if (!isAutenticated) {
    return <Navigate to={"/home/descripcion"} />;
  }
  return <Outlet />;
};
