import React, { useEffect, useState } from "react";
import { useProveedores } from "../../../context/ProveedoresContext";
import { useProductos } from "../../../context/ProductosContext";
import { formatearTotal } from "../../../helpers";
import { motivosMovimientoStock } from "../../const";
import Swal from "sweetalert2";
import Big from "big.js";

const initialForm = {
  idProductos: null,
  CodeBar: "",
  img: "",
  Descripcion: "",
  precioCosto: "",
  Precio: "",
  Stock: "",
  Familia: "",
  idProveedores: "",
  tipoProducto: "",
  Motivo: "",
};

export const ModalProductos = ({ dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm);

  const { getProveedores, proveedores } = useProveedores();
  const { createProductos, updateProductos } = useProductos();

  useEffect(() => {
    getProveedores();
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
  const handleSelectedTipoProducto = (e) => {
    setForm({
      ...form,
      tipoProducto: e.target.value,
    });
  };

  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.CodeBar ||
      !form.Descripcion ||
      !form.precioCosto ||
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
    const precioCostoBig = new Big(form.precioCosto);
    const precioVentaBig = new Big(form.Precio);

    if (precioCostoBig.gte(precioVentaBig)) {
      return Swal.fire({
        title: "Verifique los datos ingresados",
        text: `El precio de costo ${formatearTotal(
          precioCostoBig.toString()
        )} no pude ser mayor o igual al precio de venta ${formatearTotal(
          precioVentaBig.toString()
        )}`,
        icon: "question",
      });
    }

    if (form.idProductos === null) {
      form.Stock = parseFloat(form.Stock);
      const { success, message } = await createProductos(form);
      setForm(initialForm);
      Swal.fire({
        title: message,
        icon: success ? "success" : "error",
      });
    } else {
      form.Motivo = dataToEdit ? form.Motivo : null;
      if (!form.Motivo) {
        return Swal.fire({
          title: "El motivo es obligatorio",
          icon: "warning",
        });
      }
      const { success, message } = await updateProductos(
        dataToEdit.idProductos,
        form
      );
      Swal.fire({
        title: message,
        icon: success ? "success" : "error",
      });
    }
  };
  return (
    <div
      className="modal fade"
      id="exampleModalProductos"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
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
                  URL IMG <i className="fa-solid fa-barcode"></i>{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese la url de la imagen"
                  name="img"
                  value={form.img}
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
                  Precio Costo{" "}
                  <i className="fa-solid fa-hand-holding-dollar"></i>
                </label>
                <input
                  type="number"
                  className="form-control "
                  placeholder="Ingrese precio"
                  name="precioCosto"
                  value={form.precioCosto}
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
                    {motivosMovimientoStock.map((el) => (
                      <option value={el.value}>{el.label}</option>
                    ))}
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
                  {proveedores.map((pro, index) => (
                    <option key={index} value={pro.idProveedores}>
                      {pro.Nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo de producto */}
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">
                  Tipo de producto <i className="fa-solid fa-user-tie"></i>
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="tipoProducto"
                  value={form.tipoProducto}
                  onChange={handleSelectedTipoProducto}
                >
                  <option value="">Seleccione un tipo de producto</option>
                  <option value="Unidad">Unidad</option>
                  <option value="KG">KG</option>
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
                  onClick={() => handleReset()}
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
