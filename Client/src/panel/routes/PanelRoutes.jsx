import React from "react";
import { Navbar } from "../../components/Navbar.jsx";
import { Route, Routes } from "react-router-dom";

import { FormNegocios } from "../../components/FormNegocios.jsx";
import { VentasPage } from "../Ventas/pages/VentasPage.jsx";
import { ListarInformesPages } from "../Informes/pages/ListarInformesPages.jsx";
import { InformeDetallePages } from "../Informes/pages/InformeDetallePages.jsx";
import { ListarProductosPage } from "../Stock/pages/ListarProductosPage.jsx";
import { ListarClientesPage } from "../Clientes/pages/ListarClientesPage.jsx";
import { ListarProveedoresPage } from "../Proveedores/pages/ListarProveedoresPage.jsx";
import { MiNegocioPage } from "../MiNegocio/pages/MiNegocioPage.jsx";
import { MiConfiguracion } from "../Usuarios/pages/MiConfiguracion.jsx";
import { Footer } from "../../components/Footer.jsx";
import { ProtectedRoutesNegocios } from "../components/RutasProtegidas/ProtectedRoutesNegocios.jsx";
import { DashboardPage } from "../Dashboard/pages/DashboardPage.jsx";
import { TableDetalleRegistracionesCompleto } from "../Dashboard/components/tables/TableDetalleRegistracionesCompleto.jsx";
import { InformeDetalleVentasCompleto } from "../Dashboard/components/InformeDetalleVentasCompleto.jsx";

export const PanelRoutes = () => {
  return (
    <>
      <div className="">
        <Navbar />
        <Routes>
          <Route path="/crearNegocio" element={<FormNegocios />} />
          <Route path="/ventas" element={<VentasPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/dashboard/ventas/detalle/:id"
            element={<InformeDetalleVentasCompleto />}
          />
          <Route path="/informes" element={<ListarInformesPages />} />
          <Route path="/informes/:id" element={<InformeDetallePages />} />
          <Route path="/productos/listar" element={<ListarProductosPage />} />
          <Route path="/clientes/listar" element={<ListarClientesPage />} />
          <Route
            path="/proveedores/listar"
            element={<ListarProveedoresPage />}
          />
          <Route path="/negocio" element={<MiNegocioPage />} />
          <Route path="/configuracion" element={<MiConfiguracion />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};
