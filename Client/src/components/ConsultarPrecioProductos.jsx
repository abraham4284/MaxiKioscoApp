import React from "react";
import { CardProductoConsultarPrecio } from "./CardProductoConsultarPrecio";

export const ConsultarPrecioProductos = ({
  data,
  loading,
  inputSearch,
  handleInputSearch,
  inputConsultarProducto,
}) => {
  return (
    <div className="container">
      <div
        className="modal fade"
        id="ModalConsultarPrecioProductos"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
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
                ref={inputConsultarProducto}
              />
            </div>
            <CardProductoConsultarPrecio data={data} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};
