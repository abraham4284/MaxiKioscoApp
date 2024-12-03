import React from "react";
import { formatearTotal } from "../../../../helpers/formatearTotal";
import { useRegistraciones } from "../../../../context/RegistracionesContext";

export const TableRegistracionesDetalles = ({ data }) => {
  const { loadingDetalles } = useRegistraciones();

  return (
    <>
      {loadingDetalles ? (
        <tr>
          <td>Cargando...</td>
        </tr>
      ) : (
        data.map((el) => (
          <tr key={el.idDetalleRegistraciones}>
            <td> {el.Descripcion} </td>
            <td> {el.Cantidad} </td>
            <td> {formatearTotal(el.PrecioUni)} </td>
            <td> {formatearTotal(el.Total)} </td>
          </tr>
        ))
      )}
    </>
  );
};
