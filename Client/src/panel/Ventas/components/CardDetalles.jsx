import React, { useState } from "react";
import { useCarrito } from "../../../context/CarritoContext";
import Swal from "sweetalert2";
import { useClientes } from "../../../context/ClientesContext";
import { useProductos } from "../../../context/ProductosContext";

export const CardDetalles = ({
  productoEncontrado,
  inputCantidadRef,
  inputCodeBarRef,
  btnAgregar,
  btnAnular,
  setInputProductos,
}) => {
  const {
    idProductos,
    CodeBar,
    Descripcion = "",
    Stock = "",
    Precio = "",
    precioCosto = "",
    tipoProducto = "",
  } = productoEncontrado || {};
  const { carrito, agregarCarrito, setCarrito } = useCarrito();
  const { resetProductoEncontrado } = useProductos();
  const { clienteEncontrado } = useClientes();
  const [cantidad, setCantidad] = useState([]);
  const [subTotal, setSubTotal] = useState([]);

  const handleInputCantidad = (e) => {
    const cantidadInput = e.target.value;
    setCantidad(cantidadInput);
    let resultado = cantidadInput * Precio;
    setSubTotal(resultado);
  };

  const handleResetDetalle = () => {
    resetProductoEncontrado();
    setCantidad("");
    setSubTotal("");
    setInputProductos("");

    // inputCodeBarRef.current.focus();
  };

  const handlebtnAgregar = () => {
    if (!Descripcion || !Precio || !cantidad || cantidad <= 0) {
      Swal.fire({
        title: "Por favor ingrese un producto válido",
        text: "La cantidad tiene que ser mayor a 0",
        icon: "warning",
      });
      return;
    }

    const existingProductIndex = carrito.findIndex(
      (item) => item.CodeBar === CodeBar
    );

    if (existingProductIndex !== -1) {
      const updatedCarrito = [...carrito];
      const existingProduct = updatedCarrito[existingProductIndex];
      const newCantidad = existingProduct.Cantidad + parseInt(cantidad);
      const newSubTotal = existingProduct.Precio * newCantidad;

      if (Stock < newCantidad) {
        Swal.fire({
          title: `Stock insuficiente`,
          icon: "warning",
        });
        return;
      }

      updatedCarrito[existingProductIndex] = {
        ...existingProduct,
        Cantidad: parseFloat(newCantidad),
        SubTotal: newSubTotal,
      };

      setCarrito(updatedCarrito);
    } else {
      if (Stock <= 0) {
        Swal.fire({
          title: "No puedes agregar este producto porque su Stock es 0",
          text: "Tenes que reponer este producto",
          icon: "error",
        });
        return;
      } else if (tipoProducto === "Unidad") {
        if (Stock <= 10) {
          Swal.fire({
            title: `Alerta stock bajo ${Stock}`,
            text: "A partir de las 10 unidades se considera stock crítico",
            icon: "warning",
          });
        }
      } else if (tipoProducto === "KG") {
        if (Stock <= 2) {
          Swal.fire({
            title: `Alerta stock bajo ${Stock}`,
            text: "A partir de las 2 KG se considera stock crítico",
            icon: "warning",
          });
        }
      }

      if (parseInt(cantidad) > Stock) {
        Swal.fire({
          title: "Estas intentando vender una cantidad mayor a tu stock",
          text: `Solo quedan ${Stock} unidades en stock`,
          icon: "error",
        });
        return;
      }

      const data = {
        idProductos,
        idClientes: clienteEncontrado.idClientes,
        CodeBar,
        Descripcion,
        Stock,
        precioCosto: parseFloat(precioCosto),
        Precio: parseFloat(Precio),
        Cantidad: parseFloat(cantidad),
        SubTotal: parseFloat(subTotal),
      };
      agregarCarrito(data);
    }

    handleResetDetalle();
  };

  // console.log(carrito,'Soy el carrito CardDetalles')

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
                  value={Descripcion}
                />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-12">
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text">Stock:</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sub Total"
                  disabled
                  value={Stock}
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
                  value={Precio}
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
