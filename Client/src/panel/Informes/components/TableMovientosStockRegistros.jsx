import React from "react";

export const TableMovientosStockRegistros = ({ data }) => {
    const { Fecha, CodeBar, Descripcion, Motivo, Cantidad} = data;
  return (
    <tr>
      <td> {Fecha} </td>
      <td>{CodeBar}</td>
      <td> {Descripcion}</td>
      <td>{Motivo}</td>
      <td>{Cantidad}</td>
    </tr>
  );
};
