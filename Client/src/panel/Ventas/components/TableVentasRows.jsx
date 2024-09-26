import React from "react";

export const TableVentasRows = ({ carrito, handleEliminarCarrito }) => {
  const { idProductos,CodeBar, Descripcion, precio, cantidad, subTotal } = carrito;

  return (
    <tr>
      <td>{CodeBar}</td>
      <td> {Descripcion}</td>
      <td> {precio} </td>
      <td>{cantidad}</td>
      <td>{subTotal}</td>
      <td>
        <button className="btn btn-outline-danger" onClick={()=> handleEliminarCarrito(idProductos)}><i className="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  );
};
