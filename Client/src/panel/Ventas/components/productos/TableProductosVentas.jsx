import React from "react";
import Swal from "sweetalert2";
import { useCarrito } from "../../../../context/CarritoContext";

export const TableProductosVentas = ({
  data,
  inputSearch,
  handleInputSearch,
  inputBuscarProducto,
  cantidades,
  setCantidades,
}) => {
  const { agregarCarrito, chekingProductoCarrito, deleteProductoCarrito } =
    useCarrito();

  const handleCantidadChange = (id, value) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const agregarCarritoData = (producto) => {
    const {
      idProductos,
      CodeBar,
      precioCosto,
      Descripcion,
      Precio,
      Stock,
      tipoProducto,
    } = producto;

    const cantidad = parseFloat(cantidades[idProductos] || 1);
    const SubTotal = parseFloat((Precio * cantidad).toFixed(2));

    if (Stock <= 0) {
      return Swal.fire({
        title: "No puedes agregar este producto porque su Stock es 0",
        text: "Tenes que reponer este producto",
        icon: "error",
      });
    }

    if (tipoProducto === "Unidad" && Stock <= 10) {
      Swal.fire({
        title: `Alerta stock bajo ${Stock}`,
        text: "A partir de las 10 unidades se considera stock crítico",
        icon: "warning",
      });
    }

    if (tipoProducto === "KG" && Stock <= 2) {
      Swal.fire({
        title: `Alerta stock bajo ${Stock}`,
        text: "A partir de las 2 KG se considera stock crítico",
        icon: "warning",
      });
    }

    if (parseInt(Stock) < parseInt(cantidad)) {
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

    const newData = {
      idProductos,
      CodeBar,
      Descripcion,
      precioCosto,
      Precio,
      Stock,
      tipoProducto,
      Cantidad: cantidad,
      SubTotal,
    };

    agregarCarrito(newData);
  };

  return (
    <div className="modal-body">
      <input
        type="text"
        className="form form-control"
        placeholder="Buscar por nombre o CodeBar"
        value={inputSearch}
        onChange={handleInputSearch}
        ref={inputBuscarProducto}
      />
      <table className="table mt-4">
        <thead>
          <tr>
            <th>CodeBar</th>
            <th>Img</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => {
            const productoEncontrado = chekingProductoCarrito(el.idProductos);
            return (
              <tr key={el.idProductos}>
                <td>{el.CodeBar}</td>
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
                <td>{el.Descripcion}</td>
                <td>{el.Precio}</td>
                <td>{el.Stock}</td>
                <td>
                  <input
                    type="number"
                    value={cantidades[el.idProductos] || ""}
                    className="form-control form-control-sm"
                    style={{ width: "80px" }}
                    onChange={(e) =>
                      handleCantidadChange(el.idProductos, e.target.value)
                    }
                  />
                </td>
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
        </tbody>
      </table>
    </div>
  );
};
