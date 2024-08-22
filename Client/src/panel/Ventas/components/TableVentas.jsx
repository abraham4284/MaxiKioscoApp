import React from "react";
import { TableVentasRows } from "./TableVentasRows";
import { formatearTotal } from "../../../helpers/formatearTotal";
import { Spiner } from "../../../components/Spiner";

export const TableVentas = ({
  carrito,
  inputProductos,
  handleInputProductos,
  onConfirmarVenta,
  handleResetCarrito,
  inputCodeBarRef,
  totalCarrito,
  btnConfirmarVenta,
  btnAnularVenta,
  handleEliminarCarrito,
  estadoVenta,
}) => {
  /*
    0- Sin nada
    1- Cargando
    2- Venta completada
    3- Error
  */

  if (estadoVenta === 0) {
    false;
  } else if (estadoVenta === 1) {
    true;
  } else if (estadoVenta === 2) {
    false;
  } else {
    false;
  }

  return (
    <div className="card">
      <div
        className="card-header"
        style={{ backgroundColor: "#4e73df", color: "white" }}
      >
        Productos
      </div>

      <div className="card-body">
        <div className="row mb-2">
          <div className="col-sm-12">
            <input
              type="text"
              className="form-control form-control-sm"
              id="nombre"
              placeholder="Ingrese codigo de barras"
              value={inputProductos}
              onChange={handleInputProductos}
              ref={inputCodeBarRef}
              tabIndex={2}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">CodeBar</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">SubTotal</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {carrito.length > 0 ? (
                  carrito.map((datos, index) => (
                    <TableVentasRows
                      key={index}
                      carrito={datos}
                      handleEliminarCarrito={handleEliminarCarrito}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No hay datos</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="cont d-flex justify-content-end align-items-center">
          <div className="me-5">
            <span className="bg-success bg-gradient text-white border border-3 border-success">
              Total: {totalCarrito ? formatearTotal(totalCarrito) : "$ 0"}
            </span>
          </div>
          <div>
            <button
              type="button"
              ref={btnConfirmarVenta}
              className="btn btn-success btn-block"
              onClick={onConfirmarVenta}
              disabled={estadoVenta}
            >
              <i
                className="fa-solid fa-check"
                hidden={estadoVenta === 1 && true}
              ></i>{" "}
              {estadoVenta === 1 ? <Spiner /> : "Confirmar"}
            </button>
            <button
              type="button"
              ref={btnAnularVenta}
              className="btn btn-danger btn-block ms-3"
              onClick={handleResetCarrito}
              disabled={estadoVenta}
            >
              <i className="fa-solid fa-xmark"></i> Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
