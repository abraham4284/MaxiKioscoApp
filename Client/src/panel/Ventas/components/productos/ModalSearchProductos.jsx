import React, { useEffect, useState } from "react";
import { useProductos } from "../../../../context/ProductosContext";
import { TableProductosVentas } from "./TableProductosVentas";

export const ModalSearchProductos = ({ inputBuscarProducto }) => {
  const { productos } = useProductos();
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
    console.log(filterProductos);
    setFilterProductos(filterProductosData);
  };

  useEffect(() => {
    const modal = document.getElementById("ModalSearchProductos");

    const handleModalShow = () => {
      if (inputBuscarProducto.current) {
        inputBuscarProducto.current.focus();
      }
    };

    modal.addEventListener("shown.bs.modal", handleModalShow);

    return () => {
      modal.removeEventListener("shown.bs.modal", handleModalShow);
    };
  }, [inputBuscarProducto]);

  const productosFinalPrueba =
    filterProductos.length === 0
      ? []
      : filterProductos.length > 0
      ? filterProductos
      : productos;

  return (
    <div className="container">
      <div
        className="modal fade"
        id="ModalSearchProductos"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Buscar productos
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form form-control"
                placeholder="Buscar por nombre o CodeBar"
                value={inputSearch}
                onChange={handleInputSearch}
                ref={inputBuscarProducto}
              />
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th>CodeBar</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <TableProductosVentas data={productosFinalPrueba} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
