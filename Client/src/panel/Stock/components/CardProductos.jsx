import React, { useEffect, useState } from "react";
import { ModalProductos } from "./ModalProductos";

export const CardProductos = ({
  dataToEdit,
  setDataToEdit,
  handleInput,
}) => {
  return (
    <div className="row mt-5">
      <div className="col-sm-12">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div
                className="card-header"
                style={{ backgroundColor: "#4e73df", color: "white" }}
              >
                Productos
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-10">
                    <div className="form-group">
                      <label form="nro_documento">Buscar Producto</label>
                      <input
                        type="text"
                        className="form-control form-control-xl"
                        placeholder="Ingrese nombre del producto"
                        name="CodeBar"
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="col-sm-2 mt-4">
                    <div className="form-group">
                      <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalProductos"
                        onClick={()=> setDataToEdit(null)}
                      >
                        <i className="fas-solid fa fa-plus "></i> Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      <ModalProductos
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
    </div>
  );
};
