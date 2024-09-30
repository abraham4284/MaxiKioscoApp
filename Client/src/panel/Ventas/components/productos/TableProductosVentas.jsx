import React from "react";
import Swal from 'sweetalert2'
import { useCarrito } from "../../../../context/CarritoContext";

export const TableProductosVentas = ({ data }) => {
  const {
    agregarCarrito,
    chekingProductoCarrito,
    deleteProductoCarrito,
  } = useCarrito();

  const agregarCarritoData = (data) => {
    if (!data) return;
    const { idProductos, CodeBar, Descripcion, Precio, Stock } = data;
    let newData = {
      idProductos,
      CodeBar,
      Descripcion,
      Precio,
      Stock,
      Cantidad: parseFloat(1),
      SubTotal: parseFloat(Precio),
    };

    if (parseInt(Stock) <= 0) {
      Swal.fire({
        title: "No puedes agregar este producto porque su Stock es 0",
        text: "Tenes que reponer este producto",
        icon: "error",
      });
      return;
    } else if (parseInt(Stock) <= 10) {
      Swal.fire({
        title: `Alerta stock bajo ${Stock}`,
        text: "A partir de las 10 unidades se considera stock crítico",
        icon: "warning",
      });
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
