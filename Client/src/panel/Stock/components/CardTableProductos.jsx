import React from "react";
import { TableProductosRows } from "./TableProductosRows";
import { Spiner } from "../../../components/Spiner";

export const CardTableProductos = ({ data, setDataToEdit, deleteData }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          
          <th>CodeBar</th>
          <th>Descripcion</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Familia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {data.length > 0 ? (
          data.map((datos) => (
            <TableProductosRows 
            key={datos.idProductos} 
            data={datos}
            setDataToEdit = {setDataToEdit}
            deleteData = {deleteData} 
            />
          ))
        ) : (
          <tr>
            <td colSpan="3"><Spiner/></td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
