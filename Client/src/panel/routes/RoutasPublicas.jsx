import React from "react";
import { NavbarSocial } from "../../components/NavbarSocial";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../HomePage";
import { NovedadesPage } from "../HomeDescription/NovedadesPage";
import { LoginPage } from "../../auth/pages/LoginPage";
import { RegisterPage } from "../../auth/pages/RegisterPage";
import { Footer } from "../../components/Footer";

export const RoutasPublicas = () => {
  return (
    <>
      <NavbarSocial />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/novedades" element={<NovedadesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
