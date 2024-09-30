import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { TableVentasRows } from "./TableVentasRows";
import { formatearTotal } from "../../../helpers/formatearTotal";
import { Spiner } from "../../../components/Spiner";
import { useCarrito } from "../../../context/CarritoContext";
import { useProductos } from "../../../context/ProductosContext";
import { useClientes } from "../../../context/ClientesContext";
import { useRegistraciones } from "../../../context/RegistracionesContext";
import { descargarTiket } from "../../../helpers/DescargarTicket";
import { useNavigate } from "react-router-dom";
import { createRegistracionesRequest } from "../../../api/registraciones/registraciones.api";

export const TableVentas = ({
  inputProductos,
  inputCantidadRef,
  inputCodeBarRef,
  btnConfirmarVenta,
  btnAnularVenta,
  btnBuscarProducto,
  setInputProductos,
  setInputDNI,
  setDataToEdit,
}) => {
  /*
    0- Sin nada
    1- Cargando
    2- Venta completada
    3- Error
  */
  const [estadoVenta, setEstadoVenta] = useState(0);

  const {
    carrito,
    deleteProductoCarrito,
    sumarTotalCarrito,
    totalCarrito,
    resetCarrito,
  } = useCarrito();
  const { busquedaProducto, productoEncontrado } = useProductos();
  const { resetClientesEncontrado } = useClientes();
  const { setRegistraciones, registraciones, setLoading } = useRegistraciones();

  const navigate = useNavigate();

  const resetCarritoClientes = () => {
    resetCarrito();
    resetClientesEncontrado();
    setInputDNI("");
  };

  useEffect(() => {
    sumarTotalCarrito(carrito);
  }, [carrito, totalCarrito]);

  useEffect(() => {
    if (productoEncontrado) {
      inputCantidadRef.current.focus();
    }
  }, [productoEncontrado]);

  useEffect(() => {
    if (carrito.length > 0) {
      inputCodeBarRef.current.focus();
    }
  }, [carrito]);

  const handleInputProductos = async (e) => {
    let CodeBar = e.target.value;
    setInputProductos(CodeBar);
    if (CodeBar.trim() === "") {
      setInputProductos("");
    } else {
      await busquedaProducto(CodeBar);
    }
  };

  const onConfirmarVenta = async () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "El carrito esta vacio",
        text: "El carrito tiene que contener productos",
        icon: "warning",
      });
      return;
    }
    setEstadoVenta(1);
    try {
      const { data } = await createRegistracionesRequest(carrito);
      if (data.message === "Venta registrada") {
        setRegistraciones([...registraciones, data]);
        setLoading(false);
        resetClientesEncontrado();
        setInputDNI("");
        resetCarrito();
        setEstadoVenta(2);
        Swal.fire({
          title: "Descargar Ticket?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Descargar",
          denyButtonText: `Ver venta`,
        }).then((result) => {
          if (result.isConfirmed) {
            descargarTiket(data.idRegistraciones, data.NFactura);
            Swal.fire("Revise sus descargas!", "", "success");
          } else if (result.isDenied) {
            navigate(`/panel/informes/${data.idRegistraciones}`);
          }
        });
      } else {
        setEstadoVenta(3);
      }

      setEstadoVenta(0);
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="col-sm-8">
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
          <div className="col-4">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#ModalSearchProductos"
              ref={btnBuscarProducto}
            >
              {" "}
              <i className="fa-solid fa-magnifying-glass"></i> Buscar
            </button>
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
                      handleEliminarCarrito={deleteProductoCarrito}
                      setDataToEdit={setDataToEdit}
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
              onClick={resetCarritoClientes}
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
