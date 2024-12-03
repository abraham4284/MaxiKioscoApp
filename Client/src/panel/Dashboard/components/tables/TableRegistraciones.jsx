import React from "react";
import { Link } from "react-router-dom";
import { formatearTotal } from "../../../../helpers/formatearTotal";
import { descargarTicketRequest } from "../../../../api/comprobantes/ticket.api";
import { Spiner } from "../../../../components/Spiner";
import { formatearFechas } from "../../../../helpers/fechaLocal";

export const TableRegistraciones = ({ data, inputFactura, loading }) => {
  const descargarTiket = async (idRegistracionesn, NFactura) => {
    try {
      const { data } = await descargarTicketRequest(idRegistracionesn);
      if (!data) {
        console.log(data);
      } else {
        const blob = new Blob([data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${NFactura}.pdf`);
        document.body.appendChild(link);

        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en descargarTiket",
      });
    }
  };

  return (
    <div className="card-body">
      <div className="row">
        <div className="col-sm-12">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>NFactura</th>
                  <th>Fecha</th>
                  <th>Costo-Total</th>
                  <th>Total</th>
                  <th>Ganancia</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {loading ? (
                  <tr>
                    <td colSpan="3">
                      <Spiner />{" "}
                    </td>
                  </tr>
                ) : inputFactura === "" ? (
                  data &&
                  data.length > 0 &&
                  data.map((el) => {
                    let ganancia = el.Total - el.totalCosto;

                    return (
                      <tr key={el.idRegistraciones}>
                        <td> {el.NFactura} </td>
                        <td> {formatearFechas(el.Fecha)} </td>
                        <td> {formatearTotal(el.totalCosto)} </td>
                        <td> {formatearTotal(el.Total)} </td>
                        <td> {formatearTotal(ganancia)} </td>
                        <td className="d-flex gap-2 justify-content-center">
                          <Link
                            className="btn btn-info"
                            to={`/panel/informes/${el.idRegistraciones}`}
                          >
                            Ver
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={async () =>
                              await descargarTiket(
                                el.idRegistraciones,
                                el.NFactura
                              )
                            }
                          >
                            <i className="fa-solid fa-file-pdf"></i>
                          </button>
                          <Link
                            className="btn btn-primary"
                            to={`/panel/dashboard/ventas/detalle/${el.idRegistraciones}`}
                          >
                            Ver detalle
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  data.map((el) => {
                    let ganancia = el.Total - el.totalCosto;

                    return (
                      <tr key={el.idRegistraciones}>
                        <td> {el.NFactura} </td>
                        <td> {formatearFechas(el.Fecha)} </td>
                        <td> {formatearTotal(el.totalCosto)} </td>
                        <td> {formatearTotal(el.Total)} </td>
                        <td> {formatearTotal(ganancia)} </td>
                        <td className="d-flex gap-2 justify-content-center">
                          <Link
                            className="btn btn-info"
                            to={`/panel/informes/${el.idRegistraciones}`}
                          >
                            Ver
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={async () =>
                              await descargarTiket(
                                el.idRegistraciones,
                                el.NFactura
                              )
                            }
                          >
                            <i className="fa-solid fa-file-pdf"></i>
                          </button>
                          <Link
                            className="btn btn-primary"
                            to={`/panel/dashboard/ventas/detalle/${el.idRegistraciones}`}
                          >
                            Ver detalle
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
