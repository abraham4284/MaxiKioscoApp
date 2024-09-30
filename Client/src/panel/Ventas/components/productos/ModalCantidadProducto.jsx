import React, { useEffect, useRef, useState } from "react";
import { useCarrito } from "../../../../context/CarritoContext";
import Swal from "sweetalert2";

export const ModalCantidadProducto = ({ dataToEdit }) => {
  const modalRef = useRef(null);
  const [cantidad, setCantidad] = useState("");
  const { updateCantidadProducto } = useCarrito();

  useEffect(() => {
    if (dataToEdit) {
      setCantidad(dataToEdit.Cantidad);
    }
  }, [dataToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateProducto = { ...dataToEdit, Cantidad: cantidad };
    if (parseInt(dataToEdit.Stock) < parseInt(cantidad)) {
      Swal.fire({
        title: `Stock insuficiente`,
        icon: "warning",
      });
      return;
    } else if (cantidad <= 0) {
      Swal.fire({
        title: "Por favor ingrese un producto válido",
        text: "La cantidad tiene que ser mayor a 0",
        icon: "warning",
      });
      return;
    }

    updateCantidadProducto(updateProducto);

    // Cerrar el modal programáticamente
    const modal = new bootstrap.Modal(modalRef.current);
    modal.hide(); // Oculta el modal
  };

  return (
    <div className="container">
      <div
        className="modal fade"
        id="ModalCantidad"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Agregar cantidad
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
                <div className="mb-2">
                  <span>
                    Stcok Actual : {dataToEdit ? dataToEdit.Stock : ""}{" "}
                  </span>
                </div>
                <input
                  type="number"
                  className="form form-control"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
                <div className="d-flex justify-content-end mt-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    {" "}
                    Confirmar{" "}
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
