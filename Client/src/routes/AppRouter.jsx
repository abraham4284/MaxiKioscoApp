import React from "react";
import { Route, Routes } from "react-router-dom";
import { PanelRoutes } from "../panel/routes/PanelRoutes.jsx";
import { RutasProtegidas } from "../components/RutasProtegidas.jsx";
import { RoutasPublicas } from "../panel/routes/RoutasPublicas.jsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<RoutasPublicas />} />
      
      <Route element={<RutasProtegidas />}>
        <Route path="/panel/*" element={<PanelRoutes />} />
      </Route>
    </Routes>
  );
};
