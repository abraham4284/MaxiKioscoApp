import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import swat from "sweetalert2";

const initialFrom = {
  idClientes: null,
  CUIT: "",
  Nombre: "",
  Apellido: "",
  Correo: "",
  Domicilio: "",
};

export const CardClientesComponents = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
  handleInput,
}) => {
  const [form, setForm] = useState(initialFrom);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialFrom);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.CUIT || !form.Nombre || !form.Apellido || !form.Correo || !form.Domicilio){
      Swal.fire({
        title:"Los campos no se pueden enviar vacios",
        text:"Todos los campos son obligatorios",
        icon:"warning"
      })
      return;
    }
    if (form.idClientes === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialFrom);
    setDataToEdit(null);
  };

  return (
    <div className="row mt-5">
      <div className="col-sm-12">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div
                className="card-header"
                style={{ backgroundColor: "#4e73df", color: "white" }}
              >
                Clientes
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-10">
                    <div className="form-group">
                      <label form="nro_documento">Buscar clientes</label>
                      <input
                        type="text"
                        className="form-control form-control-xl"
                        placeholder="Ingrese nombre de un cliente"
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                  <div className="col-sm-2 mt-4">
                    <div className="form-group">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={handleReset}
                      >
                        <i className="fas-solid fa fa-plus "></i> Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Modal */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: "#4e73df", color: "white" }}
            >
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {dataToEdit ? "Editar cliente" : "Alta clientes"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label form="exampleInputEmail1" className="form-label">
                    CUIT
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="CUIT"
                    onChange={handleChange}
                    value={form.CUIT}
                  />
                </div>
                <div className="mb-3">
                  <label form="exampleInputPassword1" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Nombre"
                    onChange={handleChange}
                    value={form.Nombre}
                  />
                </div>
                <div className="mb-3">
                  <label form="exampleInputPassword1" className="form-label">
                    Apellido
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Apellido"
                    onChange={handleChange}
                    value={form.Apellido}
                  />
                </div>
                <div className="mb-3">
                  <label form="exampleInputPassword1" className="form-label">
                    Correo
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="Correo"
                    onChange={handleChange}
                    value={form.Correo}
                  />
                </div>
                <div className="mb-3">
                  <label form="exampleInputPassword1" className="form-label">
                    Domicilio
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Domicilio"
                    onChange={handleChange}
                    value={form.Domicilio}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className={
                      dataToEdit ? "btn btn-warning" : "btn btn-success"
                    }
                    data-bs-dismiss="modal"
                  >
                    {dataToEdit ? (
                      <span>
                        {" "}
                        <i className="fa-regular fa-pen-to-square"></i>{" "}
                        Confirmar
                      </span>
                    ) : (
                      <span>
                        {" "}
                        <i className="fa-solid fa-plus"></i> Crear
                      </span>
                    )}
                  </button>
                  <button
                    type="reset"
                    className="btn btn-danger"
                    onClick={handleReset}
                  >
                    {" "}
                    <i className="fa-solid fa-xmark"></i> Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
