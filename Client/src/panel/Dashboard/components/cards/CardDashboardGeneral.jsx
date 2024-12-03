import React from "react";
import { formatearTotal } from "../../../../helpers/formatearTotal.js";

export const CardDashboardGeneral = ({
  totalVentasHoy,
  totalGanaciaHoy,
  totalVentaGeneral,
  totalGanaciaGeneral,
  getRegistraciones
}) => {
  return (
    <>
      <div
        className="card-header"
        style={{ backgroundColor: "#4e73df", color: "white" }}
      >
        <div className="d-flex gap-2 align-items-center">
          <span>Informe de ventas diarias</span>
          <button 
          className="btn btn-dark"
          title="Recargar"
          onClick={ async ()=> await getRegistraciones()}
          >
            {" "}
            <i className="fa-solid fa-arrows-rotate"></i>{" "}
          </button>
        </div>
      </div>
      <div className="row mt-5 justify-content-center p-3">
        <div className="col-lg-3 col-md-4 col-sm-12">
          <div
            className="card mb-3 bg-dark text-white card-hover"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header fs-5 bg-transparent ">
              <b>Total de ventas hoy</b>
            </div>
            <div className="card-body">
              <p className="card-text fs-5 totalHoy">
                {formatearTotal(totalVentasHoy ? totalVentasHoy : 0)}
              </p>
            </div>
            <div className="card-footer bg-transparent ">
              Este valor es dinamico
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12">
          <div
            className="card bg-dark mb-3 text-white card-hover"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header fs-5 bg-transparent">
              <b> Total de ganancia hoy</b>
            </div>
            <div className="card-body">
              <p className="card-text fs-5 totales">
                {formatearTotal(totalGanaciaHoy ? totalGanaciaHoy : 0)}
              </p>
            </div>
            <div className="card-footer bg-transparent ">
              Este valor es dinamico
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12">
          <div
            className="card  bg-dark mb-3 text-white card-hover"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header fs-5 bg-transparent ">
              <b>Ventas totales</b>
            </div>
            <div className="card-body">
              <p className="card-text fs-5 totales">
                {" "}
                {formatearTotal(totalVentaGeneral ? totalVentaGeneral : 0)}
              </p>
            </div>
            <div className="card-footer bg-transparent ">
              Este valor es dinamico
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12">
          <div
            className="card  bg-dark mb-3 text-white card-hover"
            style={{ maxWidth: "20rem" }}
          >
            <div className="card-header fs-5 bg-transparent ">
              <b>Ganacia Totales</b>
            </div>
            <div className="card-body">
              <p className="card-text fs-5 totales">
                {" "}
                {formatearTotal(totalGanaciaGeneral ? totalGanaciaGeneral : 0)}
              </p>
            </div>
            <div className="card-footer bg-transparent ">
              Este valor es dinamico
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
