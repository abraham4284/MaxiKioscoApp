import React, { useState } from "react";
import { useClientes } from "../../../context/ClientesContext";

export const CardClientes = ({ dataAll }) => {
  return (
    <div className="card">
      <div
        className="card-header"
        style={{ backgroundColor: "#4e73df", color: "white" }}
      >
        Cliente
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#ModalSearchClientes"
              >
                {" "}
                <i className="fa-solid fa-magnifying-glass"></i> Buscar cliente
              </button>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              {dataAll && (
                <>
                  <label form="nombre">Cliente</label>
                  <p className="mt-1">
                    {" "}
                    {dataAll?.Nombre} {dataAll?.Apellido}{" "}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
