import React, { useState } from "react";

export const ModalTableClientes = ({ data, loading, addData, dataAll }) => {
  const [filterClientes, setFilterClientes] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const handleInputSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    setInputSearch(searchInput);
    if (searchInput === "") {
      setFilterClientes([]);
    }
    const filterClientes = data.filter((datos) => {
      return (
        datos.Nombre.toLocaleLowerCase().includes(searchInput) ||
        datos.Apellido.toLocaleLowerCase().includes(searchInput)
      );
    });
    setFilterClientes(filterClientes);
  };

  const clientesFinal = filterClientes.length === 0 ? data : filterClientes;

  return (
    <div className="container">
      <div
        className="modal fade"
        id="ModalSearchClientes"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Buscar clientes
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form form-control"
                placeholder="Buscar por nombre o CodeBar"
                value={inputSearch}
                onChange={handleInputSearch}
              />
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th>CUIT</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Domicilio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td>Cargando....</td>
                    </tr>
                  )}
                  {clientesFinal.length > 0 &&
                    clientesFinal.map((el) => (
                      <tr key={el.idClientes}>
                        <td>{el.CUIT}</td>
                        <td>{el.Nombre}</td>
                        <td>{el.Apellido}</td>
                        <td>{el.Correo}</td>
                        <td>{el.Domiclio}</td>

                        <td>
                          {dataAll?.idClientes === el.idClientes ? (
                            <button
                              className="btn btn-danger"
                              onClick={() => addData(null)}
                            >
                              <i className="fa-solid fa-x"></i>
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary"
                              onClick={() => addData(el)}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
