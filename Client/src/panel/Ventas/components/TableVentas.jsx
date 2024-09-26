import React, { useEffect, useState } from "react";
import { TableVentasRows } from "./TableVentasRows";
import { formatearTotal } from "../../../helpers/formatearTotal";
import { Spiner } from "../../../components/Spiner";
import { useCarrito } from "../../../context/CarritoContext";
import { useProductos } from "../../../context/ProductosContext";
import { useClientes } from "../../../context/ClientesContext";
import { useRegistraciones } from "../../../context/RegistracionesContext";
import { helpHttp } from "../../../helpers/helpHttp";
import { URL } from "../../../helpers/api";
import Swal from "sweetalert2";
import { descargarTiket } from "../../../helpers/DescargarTicket";
import { useNavigate } from 'react-router-dom'

export const TableVentas = ({
  inputProductos,
  handleResetCarrito,
  inputCantidadRef,
  inputCodeBarRef,
  btnConfirmarVenta,
  btnAnularVenta,
  setInputProductos,
  setInputDNI
}) => {
  /*
    0- Sin nada
    1- Cargando
    2- Venta completada
    3- Error
  */
  const [estadoVenta, setEstadoVenta] = useState(0);

  const { carrito, deleteProductoCarrito, sumarTotalCarrito, totalCarrito, resetCarrito } =
    useCarrito();
  const { busquedaProducto } = useProductos();
  const { resetClientesEncontrado } = useClientes();
  const { setRegistraciones, registraciones } =
    useRegistraciones();
  const { post } = helpHttp()

  const navigate = useNavigate()

  useEffect(() => {
    sumarTotalCarrito(carrito);
  }, [carrito, totalCarrito]);

  const handleInputProductos = async (e) => {
    let CodeBar = e.target.value;
    setInputProductos(CodeBar);
    if (CodeBar.trim() === "") {
      setInputProductos("");
    } else {
      const producto = await busquedaProducto(CodeBar);
      if (producto) {
        inputCantidadRef.current.focus();
      }
    }
  };

  const onConfirmarVenta = () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "El carrito esta vacio",
        text: "El carrito tiene que contener productos",
        icon: "warning",
      });
      return;
    }
    let options = {
      body: carrito,
      headers: { "Content-Type": "application/json" },
    };
    setEstadoVenta(1);
    try {
      post(`${URL}/registraciones`, options).then((res) => {
        if (res.message === "Venta registrada") {
          setRegistraciones([...registraciones, res]);
          resetClientesEncontrado("");
          setInputDNI("")
          resetCarrito()
          setEstadoVenta(2);
          Swal.fire({
            title: "Descargar Ticket?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Descargar",
            denyButtonText: `Ver venta`,
          }).then((result) => {
            if (result.isConfirmed) {
              descargarTiket(res.idRegistraciones, res.NFactura);
              Swal.fire("Revise sus descargas!", "", "success");
            } else if (result.isDenied) {
              navigate(`/panel/informes/${res.idRegistraciones}`);
            }
          });
        } else {
          setError(res);
          setEstadoVenta(3);
        }
        setEstadoVenta(0);
      });
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
            <button className="btn btn-primary">
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
                // hidden={estadoVenta === 1 && true}
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
