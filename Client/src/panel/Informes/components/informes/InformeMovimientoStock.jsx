import React, { useEffect, useState } from "react";
import { Spiner } from "../../../../components/Spiner";
import { TableMovientosStockRegistros } from "../TableMovientosStockRegistros";
import { getMovimientosRequest } from "../../../../api/movimientos/movimientos.api";
import { renderIconoMovimiento } from "../../helpers";

export const InformeMovimientoStock = ({ movimientos, loading }) => {
 
  return (
    <div className="col-sm-12 mt-3">
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: "#4e73df", color: "white" }}
        >
          Movimientos de Stock
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>IMG</th>
                      <th>Fecha</th>
                      <th>CodeBar</th>
                      <th>Descripcion</th>
                      <th>Motivo</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {loading ? (
                      <tr>
                        <td colSpan="3">
                          {" "}
                          <Spiner />{" "}
                        </td>
                      </tr>
                    ) : movimientos.length > 0 ? (
                      movimientos.map((datos) => (
                        <TableMovientosStockRegistros
                          key={datos.idMovimientoStock}
                          data={datos}
                          renderIconoMovimiento={renderIconoMovimiento}
                        />
                      ))
                    ) : (
                      <tr>
                        <td className="text-start"> No hay movimientos</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
