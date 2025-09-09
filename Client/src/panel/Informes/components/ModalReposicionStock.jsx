import React, { useEffect } from "react";
import { useForm } from "../../../hooks";
import Swal from "sweetalert2";

const initialForm = {
  Stock: "",
  Motivo: "",
};

export const ModalReposicionStock = ({
  dataToEdit,
  setDataToEdit,
  updateStockProductos,
}) => {
  const { Stock, Motivo, formSate, onInputChange, onResetForm, setFormSate } =
    useForm(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setFormSate(dataToEdit);
    }
  }, [dataToEdit]);

  const handleSelectedMotivo = (e) => {
    setFormSate({
      ...formSate,
      Motivo: e.target.value,
    });
  };

  const handleReset = () => {
    onResetForm();
    setDataToEdit(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Stock && !Motivo) {
      Swal.fire({
        title: "Los campos no se pueden enviar vacios",
        text: "Todos los campos son obligatorios",
        icon: "warning",
      });
      return;
    }

    const data = {
      CodeBar: dataToEdit?.CodeBar,
      Descripcion: dataToEdit?.Descripcion,
      Stock,
      Motivo,
    };
    const { success, message } = await updateStockProductos(
      dataToEdit.idProductos,
      data
    );

    Swal.fire({
      title: message,
      icon: success ? "success" : "error",
    });
  };
  return (
    <div
      className="modal fade"
      id="modalModificarCantidadProducto"
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
              Modificar cantidad
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
                  Stock <i className="fa-solid fa-cart-shopping"></i>
                </label>
                <input
                  type="number"
                  className="form-control "
                  placeholder="Ingrese Stock"
                  name="Stock"
                  value={Stock}
                  onChange={onInputChange}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">
                  Motivo de modificacion
                  <i className="fa-solid fa-share-nodes"></i>
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="Familia"
                  value={Motivo}
                  onChange={handleSelectedMotivo}
                >
                  <option value="">
                    Seleccione una opcion de modificacion
                  </option>
                  <option value="+/-Cambio de precio">
                    +/-Cambio de precio
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
