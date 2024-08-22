import React from 'react'

export const TableClientesRows = ({ data, setDataToEdit, deleteData }) => {
  const { CUIT, Nombre, Apellido, Correo, Domicilio, idClientes } = data;

  return (
    
      <tr>
        <th>{CUIT}</th>
        <td>{Nombre}</td>
        <td> {Apellido}</td>
        <td> {Correo} </td>
        <td>{Domicilio}</td>
        <td className='d-flex gap-2'>
          <button
            className='btn btn-warning'
            data-bs-toggle="modal" data-bs-target="#exampleModal"
            onClick={() => setDataToEdit(data)}
          >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
          <button
            className='btn btn-danger'
            onClick={()=> deleteData(idClientes)}
          >
            <i className="fa-solid fa-delete-left"></i>
          </button>
        </td>
      </tr>

    
  )
}
