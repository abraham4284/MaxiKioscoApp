import React from "react";

export const TableClientesRows = ({ data, setDataToEdit, deleteData }) => {

  return (
    <>
      {data.length > 0 ? (
        data.map((el) => (
          <tr key={el.idClientes}>
            <th>{el.CUIT}</th>
            <td>{el.Nombre}</td>
            <td> {el.Apellido}</td>
            <td> {el.Correo} </td>
            <td>{el.Domicilio}</td>
            <td className="d-flex gap-2">
              <button
                className="btn btn-warning"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => setDataToEdit(el)}
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteData(el.idClientes)}
              >
                <i className="fa-solid fa-delete-left"></i>
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td>No hay datos</td>
        </tr>
      )}
    </>
    // <tr>
    //   <th>{CUIT}</th>
    //   <td>{Nombre}</td>
    //   <td> {Apellido}</td>
    //   <td> {Correo} </td>
    //   <td>{Domicilio}</td>
    //   <td className='d-flex gap-2'>
    //     <button
    //       className='btn btn-warning'
    //       data-bs-toggle="modal" data-bs-target="#exampleModal"
    //       onClick={() => setDataToEdit(data)}
    //     >
    //       <i className="fa-regular fa-pen-to-square"></i>
    //     </button>
    //     <button
    //       className='btn btn-danger'
    //       onClick={()=> deleteData(idClientes)}
    //     >
    //       <i className="fa-solid fa-delete-left"></i>
    //     </button>
    //   </td>
    // </tr>
  );
};
