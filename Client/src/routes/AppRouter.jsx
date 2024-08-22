import React from "react";
import { Route, Routes } from "react-router-dom";
import { PanelRoutes } from "../panel";
import { RutasProtegidas } from "../components/RutasProtegidas.jsx";
import { AutentificacionRoutes } from "../auth/routes/AutentificacionRoutes.jsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/home/*" element={<AutentificacionRoutes />} />
      <Route element ={<RutasProtegidas />}>
        <Route path="/*" element={<PanelRoutes />} />
      </Route>
    </Routes>
  );
};
