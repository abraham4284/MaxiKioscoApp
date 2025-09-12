import React from "react";

export const TableProveedoresRows = ({ data, setDataToEdit, deleteData }) => {
  const { idProveedores, CUIT, Nombre, Correo, Domicilio, tieneProducto } =
    data;

  return (
    <tr>
      <th>{CUIT}</th>
      <td>{Nombre}</td>
      <td> {Correo} </td>
      <td>{Domicilio}</td>
      <td className="d-flex gap-2">
        <button
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalProveedores"
          onClick={() => setDataToEdit(data)}
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </button>

        {tieneProducto === "SI" ? (
          ""
        ) : (
          <button
            className="btn btn-danger"
            onClick={() => deleteData(idProveedores)}
          >
            <i className="fa-solid fa-delete-left"></i>
          </button>
        )}
      </td>
    </tr>
  );
};
