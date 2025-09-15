import React from "react";
import { formatearTotal } from "../helpers";

export const CardProductoConsultarPrecio = ({ data, loading }) => {
  return (
    <div className="card mb-3 w-full" style={{ maxWidth: "" }}>
      {loading && <p>Cargando...</p>}

      {data.length === 0 ? (
        <h5 className="text-center mt-2 p-2">
          Ingrese el código de barra o nombre del producto
        </h5>
      ) : (
        data.map((el, index) => (
          <div className="row g-0" key={index}>
            <div className="col-md-4">
              <img
                src={el?.img}
                className="img-fluid rounded-start"
                alt={el?.Descripcion}
              />
            </div>
            <div className="col-md-8 d-flex align-items-center">
              <div className="card-body text-center">
                <h2 className="card-title fs-3 ">{el?.Descripcion}</h2>
                <p className="card-text fs-3 mt-3">
                  <strong>{formatearTotal(el?.Precio)}</strong>
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
