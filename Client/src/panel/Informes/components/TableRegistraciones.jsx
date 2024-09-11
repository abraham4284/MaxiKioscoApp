import React from "react";
import { Link } from "react-router-dom";
import { formatearTotal } from "../../../helpers/formatearTotal";
import { helpHttp } from "../../../helpers/helpHttp";

export const TableRegistraciones = ({ data }) => {
  const { idRegistraciones, NFactura, Fecha, Total } = data;

  const URL = import.meta.env.VITE_BACKEND_URL;
  const { get } = helpHttp();
  const descargarTiket = (idRegistraciones) => {
    get(`${URL}/ticket/${idRegistraciones}`, { responseType: 'blob' })
      .then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          // Crear una URL para el blob
          const blob = new Blob([res], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
  
          // Crear un enlace para descargar el archivo
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${NFactura}.pdf`); // Nombre del archivo
          document.body.appendChild(link);
  
          // Hacer clic en el enlace para descargar el archivo
          link.click();
  
          // Limpiar el URL del objeto y el enlace
          link.remove();
          window.URL.revokeObjectURL(url);
        }
      })
      .catch((err) => console.log(err));
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
          onClick={()=> descargarTiket(idRegistraciones)}
        >
          <i className="fa-solid fa-file-pdf"></i>
        </button>
      </td>
    </tr>
  );
};
