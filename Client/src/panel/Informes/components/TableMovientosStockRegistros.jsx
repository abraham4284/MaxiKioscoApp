import React from "react";

export const TableMovientosStockRegistros = ({
  data,
  renderIconoMovimiento,
}) => {
  const {  img, Fecha, CodeBar, Descripcion, Motivo, Cantidad } = data;
  return (
    <tr>
      <td>
        <img
          src={img}
          alt=""
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "1.5rem",
          }}
        />
      </td>
      <td> {Fecha} </td>
      <td>{CodeBar}</td>
      <td> {Descripcion}</td>
      <td>{renderIconoMovimiento(Motivo)}</td>
      <td>{Cantidad}</td>
    </tr>
  );
};
