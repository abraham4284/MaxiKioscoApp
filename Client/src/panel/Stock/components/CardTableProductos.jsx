import React, { useEffect } from "react";
import { TableProductosRows } from "./TableProductosRows";
import { Spiner } from "../../../components/Spiner";
import { useProductos } from "../../../context/ProductosContext";

export const CardTableProductos = ({
  data,
  setDataToEdit
}) => {
   const { deleteProductos, loading } = useProductos();

  return (
    <table className="table">
      <thead>
        <tr>
          <th>CodeBar</th>
          <th>img</th>
          <th>Descripcion</th>
          <th>precio-Costo</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Familia</th>
          <th>Tipo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {loading ? (
          <tr>
            <td colSpan="3">
              <Spiner />{" "}
            </td>
          </tr>
        ): (
          <TableProductosRows
           data={data}
           setDataToEdit={setDataToEdit}
           deleteData={deleteProductos}
          />
        ) 
      }
      </tbody>
    </table>
  );
};
