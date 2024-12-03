import React from "react";
import { formatearTotal } from "../../../../helpers/formatearTotal";

export const CardTableRegistracionesCompleto = ({
  loadinRegistraciones,
  loading,
  NFactura,
  Fecha,
  clienteEncontrado,
  totalCosto,
  Total,
  ganancia
}) => {
  return (
    <div>
      <h3 className="mt-5">
        {loadinRegistraciones ? "Nº# Cargando..." : `Nº #${NFactura}`}
      </h3>
      <div className="row">
        <p className="mt-5">
          {loadinRegistraciones ? "Fecha: Cargando..." : `Fecha: ${Fecha}`}
        </p>
        <p className="">
          {loadinRegistraciones
            ? "Costo: Cargando..."
            : `Costo: ${formatearTotal(totalCosto)}`}
        </p>
        <p className="">
          {loadinRegistraciones
            ? "Total: Cargando..."
            : `Total: ${formatearTotal(Total)}`}
        </p>
        <p className="">
          {loadinRegistraciones
            ? "Ganancia: Cargando..."
            : `Ganancia: ${formatearTotal(ganancia)}`}
        </p>
        <p className="">
          {loading ? "Cliente: Cargando..." : `Cliente: ${clienteEncontrado}`}
        </p>
      </div>
    </div>
  );
};
