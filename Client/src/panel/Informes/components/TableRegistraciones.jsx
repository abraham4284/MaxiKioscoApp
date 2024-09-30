import React from "react";
import { Link } from "react-router-dom";
import { formatearTotal } from "../../../helpers/formatearTotal";
import { descargarTicketRequest } from "../../../api/comprobantes/ticket.api";

export const TableRegistraciones = ({ data }) => {
  const { idRegistraciones, NFactura, Fecha, Total } = data;

  const descargarTiket = async (idRegistraciones) => {
    try {
      const { data } = await descargarTicketRequest(idRegistraciones);
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
    <tr>
      <td> {NFactura} </td>
      <td> {Fecha} </td>
      <td> {formatearTotal(Total)} </td>
      <td className="d-flex gap-2">
        <Link
          className="btn btn-info"
          to={`/panel/informes/${idRegistraciones}`}
        >
          Ver
        </Link>
        <button
          className="btn btn-danger"
          onClick={async () => await descargarTiket(idRegistraciones)}
        >
          <i className="fa-solid fa-file-pdf"></i>
        </button>
      </td>
    </tr>
  );
};
