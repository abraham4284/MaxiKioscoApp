import React from "react";
import { formatearTotal } from "../../../helpers/formatearTotal";

export const TableProductosRows = ({ data, setDataToEdit, deleteData }) => {
  return (
    <>
      {data.length > 0  ? (
        data.map((el) => (
          <tr key={el.idProductos}>
            <td>{el.CodeBar}</td>
            <td> {el.Descripcion}</td>
            <td> {formatearTotal(el.Precio)} </td>
            <td>{el.Stock}</td>
            <td>{el.Familia}</td>
            <td>
              <div className="cont-btn" style={{ display: "flex", gap: "5px" }}>
                <button
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalProductos"
                  onClick={() => setDataToEdit(el)}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteData(el.idProductos)}
                >
                  <i className="fa-solid fa-delete-left"></i>
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td>No hay datos</td>
        </tr>
      )}
    </>
  );
};
