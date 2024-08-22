import React from "react";
import { Route, Routes } from "react-router-dom";
import { PanelRoutes } from "../panel";
import { RutasProtegidas } from "../components/RutasProtegidas.jsx";
import { HomePage } from "../panel/HomePage.jsx";
import { LoginPage } from "../auth/pages/LoginPage.jsx";
import { RegisterPage } from "../auth/pages/RegisterPage.jsx";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<RutasProtegidas />}>
        <Route path="/panel/*" element={<PanelRoutes />} />
      </Route>
    </Routes>
  );
};
