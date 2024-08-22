import React, { useEffect, useState } from "react";
import { useNegocios } from "../../../context/NegociosContext";


const initialForm = {
  Nombre: "",
  Rubro: "",
  Descripcion: "",
  img: "",
};

export const ModalNegocios = ({ dataToEdit }) => {
  const [form, setForm] = useState(initialForm);

  const { updateNegocios } = useNegocios();



  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectedRubro = (e) => {
    setForm({
      ...form,
      Rubro: e.target.value,
    });
  };


  useEffect(()=>{
    if(dataToEdit){
        setForm(dataToEdit)
    }
  },[dataToEdit])




 const handleSubmit = (e)=>{
     e.preventDefault();
     updateNegocios(form)
 }



  return (
    <div
      className="modal fade"
      id="exampleModalNegocios"
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
              Editar negocio
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
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="Nombre"
                  value={form.Nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label form="exampleInputPassword1" className="form-label">
                  Rubro
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="Rubro"
                  value={form.Rubro}
                  onChange={handleSelectedRubro}
                >
                  <option value="">Seleccione una Familia</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Comida">Comida</option>
                  <option value="Lacteos">Lacteos</option>
                  <option value="MaxiKiosco">MaxiKiosco</option>
                  <option value="Productos">Productos</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
              <div className="mb-3">
                <label form="exampleInputPassword1" className="form-label">
                  Descripcion
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese contraseña"
                  name="Descripcion"
                  value={form.Descripcion}
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
                  placeholder="Ingrese contraseña"
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
                  <span>
                    {" "}
                    <i className="fa-regular fa-pen-to-square"></i> Confirmar
                  </span>
                </button>
                <button type="reset" className="btn btn-danger">
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
