import React from "react";
import { Link } from "react-router-dom";
import { formatearTotal } from "../../../helpers/formatearTotal";

export const TableRegistraciones = ({ data }) => {
  const { idRegistraciones, NFactura, Fecha, Total } = data;
  return (
    <tr>
      <td> {NFactura} </td>
      <td> {Fecha} </td>
      <td> {formatearTotal(Total)} </td>
      <td>
        <Link 
        className="btn btn-info"
        to={`/panel/informes/${idRegistraciones}`}
         >Ver</Link>
      </td>
    </tr>
  );
};
