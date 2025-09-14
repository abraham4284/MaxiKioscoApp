import React from "react";
import { formatearTotal } from "../../../helpers";

export const ProductoSeleccionado = ({ dataToEdit }) => {
  return (
    <div className="card mb-3 w-full" style={{ maxWidth: "" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={dataToEdit?.img}
            className="img-fluid rounded-start"
            alt={dataToEdit?.Descripcion}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{dataToEdit?.Descripcion}</h5>

            <p className="card-text">
              Precio costo ➡️
              <strong>{formatearTotal(dataToEdit?.precioCosto)}</strong>
            </p>
            <p className="card-text">
              Precio venta ➡️
              <strong>{formatearTotal(dataToEdit?.Precio)}</strong>
            </p>
            <p className="card-text">
              Stock actual ➡️ <strong>{dataToEdit?.Stock}</strong>
            </p>
            <p className="card-text">
              Familia ➡️ <strong>{dataToEdit?.Familia}</strong>
            </p>
            <p className="card-text">
              Tipo de producto ➡️ <strong>{dataToEdit?.tipoProducto}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
