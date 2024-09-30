import React, { useEffect, useState } from "react";
import { Spiner } from "../../../../components/Spiner";
import { TableMovientosStockRegistros } from "../TableMovientosStockRegistros";
import { getMovimientosRequest } from "../../../../api/movimientos/movimientos.api";

export const InformeMovimientoStock = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [error, setError] = useState(null);
  const [loadingMovimientos, setLoadingMovimientos] = useState(true);
  const getMovimientos = async () => {
    try {
      const { data } = await getMovimientosRequest();
      if (!data) {
        setMovimientos(null);
        setLoadingMovimientos(false);
        setError(data);
      }
      setMovimientos(data);
      setLoadingMovimientos(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error,
        errorCompleto: error,
        message: "Error en getMovimientos InformesStockCritico.jsx",
      });
    }
  };

  useEffect(() => {
    getMovimientos();
  }, []);

  
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
                      <th>Fecha</th>
                      <th>CodeBar</th>
                      <th>Descripcion</th>
                      <th>Motivo</th>
                      <th>Cantidad</th>
                      <th>idProductos</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {loadingMovimientos ? (
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
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3"> No hay datos</td>
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
