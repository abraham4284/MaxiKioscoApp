import React, { useState } from "react";
import { useNegocios } from "../context/NegociosContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const initialForm = {
  Nombre: "",
  Rubro: "",
  Descripcion: "",
  img: "",
};

export const FormNegocios = () => {
  const [form, setForm] = useState(initialForm);
  const { createNegocio } = useNegocios();
  const navigate = useNavigate();

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

  const handleReset = () => {
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.Nombre || !form.Rubro || !form.Descripcion || !form.img) {
      Swal.fire({
        title: "Los campos no pueden ir vacios",
        text: "todos los campos son obligatorios",
        icon: "warning",
      });
      return;
    }
    const { success, message } = await createNegocio(form);
    if (success) {
      Swal.fire({
        title: message,
        icon: "success",
      });
      navigate("/panel/ventas");
      handleReset();
    } else {
      Swal.fire({
        title: message,
        icon: "error",
      });
    }

    // console.log(form)
  };

  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col">
            <h1 className="mt-3 text-center">
              <i className="fa-solid fa-code" style={{ color: "#00fca8" }}></i>{" "}
              <b>
                Abraham<b style={{ color: "#00fca8" }}>Tech</b> | Soluciones
                Tecnologicas
              </b>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="title text-center">
              <h2 className="text-center" style={{ color: "black" }}>
                Crear tu negocio
              </h2>
            </div>
            <form
              onSubmit={handleSubmit}
              className="m-auto mt-3 form-negocio border border-1"
            >
              <div className="mb-3">
                <label form="exampleInputEmail1" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el nombre de su negocio"
                  name="Nombre"
                  value={form.Nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label form="exampleInputEmail1" className="form-label">
                  Rubro
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="Rubro"
                  value={form.Rubro}
                  onChange={handleSelectedRubro}
                >
                  <option value="">
                    Seleccione una opcion de modificacion
                  </option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Gastronomia">Gastronomia</option>
                  <option value="Limpieza">Limpieza</option>
                  <option value="MaxiKioscos">MaxiKioscos</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
              <div className="mb-3">
                <label form="exampleInputEmail1" className="form-label">
                  Descripcion
                </label>
                <textarea
                  className="form-control"
                  placeholder="Ingrese a lo que se dedica"
                  name="Descripcion"
                  value={form.Descripcion}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label form="exampleInputEmail1" className="form-label">
                  URL de su logo
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese el nombre de su negocio"
                  name="img"
                  value={form.img}
                  onChange={handleChange}
                />
              </div>
              <div className="cont-btn d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
