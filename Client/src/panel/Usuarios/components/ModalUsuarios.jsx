import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const initialForm = {
  Username: "",
  Password: "",
  img:""
};

export const ModalUsuarios = ({ dataToEdit }) => {
  const [form, setForm] = useState(initialForm);

   const { updateUsuarios } = useAuth();

  useEffect(()=>{
    if(dataToEdit){
        setForm(dataToEdit)
    }
  },[dataToEdit])


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e)=>{
     e.preventDefault();
    //  console.log(form)
     updateUsuarios(dataToEdit.idUsuarios, form);
  }

  return (
    <div
      className="modal fade"
      id="exampleModalUsuarios"
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
              Editar mi usuario
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
                  Usuario
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="Username"
                  value={form.Username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label form="exampleInputPassword1" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="Password"
                  value={form.Password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label form="exampleInputPassword1" className="form-label">
                  Img
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="img"
                  value={form.img}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-warning"
                  data-bs-dismiss="modal"
                >
                   <i className="fa-regular fa-pen-to-square"></i> Confirmar
                </button>
                <button
                  type="reset"
                  className="btn btn-danger"
                 
                >
                  <i className="fa-solid fa-xmark"></i> Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
