import React, { useEffect, useRef, useState } from "react";
import { CardClientes } from "../components/CardClientes";
import { TableVentas } from "../components/TableVentas";
import { CardDetalles } from "../components/CardDetalles";
import { useClientes } from "../../../context/ClientesContext.jsx";
import { useProductos } from "../../../context/ProductosContext.jsx";
import { useRegistraciones } from "../../../context/RegistracionesContext.jsx";
import { ModalCantidadProducto } from "../components/productos/ModalCantidadProducto.jsx";
import { ModalSearchProductos } from "../components/productos/ModalSearchProductos.jsx";

export const VentasPage = () => {
  const { getClientes } = useClientes();
  const { getProductos, productoEncontrado } =
    useProductos();
  const { getRegistraciones } = useRegistraciones();

  const [inputProductos, setInputProductos] = useState([]);
  const [inputDNI, setInputDNI] = useState("");
  const [dataToEdit, setDataToEdit] = useState(null);

  // Ref
  const btnAgregar = useRef(null);
  const btnAnular = useRef(null);
  const btnConfirmarVenta = useRef(null);
  const btnAnularVenta = useRef(null);
  const btnBuscarProducto = useRef(null);

  const inputCodeBarRef = useRef(null);
  const inputCantidadRef = useRef(null);
  const inputBuscarProducto = useRef(null);

  useEffect(() => {
    getClientes();
    getProductos();
    getRegistraciones();
  }, []);

  useEffect(() => {
    const handleBtnAgregar = (e) => {
      if (e.key === "F2") {
        e.preventDefault();
        btnAgregar.current.click();
      }
    };

    const handleBtnAnular = (e) => {
      if (e.key === "F3") {
        e.preventDefault();
        btnAnular.current.click();
      }
    };

    const handleBtnConfirmarVenta = (e) => {
      if (e.key === "F4") {
        e.preventDefault();
        btnConfirmarVenta.current.click();
      }
    };

    const handleBtnAnularVenta = (e) => {
      if (e.key === "F5") {
        e.preventDefault();
        btnAnularVenta.current.click();
        inputCodeBarRef.current.focus();
      }
    };

    const handleBtnSearchProducto = (e) => {
      if (e.key === "F7") {
        e.preventDefault();
        btnBuscarProducto.current.click();
      }
    };

    window.addEventListener("keydown", handleBtnAgregar);
    window.addEventListener("keydown", handleBtnAnular);
    window.addEventListener("keydown", handleBtnConfirmarVenta);
    window.addEventListener("keydown", handleBtnAnularVenta);
    window.addEventListener("keydown", handleBtnSearchProducto);
    return () => {
      window.removeEventListener("keydown", handleBtnAgregar);
      window.removeEventListener("keydown", handleBtnAnular);
      window.removeEventListener("keydown", handleBtnConfirmarVenta);
      window.removeEventListener("keydown", handleBtnAnularVenta);
      window.removeEventListener("keydown", handleBtnSearchProducto);
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-8">
            <div className="row mb-2">
              <div className="col-sm-12">
                {/* Clientes */}
                <CardClientes inputDNI={inputDNI} setInputDNI={setInputDNI} />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                {/* Tabla de ventas */}
                <TableVentas
                  inputProductos={inputProductos}
                  inputCantidadRef={inputCantidadRef}
                  inputCodeBarRef={inputCodeBarRef}
                  btnConfirmarVenta={btnConfirmarVenta}
                  btnAnularVenta={btnAnularVenta}
                  btnBuscarProducto={btnBuscarProducto}
                  setInputProductos={setInputProductos}
                  setInputDNI={setInputDNI}
                  setDataToEdit={setDataToEdit}
                />
                {/* End Tabla de ventas */}
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="row mb-2">
              <div className="col-sm-12">
                <CardDetalles
                  productoEncontrado={productoEncontrado}
                  inputCodeBarRef={inputCodeBarRef}
                  btnAnular={btnAnular}
                  btnAgregar={btnAgregar}
                  inputCantidadRef={inputCantidadRef}
                  setInputProductos={setInputProductos}
                />
              </div>
            </div>
          </div>
        </div>
        <ModalCantidadProducto dataToEdit={dataToEdit} />
        <ModalSearchProductos inputBuscarProducto={inputBuscarProducto} />
      </div>
    </>
  );
};
