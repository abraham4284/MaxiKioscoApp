import React from "react";

export const TableProductosRegistros = ({ data, setDataToEdit }) => {
  const { img, CodeBar, Descripcion, Familia, Precio, Stock, tipoProducto } =
    data;
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
      <td>{CodeBar}</td>
      <td> {Descripcion}</td>
      <td> {Precio} </td>
      <td>{Stock}</td>
      <td>{Familia}</td>
      <td>{tipoProducto}</td>
      <td>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalModificarCantidadProducto"
          onClick={() => setDataToEdit(data)}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </td>
    </tr>
  );
};
