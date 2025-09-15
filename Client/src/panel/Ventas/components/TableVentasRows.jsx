import React from "react";

export const TableVentasRows = ({
  carrito,
  handleEliminarCarrito,
  setDataToEdit,
  estadoVenta,
}) => {
  const { idProductos, img, Descripcion, Precio, Cantidad, SubTotal } =
    carrito;
  return (
    <tr>
      <img
        src={img}
        alt={Descripcion}
        style={{
          width: "50px",
          height: "50px",
          objectFit: "cover",
          borderRadius: "1.5rem",
        }}
      />
      <td> {Descripcion}</td>
      <td> {Precio} </td>
      <td>{Cantidad}</td>
      <td>{SubTotal}</td>
      <td className="d-flex gap-2">
        <button
          className="btn btn-outline-danger"
          onClick={() => handleEliminarCarrito(idProductos)}
          disabled={estadoVenta}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
        <button
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#ModalCantidad"
          disabled={estadoVenta}
          onClick={() => setDataToEdit(carrito)}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </td>
    </tr>
  );
};
