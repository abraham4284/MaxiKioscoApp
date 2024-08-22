import React, { useEffect, useState } from "react";
import { helpHttp } from "../../../helpers/helpHttp";

const initialForm = {
  idProductos: null,
  CodeBar: "",
  Descripcion: "",
  Precio: "",
  Stock: "",
  Familia: "",
  idProveedores: "",
  Motivo: "",
};

export const ModalProductos = ({
  dataToEdit,
  createData,
  updateData,
  setDataToEdit,
}) => {
  const [form, setForm] = useState(initialForm);
  const [dbProveedores, setDbProveedores] = useState([]);
  const [error, setError] = useState(null);
  let { get } = helpHttp();

  const URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    get(`${URL}/proveedores`).then((res) => {
      if (!res.error) {
        setDbProveedores(res);
        console.log(res);
        setError(null);
      } else {
        setDbProveedores(null);
        setError(res);
      }
    });
  }, []);


  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);




  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectedFamiliaChange = (e) => {
    setForm({
      ...form,
      Familia: e.target.value,
    });
  };

  const handleSelectedIdProveedores = (e) => {
    setForm({
      ...form,
      idProveedores: e.target.value,
    });
  };

  const handleSelectedMotivo = (e) => {
    setForm({
      ...form,
      Motivo: e.target.value,
    });
  };

  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.CodeBar ||
      !form.Descripcion ||
      !form.Precio ||
      !form.Stock ||
      !form.Familia ||
      !form.idProveedores
    ) {
      Swal.fire({
        title: "Los campos no se pueden enviar vacios",
        text: "Todos los campos son obligatorios",
        icon: "warning",
      });
      return;
    }
    if (form.idProductos === null) {
      createData(form);
      setForm(initialForm)
    } else {
      form.Motivo = dataToEdit ? form.Motivo : null;
      updateData(form);
    }
  };
  return (
    <div
      className="modal fade"
      id="exampleModalProductos"
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
              {dataToEdit ? "Editar producto" : "Alta producto"}
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
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Codigo de barras <i className="fa-solid fa-barcode"></i>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese codigo de barras"
                  name="CodeBar"
                  value={form.CodeBar}
                  onChange={handleChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Nombre del producto{" "}
                  <i className="fa-solid fa-cash-register"></i>
                </label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Ingrese nombre del producto"
                  name="Descripcion"
                  value={form.Descripcion}
                  onChange={handleChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Precio <i className="fa-solid fa-hand-holding-dollar"></i>
                </label>
                <input
                  type="number"
                  className="form-control "
                  placeholder="Ingrese precio"
                  name="Precio"
                  value={form.Precio}
                  onChange={handleChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3cg">
                  Stock <i className="fa-solid fa-cart-shopping"></i>
                </label>
                <input
                  type="number"
                  className="form-control "
                  placeholder="Ingrese Stock"
                  name="Stock"
                  value={form.Stock}
                  onChange={handleChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">
                  {dataToEdit ? "Motivo de modificacion" : "Familia"}{" "}
                  <i className="fa-solid fa-share-nodes"></i>
                </label>
                {dataToEdit ? (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="Familia"
                    value={form.Motivo}
                    onChange={handleSelectedMotivo}
                  >
                    <option value="">
                      Seleccione una opcion de modificacion
                    </option>
                    <option value="+Compra de Mercaderia">
                      +Compra de Mercaderia
                    </option>
                    <option value="-Venta no Registrada<">
                      -Venta no Registrada
                    </option>
                    <option value="+/-Ajuste Manual de Stock">
                      +/-Ajuste Manual de Stock
                    </option>
                    <option value="+Reposicion de Proveedor">
                      +Reposicion de Proveedor
                    </option>
                    <option value="-Devolucion a Proveedor">
                      -Devolucion a Proveedor
                    </option>
                    <option value="+Devolucion de Cliente">
                      +Devolucion de Cliente
                    </option>
                    <option value="-Reposicion a Cliente">
                      -Reposicion a Cliente
                    </option>
                    <option value="-Rotura/Daño/Vencimiento">
                      -Rotura/Daño/Vencimiento
                    </option>
                  </select>
                ) : (
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="Familia"
                    value={form.Familia}
                    onChange={handleSelectedFamiliaChange}
                  >
                    <option value="">Seleccione una Familia</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Comida">Comida</option>
                    <option value="Limpieza">Limpieza</option>
                  </select>
                )}
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">
                  Proveedor <i className="fa-solid fa-user-tie"></i>
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="idProveedores"
                  value={form.idProveedores}
                  onChange={handleSelectedIdProveedores}
                >
                  <option value="">Seleccione un proveedor</option>
                  {dbProveedores.map((pro, index) => (
                    <option key={index} value={pro.idProveedores}>
                      {pro.Nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className={dataToEdit ? "btn btn-warning" : "btn btn-success"}
                  data-bs-dismiss="modal"
                >
                  {dataToEdit ? (
                    <span>
                      {" "}
                      <i className="fa-regular fa-pen-to-square"></i> Confirmar
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
                  onClick={()=> handleReset()}
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
  );
};
