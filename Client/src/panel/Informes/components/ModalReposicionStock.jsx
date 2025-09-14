import React, { useEffect } from "react";
import { useForm } from "../../../hooks";
import { motivosStockSuma, motivosStockRestaOAjuste } from "../../const";
import { ProductoSeleccionado } from "./";
import Big from "big.js";
import Swal from "sweetalert2";

const initialForm = {
  Stock: "",
  newStock: "",
  Motivo: "",
  afectedStock: "",
};

export const ModalReposicionStock = ({
  dataToEdit,
  setDataToEdit,
  updateStockProductos,
  getMovimientos,
}) => {
  const {
    Stock,
    Motivo,
    newStock,
    afectedStock,
    formSate,
    onInputChange,
    onResetForm,
    setFormSate,
  } = useForm(initialForm);

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

  const handleSelectedAfectedStock = (e) => {
    setFormSate({
      ...formSate,
      afectedStock: e.target.value,
    });
  };

  const handleReset = () => {
    onResetForm();
    setDataToEdit(null);
  };

  const stockBig = new Big(Number(Stock) || 0);
  const newStockBig = new Big(Number(newStock) || 0);
  const resultado =
    afectedStock === "suma"
      ? newStockBig.plus(stockBig)
      : stockBig.minus(newStockBig);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Stock || !Motivo) {
      Swal.fire({
        title: "Los campos no se pueden enviar vacios",
        text: "Todos los campos son obligatorios",
        icon: "warning",
      });
      return;
    }

    if (newStockBig.lte(0)) {
      return Swal.fire({
        title: "El nuevo stock debe ser mayor a 0",
        icon: "warning",
      });
    }

    const data = {
      CodeBar: dataToEdit?.CodeBar,
      Descripcion: dataToEdit?.Descripcion,
      Stock: newStockBig.toString(),
      newStock: newStockBig.toString(),
      Motivo,
      afectedStock,
    };
    const { success, message } = await updateStockProductos(
      dataToEdit.idProductos,
      data
    );
    if (success) {
      Swal.fire({
        title: message,
        icon: "success",
      });
      handleReset();
      getMovimientos();
    } else {
      Swal.fire({
        title: message,
        icon: "error  ",
      });
    }
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
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div
            className="modal-header"
            style={{ backgroundColor: "#4e73df", color: "white" }}
          >
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Modificar stock
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleReset}
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <ProductoSeleccionado dataToEdit={dataToEdit} />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example4cg">
                  Entrada
                  <i className="fa-solid fa-share-nodes"></i>
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="Familia"
                  value={afectedStock}
                  onChange={handleSelectedAfectedStock}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="suma">📈Entrada de stock</option>
                  <option value="resta">📉Baja de stock</option>
                </select>
              </div>

              {afectedStock === "suma" && (
                <div className="form-outline mb-4">
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3cg">
                      Nuevo Stock 📈
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Ingrese Stock"
                      name="newStock"
                      min={0}
                      value={newStock || ""}
                      onChange={onInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "+") {
                          e.preventDefault();
                        }
                      }}
                    />
                    {newStockBig.lt(0) && (
                      <div className="form-text text-danger">
                        El nuevo stock debe ser mayor a 0
                      </div>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3cg">
                      Resultado <i className="fa-solid fa-cart-shopping"></i>
                    </label>
                    <div className="alert alert-info" role="alert">
                      {resultado.toString()}
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example4cg">
                      Motivo de ingreso de stock 📈
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="Familia"
                      value={Motivo}
                      onChange={handleSelectedMotivo}
                    >
                      <option value="">Seleccione una opción</option>
                      {motivosStockSuma.map((el, index) => (
                        <option key={index} value={el.value}>
                          {el.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {afectedStock === "resta" && (
                <div className="form-outline mb-4">
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3cg">
                      Baja de stock 📉
                    </label>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Ingrese Stock"
                      name="newStock"
                      min={0}
                      value={newStock || ""}
                      onChange={onInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e" || e.key === "+") {
                          e.preventDefault();
                        }
                      }}
                    />
                    {newStockBig.lt(0) && (
                      <div className="form-text text-danger">
                        El stock de baja debe ser mayor a 0
                      </div>
                    )}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3cg">
                      Resultado <i className="fa-solid fa-cart-shopping"></i>
                    </label>
                    <div className="alert alert-info" role="alert">
                      {resultado.toString()}
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example4cg">
                      Motivo de baja de stock
                      <i className="fa-solid fa-share-nodes"></i>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="Familia"
                      value={Motivo}
                      onChange={handleSelectedMotivo}
                    >
                      <option value="">Seleccione una opcion</option>
                      {motivosStockRestaOAjuste.map((el, index) => (
                        <option key={index} value={el.value}>
                          {el.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
