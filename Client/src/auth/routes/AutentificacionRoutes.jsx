import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { NavbarSocial } from "../../components/NavbarSocial";
import { HomePage } from "../../panel/HomePage";
import { Footer } from "../../components/Footer";

export const AutentificacionRoutes = () => {
  return (
    <>
      <NavbarSocial />
      <Routes>
        {/* Redireccionar a /home/descripcion si se accede a /home */}
        {/* <Route path="/" element={<Navigate to="descripcion" />} /> */}
        <Route path="descripcion" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </>
  );
};
