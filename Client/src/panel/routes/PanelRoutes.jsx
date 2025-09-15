import React, { useEffect, useRef, useState } from "react";
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
import { DashboardPage } from "../Dashboard/pages/DashboardPage.jsx";
import { InformeDetalleVentasCompleto } from "../Dashboard/components/InformeDetalleVentasCompleto.jsx";
import { ConsultarPrecioProductos } from "../../components/ConsultarPrecioProductos.jsx";
import { useProductos } from "../../context/ProductosContext.jsx";

export const PanelRoutes = () => {
  const { productos, getProductos, loading, resetProductos } = useProductos();
  const [filterProductos, setFilterProductos] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const handleInputSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    setInputSearch(searchInput);
    if (searchInput === "") {
      setFilterProductos([]);
    }
    const filterProductosData = productos.filter((datos) => {
      return (
        datos.Descripcion.toLocaleLowerCase().includes(searchInput) ||
        datos.CodeBar.toLocaleLowerCase().includes(searchInput)
      );
    });
    setFilterProductos(filterProductosData);
  };

  const inputConsultarProducto = useRef(null);

  useEffect(() => {
    const handleOpenModal = (e) => {
      if (e.key === "F9") {
        e.preventDefault();
        getProductos();
        const modalElement = document.getElementById(
          "ModalConsultarPrecioProductos"
        );
        if (modalElement) {
          const modalInstance = new bootstrap.Modal(modalElement);
          modalInstance.show();
        }
      }
    };

    window.addEventListener("keydown", handleOpenModal);
    return () => {
      window.removeEventListener("keydown", handleOpenModal);
      resetProductos();
    };
  }, []);

  useEffect(() => {
    const modal = document.getElementById("ModalConsultarPrecioProductos");
    if (!modal) return;
    const handleModalShow = () => {
      if (inputConsultarProducto.current) {
        inputConsultarProducto.current.focus();
      }
    };
    modal.addEventListener("shown.bs.modal", handleModalShow);
    return () => {
      modal.removeEventListener("shown.bs.modal", handleModalShow);
    };
  }, [inputConsultarProducto]);

  return (
    <div className="">
      <Navbar />
      <ConsultarPrecioProductos
        data={filterProductos}
        loading={loading}
        inputSearch={inputSearch}
        handleInputSearch={handleInputSearch}
        inputConsultarProducto={inputConsultarProducto}
      />
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
        <Route path="/proveedores/listar" element={<ListarProveedoresPage />} />
        <Route path="/negocio" element={<MiNegocioPage />} />
        <Route path="/configuracion" element={<MiConfiguracion />} />
      </Routes>
      <Footer />
    </div>
  );
};
