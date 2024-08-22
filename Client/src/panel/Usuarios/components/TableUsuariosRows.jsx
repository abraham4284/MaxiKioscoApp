import React from 'react'

export const TableUsuariosRows = ({ data, setDataToEdit, deleteData }) => {

    const { idUsuarios, Username, Password } = data;

    return (
        <tbody className="table-group-divider">
            <tr>
                <th scope="row">{idUsuarios}</th>
                <td>{Username}</td>
                <td> {Password}</td>
                <td className='d-flex gap-2'>
                    <button
                        className='btn btn-warning'
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalUsuarios"
                        onClick={() => setDataToEdit(data)}
                    >
                        <i className="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button
                        className='btn btn-danger'
                        onClick={()=> deleteData(idUsuarios)}
                    >
                        <i className="fa-solid fa-delete-left"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    )
}
