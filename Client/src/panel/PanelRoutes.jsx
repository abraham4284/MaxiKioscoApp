import React from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import { RutasProtegidas } from "../components/RutasProtegidas.jsx";
import { FormNegocios } from "../components/FormNegocios.jsx";
import { VentasPage } from "./Ventas/pages/VentasPage.jsx";
import { ListarInformesPages } from "./Informes/pages/ListarInformesPages.jsx";
import { InformeDetallePages } from "./Informes/pages/InformeDetallePages.jsx";
import { ListarProductosPage } from "./Stock/index.js";
import { ListarClientesPage } from "./Clientes/pages/ListarClientesPage.jsx";
import { ListarProveedoresPage } from "./Proveedores/pages/ListarProveedoresPage.jsx";
import { MiNegocioPage } from "./MiNegocio/pages/MiNegocioPage.jsx";
import { MiConfiguracion } from "./Usuarios/pages/MiConfiguracion.jsx";
import { Footer } from "../components/Footer.jsx";

export const PanelRoutes = () => {
  return (
    <>
      <div className="">
        <Navbar />
        <Routes>
          {/* Rutas privadas */}
         
          <Route path="/crearNegocio" element={<FormNegocios />} />
          {/* Panel de ventas */}
          <Route path="/ventas" element={<VentasPage />} />
          <Route path="/informes" element={<ListarInformesPages />} />
          <Route path="/informes/:id" element={<InformeDetallePages />} />
          {/*Panel de pruductos */}
          <Route path="/productos/listar" element={<ListarProductosPage />} />
          {/* Panel de Clientes */}
          <Route path="/clientes/listar" element={<ListarClientesPage />} />
          <Route
            path="/proveedores/listar"
            element={<ListarProveedoresPage />}
          />
          {/* end Rutas privadas */}

          {/* Mi negocio */}
          <Route path="/negocio" element={<MiNegocioPage />} />
          {/* End Mi negocio */}

          {/* Mi Configuracion */}
          <Route path="/configuracion" element={<MiConfiguracion />} />
          {/* End Mi Configuracion */}
        </Routes>
        <Footer/>
      </div>
    </>
  );
};
