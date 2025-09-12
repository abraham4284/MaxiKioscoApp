import React, { useState } from "react";
import { useClientes } from "../../../context/ClientesContext";

export const CardClientes = ( { inputDNI, setInputDNI }) => {
  const { clienteEncontrado, buscarClientesPorDNI } = useClientes();

  const handleChangeInput = (e) => {
    setInputDNI(e.target.value);
  };

  const handleKeyDownInput = async (e) => {
    if (e.key === "Enter") {
      const CUIT = e.target.value;
      setInputDNI(CUIT);
      if (CUIT.trim() === "") {
        setInputDNI("");
      } else {
        await buscarClientesPorDNI(CUIT);
      }
    }
  };

  const clienteFinal =
    clienteEncontrado === "Consumidor Final" || clienteEncontrado === ""
      ? "Consumidor Final"
      : `${clienteEncontrado.Apellido} ${clienteEncontrado.Nombre}`;

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
              <label form="nro_documento">Nro Documento</label>
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Ingrese el DNI"
                value={inputDNI}
                onChange={handleChangeInput}
                onKeyDown={handleKeyDownInput}
                tabIndex={1}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label form="nombre">Cliente</label>
              <p className="mt-1"> {clienteFinal} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
