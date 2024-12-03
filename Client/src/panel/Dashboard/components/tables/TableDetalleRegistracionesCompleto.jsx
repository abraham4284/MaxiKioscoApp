import React from "react";
import { formatearTotal } from "../../../../helpers/formatearTotal";

export const TableDetalleRegistracionesCompleto = ({
  loadingDetalles,
  data,
  mostrarParaImprimir,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-12 mt-3">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12">
                <div className="">
                  <table className="table table-sm table-hover table-light">
                    <thead>
                      <tr>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                        <th>Precio Costo</th>
                        <th>Precio Venta</th>
                        <th>Subtotal Costo</th>
                        <th>Subtotal Venta</th>
                        <th>Ganacia</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      <>
                        {loadingDetalles ? (
                          <tr>
                            <td>Cargando...</td>
                          </tr>
                        ) : (
                          data.map((el) => {
                            let ganancia = el.Total - el.totalCosto;
                            console.log(el)
                            return (
                              <tr key={el.idDetalleRegistraciones}>
                                <td> {el.Descripcion} </td>
                                <td> {el.Cantidad} </td>
                                <td> {formatearTotal(el.precioUniCosto)} </td>
                                <td> {formatearTotal(el.PrecioUni)} </td>
                                <td> {formatearTotal(el.totalCosto)} </td>
                                <td> {formatearTotal(el.Total)} </td>
                                <td> {formatearTotal(ganancia)} </td>
                              </tr>
                            );
                          })
                        )}
                      </>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mostrarParaImprimir && (
        <div className="row text-center mt-5">
          <p className="copyright">
            {" "}
            <i
              className="fa-solid fa-code"
              style={{ color: "#00fca8" }}
            ></i>{" "}
            <b>
              Abraham<b style={{ color: "#00fca8" }}>Tech</b>.com | Soluciones
              Tecnologicas © 2024
            </b>
          </p>
        </div>
      )}
    </>
  );
};
