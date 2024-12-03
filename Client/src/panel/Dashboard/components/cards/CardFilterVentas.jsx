import React from "react";
import { formatearTotal } from "../../../../helpers/formatearTotal.js";

export const CardFilterVentas = ({
  setFecha,
  setFechaFin,
  fecha,
  fechaFin,
  inputFactura,
  handleFilterVentasByFactura,
  onClickResetFechas,
  totalVentaPorDia,
  totalGanaciasPorDia,
  totalVentaPorRango,
  totalGanaciasPorRango

}) => {
  return (
    <div>
      <div
        className="card-header "
        style={{ backgroundColor: "#4e73df", color: "white" }}
      >
        Filtrar por fechas de ventas
      </div>
      <div className="cont d-flex justify-content-center align-items-baseline mt-4 gap-3 ">
        <p>Seleccione fechas</p>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
        <button className="btn btn-outline-danger" onClick={onClickResetFechas}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <div className="alert alert-primary" role="alert">
          Ventas por dia:{" "}
          {formatearTotal(totalVentaPorDia ? totalVentaPorDia : 0)}
        </div>
        <div className="alert alert-primary" role="alert">
          Ganancia por dia:{" "}
          {formatearTotal(totalGanaciasPorDia ? totalGanaciasPorDia : 0)}
        </div>
        <div className="alert alert-info" role="alert">
          Ventas por rango:{" "}
          {formatearTotal(totalVentaPorRango ? totalVentaPorRango : 0)}
        </div>
        <div className="alert alert-success" role="alert">
          Ganancia por rango:{" "}
          {formatearTotal(totalGanaciasPorRango ? totalGanaciasPorRango : 0)}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          Buscar venta
          <input
            type="text"
            className="form form-control mt-2"
            placeholder="Buscar por numero de factura"
            value={inputFactura}
            onChange={handleFilterVentasByFactura}
          />
        </div>
      </div>
    </div>
  );
};
