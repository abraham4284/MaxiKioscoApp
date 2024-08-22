import React from "react";

export const CardClientes = ({
  busquedarClienteDNI,
  cliente,
  setCliente,
  inputDNI,
  setInputDNI,
}) => {
  const handleChangeInput = (e) => {
    setInputDNI(e.target.value);
  };

  const handleKeyDownInput = (e) => {
    if (e.key === "Enter") {
      const CUIT = e.target.value;
      setInputDNI(CUIT);
      if (CUIT.trim() === "") {
        setCliente("");
      } else {
        const clienteNombre = busquedarClienteDNI(CUIT);
        setCliente(clienteNombre);
      }
    }
  };

  


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
              <p className="mt-1"> {cliente} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
