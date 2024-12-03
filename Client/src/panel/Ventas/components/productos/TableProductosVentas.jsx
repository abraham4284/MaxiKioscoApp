import React from "react";
import Swal from "sweetalert2";
import { useCarrito } from "../../../../context/CarritoContext";

export const TableProductosVentas = ({ data }) => {
  const { agregarCarrito, chekingProductoCarrito, deleteProductoCarrito } =
    useCarrito();

  const agregarCarritoData = (data) => {
    if (!data) return;
    const {
      idProductos,
      CodeBar,
      precioCosto,
      Descripcion,
      Precio,
      Stock,
      tipoProducto,
    } = data;
    let newData = {
      idProductos,
      CodeBar,
      Descripcion,
      precioCosto,
      Precio,
      Stock,
      tipoProducto,
      Cantidad: parseFloat(1),
      SubTotal: parseFloat(Precio),
    };

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

    agregarCarrito(newData);
  };

  return (
    <>
      {data.map((el) => {
        const productoEncontrado = chekingProductoCarrito(el.idProductos);
        return (
          <tr key={el.idProductos}>
            <td> {el.CodeBar} </td>
            <td>
              <img
                src={el.img}
                alt={el.Descripcion}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "1.5rem",
                }}
              />
            </td>
            <td> {el.Descripcion} </td>
            <td> {el.Precio} </td>
            <td> {el.Stock} </td>
            <td>
              {productoEncontrado ? (
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProductoCarrito(el.idProductos)}
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => agregarCarritoData(el)}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
};
