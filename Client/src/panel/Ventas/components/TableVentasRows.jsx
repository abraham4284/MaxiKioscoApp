import React from "react";

export const TableVentasRows = ({ carrito, handleEliminarCarrito, setDataToEdit }) => {
  const { idProductos, CodeBar, Descripcion, Precio, Cantidad, SubTotal } =
    carrito;

  return (
    <tr>
      <td>{CodeBar}</td>
      <td> {Descripcion}</td>
      <td> {Precio} </td>
      <td>{Cantidad}</td>
      <td>{SubTotal}</td>
      <td className="d-flex gap-2">
        <button
          className="btn btn-outline-danger"
          onClick={() => handleEliminarCarrito(idProductos)}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
        <button
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#ModalCantidad"
          onClick={()=> setDataToEdit(carrito)}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </td>
    </tr>
  );
};
