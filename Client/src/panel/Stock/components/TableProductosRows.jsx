import React from "react";
import { formatearTotal } from "../../../helpers/formatearTotal";

export const TableProductosRows = ({ data,setDataToEdit, deleteData }) => {

     const { idProductos, CodeBar, Descripcion, Precio, Stock, Familia} = data;

  return (
    <tr>
      <td>{CodeBar}</td>
      <td> {Descripcion}</td>
      <td> {formatearTotal(Precio)} </td>
      <td>{Stock}</td>
      <td>{Familia}</td>
      <td>
        <div className="cont-btn" style={{ display: "flex", gap: "5px" }}>
          <button 
          className="btn btn-warning"
          data-bs-toggle="modal" data-bs-target="#exampleModalProductos"
          onClick={()=> setDataToEdit(data)}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <button 
          className="btn btn-danger"
          onClick={()=> deleteData(idProductos)}
          >
            <i className="fa-solid fa-delete-left"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};
