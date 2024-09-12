import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { CardClientes } from "../components/CardClientes";
import { helpHttp } from "../../../helpers/helpHttp.js";
import { TableVentas } from "../components/TableVentas";
import { CardDetalles } from "../components/CardDetalles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import { descargarTiket } from "../../../helpers/DescargarTicket.js";

export const VentasPage = () => {
  const [dbClientes, setDbClientes] = useState([]);
  const [dbProductos, setDbProductos] = useState([]);
  const [dbRegistraciones, setDbRegistraciones] = useState([]);

  // Clientes
  const [idClientes, setIdClientes] = useState(null);
  const [inputDNI, setInputDNI] = useState("");
  // End Clientes

  // Productos
  const [idProductos, setIdProductos] = useState([]);
  const [CodeBar, setCodeBar] = useState([]);
  const [producto, setProductos] = useState([]);
  const [stock, setStock] = useState([]);
  const [precio, setPrecio] = useState([]);
  const [cantidad, setCantidad] = useState([]);
  const [subTotal, setSubTotal] = useState([]);
  const [inputProductos, setInputProductos] = useState([]);
  // const [idRegistraciones, setIdRegistraciones] = useState(null);
  //  End Productos
  const [carrito, setCarrito] = useState([]);

  const [error, setError] = useState(null);
  const [cliente, setCliente] = useState("");
  const [estadoVenta, setEstadoVenta] = useState(0);

  // Ref
  const btnAgregar = useRef(null);
  const btnAnular = useRef(null);
  const btnConfirmarVenta = useRef(null);
  const btnAnularVenta = useRef(null);
  const inputCodeBarRef = useRef(null);
  const inputCantidadRef = useRef(null);

  const navigate = useNavigate();
  const { get, post } = helpHttp();
  const { usuario } = useAuth();

  const URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    get(`${URL}/cliente`).then((res) => {
      if (!res.error) {
        setDbClientes(res);
        setError(null);
      } else {
        setDbClientes(null);
        setError(res);
      }
    });

    get(`${URL}/productos`).then((res) => {
      if (!res.error) {
        setDbProductos(res);
        setError(null);
      } else {
        setDbProductos(null);
        setError(res);
      }
    });

    get(`${URL}/registraciones`).then((res) => {
      if (!res.error) {
        setDbRegistraciones(res);
        setError(null);
      } else {
        setDbRegistraciones(null);
        setError(res);
      }
    });
  }, [URL]);

  useEffect(() => {
    const handleBtnAgregar = (e) => {
      if (e.key === "F2") {
        e.preventDefault();
        btnAgregar.current.click();
      }
    };

    const handleBtnAnular = (e) => {
      if (e.key === "F3") {
        e.preventDefault();
        btnAnular.current.click();
      }
    };

    const handleBtnConfirmarVenta = (e) => {
      if (e.key === "F4") {
        e.preventDefault();
        btnConfirmarVenta.current.click();
      }
    };

    const handleBtnAnularVenta = (e) => {
      if (e.key === "F5") {
        e.preventDefault();
        btnAnularVenta.current.click();
        inputCodeBarRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleBtnAgregar);
    window.addEventListener("keydown", handleBtnAnular);
    window.addEventListener("keydown", handleBtnConfirmarVenta);
    window.addEventListener("keydown", handleBtnAnularVenta);
    return () => {
      window.removeEventListener("keydown", handleBtnAgregar);
      window.removeEventListener("keydown", handleBtnAnular);
      window.removeEventListener("keydown", handleBtnConfirmarVenta);
      window.removeEventListener("keydown", handleBtnAnularVenta);
    };
  }, []);

  const busquedarClienteDNI = (CUIT) => {
    let busqueda = dbClientes.find((el) => el.CUIT === CUIT);
    let busquedaNoEncontrada = "Consumidor final";
    if (busqueda) {
      const { idClientes, Apellido, Nombre } = busqueda;
      // console.log(idClientes, "BuscarClienteDNI");
      // console.log(busqueda, "Encontrado");
      let resultado = `${Apellido} ${Nombre}`;
      setIdClientes(idClientes);
      return resultado;
    } else {
      console.log(busqueda, "En caso de que no");
      return busquedaNoEncontrada;
    }
  };

  const busquedaProducto = (CodeBar) => {
    let busqueda = dbProductos.find((el) => el.CodeBar === CodeBar);
    return busqueda;
  };

  const handleInputProductos = (e) => {
    let CodeBar = e.target.value;
    setInputProductos(CodeBar);
    if (CodeBar.trim() === "") {
      setProductos("");
      setStock("");
      setPrecio("");
    } else {
      const producto = busquedaProducto(CodeBar);
      if (producto) {
        const { idProductos, CodeBar, Descripcion, Precio, Stock } = producto;
        console.log(producto, "producto encontrado");
        setIdProductos(idProductos);
        setCodeBar(CodeBar);
        setProductos(Descripcion);
        setStock(Stock);
        setPrecio(Precio);
        inputCantidadRef.current.focus();
      } else {
        setProductos("Producto no encontrado");
        setStock("");
        setPrecio("");
      }
    }
  };

  const handleInputCantidad = (e) => {
    const cantidadInput = e.target.value;
    setCantidad(cantidadInput);
    let resultado = cantidadInput * precio;
    setSubTotal(resultado);
  };

  const handlebtnAgregar = () => {
    if (!producto || !precio || !cantidad || cantidad <= 0) {
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
      const newCantidad = existingProduct.cantidad + parseInt(cantidad);
      const newSubTotal = existingProduct.precio * newCantidad;

      if (stock < newCantidad) {
        Swal.fire({
          title: `Stock insuficiente`,
          icon: "warning",
        });
        return;
      }

      updatedCarrito[existingProductIndex] = {
        ...existingProduct,
        cantidad: newCantidad,
        subTotal: newSubTotal,
      };

      setCarrito(updatedCarrito);
    } else {
      if (stock <= 0) {
        Swal.fire({
          title: "No puedes agregar este producto porque su Stock es 0",
          text: "Tenes que reponer este producto",
          icon: "error",
        });
        return;
      } else if (stock <= 10) {
        Swal.fire({
          title: `Alerta stock bajo ${stock}`,
          text: "A partir de las 10 unidades se considera stock crítico",
          icon: "warning",
        });
      }

      if (parseInt(cantidad) > stock) {
        Swal.fire({
          title: "Estas intentando vender una cantidad mayor a tu stock",
          text: `Solo quedan ${stock} unidades en stock`,
          icon: "error",
        });
        return;
      }

      const data = {
        idProductos,
        CodeBar,
        producto,
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad),
        subTotal: parseFloat(subTotal),
      };
      setCarrito([...carrito, data]);
    }

    inputCodeBarRef.current.focus();
    handleResetDetalle();
  };

  const handleEliminarCarrito = (id) => {
    let newData = carrito.filter((el) => el.idProductos !== id);
    setCarrito(newData);
  };

  let totalCarrito = 0;
  const sumarCarrito = (data = []) => {
    if (!data) return;
    for (let i = 0; i < data.length; i++) {
      let { subTotal } = data[i];
      totalCarrito += subTotal;
    }
    return totalCarrito;
  };

  const handleResetDetalle = () => {
    setCliente("");
    setInputDNI("");
    setProductos("");
    setStock("");
    setPrecio("");
    setCantidad("");
    setSubTotal("");
    setInputProductos("");
    inputCodeBarRef.current.focus();
  };

  const handleResetCarrito = () => {
    setCarrito([]);
  };

  const ventaData = carrito.map((item) => ({
    Producto: item.producto,
    PrecioU: item.precio,
    Cantidad: item.cantidad,
    idClientes: idClientes,
    idProductos: item.idProductos,
    idUsuarios: usuario.idUsuarios,
  }));

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
      body: ventaData,
      headers: { "Content-Type": "application/json" },
    };
    setEstadoVenta(1);
    try {
      post(`${URL}/registraciones`, options).then((res) => {
        if (res.message === "Venta registrada") {
          setDbRegistraciones([...dbRegistraciones, res]);
          handleResetCarrito();
          handleResetDetalle();
          setEstadoVenta(2);
          Swal.fire({
            title: "Descargar Ticket?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Descargar",
            denyButtonText: `Ver venta`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              descargarTiket(res.idRegistraciones, res.NFactura);
              Swal.fire("Revise sus descargas!", "", "success");
            } else if (result.isDenied) {
              // Swal.fire("Changes are not saved", "", "info");
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

  sumarCarrito(carrito);

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-8">
            <div className="row mb-2">
              <div className="col-sm-12">
                {/* Clientes */}
                <CardClientes
                  busquedarClienteDNI={busquedarClienteDNI}
                  cliente={cliente}
                  setCliente={setCliente}
                  inputDNI={inputDNI}
                  setInputDNI={setInputDNI}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                {/* Tabla de ventas */}
                <TableVentas
                  carrito={carrito}
                  inputProductos={inputProductos}
                  inputCodeBarRef={inputCodeBarRef}
                  btnConfirmarVenta={btnConfirmarVenta}
                  btnAnularVenta={btnAnularVenta}
                  totalCarrito={totalCarrito}
                  handleInputProductos={handleInputProductos}
                  onConfirmarVenta={onConfirmarVenta}
                  handleResetCarrito={handleResetCarrito}
                  handleEliminarCarrito={handleEliminarCarrito}
                  estadoVenta={estadoVenta}
                />
                {/* End Tabla de ventas */}
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="row mb-2">
              <div className="col-sm-12">
                <CardDetalles
                  producto={producto}
                  stock={stock}
                  precio={precio}
                  cantidad={cantidad}
                  btnAnular={btnAnular}
                  subTotal={subTotal}
                  btnAgregar={btnAgregar}
                  handleInputCantidad={handleInputCantidad}
                  handlebtnAgregar={handlebtnAgregar}
                  handleResetDetalle={handleResetDetalle}
                  inputCantidadRef={inputCantidadRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
