import React from 'react'
import { formatearTotal } from '../../../helpers/formatearTotal';

export const TableRegistracionesDetalles = ({ data }) => {
    const { Descripcion, Cantidad, PrecioUni, Total  } = data;
  return (
    <tr>
        <td> { Descripcion } </td>
        <td> { Cantidad } </td>
        <td> { formatearTotal(PrecioUni) } </td>
        <td> { formatearTotal(Total) } </td>
    </tr>
  )
}
