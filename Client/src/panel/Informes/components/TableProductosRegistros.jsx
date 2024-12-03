import React from "react";

export const TableProductosRegistros = ({ data, setDataToEdit }) => {
  const { CodeBar, Descripcion, Familia, Precio, Stock, tipoProducto } = data;
  return (
    <tr>
      <td>{CodeBar}</td>
      <td> {Descripcion}</td>
      <td> {Precio} </td>
      <td>{Stock}</td>
      <td>{Familia}</td>
      <td>{tipoProducto}</td>
      <td>
        <button
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalProductos"
          onClick={()=> setDataToEdit(data)}
        >
          Editar
        </button>
      </td>
    </tr>
  );
};
