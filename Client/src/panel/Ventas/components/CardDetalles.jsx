import React from "react";

export const CardDetalles = ({
  producto,
  stock,
  precio,
  cantidad,
  handleInputCantidad,
  subTotal,
  handlebtnAgregar,
  handleResetDetalle,
  btnAgregar,
  btnAnular,
  inputCantidadRef
}) => {
  
 

  return (
    <>
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: "#4e73df", color: "white" }}
        >
          Detalle
        </div>
        <div className="card-body">
          <div className="row mb-2">
            <div className="col-sm-12">
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text">Producto:</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sub Total"
                  disabled
                  value={producto}
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-12">
              <div className="input-group input-group-sm">
                <div className="input-group-prepend" >
                  <span className="input-group-text">Stock:</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sub Total"
                  disabled
                  value={stock}
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-12">
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text">Precio:</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  aria-label="IGV"
                  disabled
                  value={precio}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text">Cantidad:</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  aria-label="Total"
                  ref={inputCantidadRef}
                  style={{ maxWidth: "70px" }}
                  value={cantidad}
                  onChange={handleInputCantidad}
                  tabIndex={3}
                />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-12">
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text">Subtotal:</span>
                </div>
                <input
                  type="number"
                  className="form-control"
                  aria-label="Total"
                  disabled
                  value={subTotal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body" style={{ margin: "auto" }}>
              <button
                type="button"
                ref={btnAgregar}
                tabIndex={4}
                className="btn btn-primary btn-block"
                onClick={handlebtnAgregar}
              >
                <i className="fa-solid fa-plus"></i> Agregar
              </button>
              <button
                type="reset"
                ref={btnAnular}
                className="btn btn-danger btn-block ms-3"
                onClick={handleResetDetalle}
              >
                <i className="fa-solid fa-ban"></i> Anular
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
