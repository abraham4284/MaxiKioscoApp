import React, { useEffect, useState } from "react";
import { Navbar } from "../../../components/Navbar";
import { helpHttp } from "../../../helpers/helpHttp";
import { TableProductosRegistros } from "../components/TableProductosRegistros";
import { TableMovientosStockRegistros } from "../components/TableMovientosStockRegistros";
import { TableRegistraciones } from "../components/TableRegistraciones";
import "../styles/styles.css";
import { formatearTotal } from "../../../helpers/formatearTotal";
import { ModalProductos } from "../../Stock/components/ModalProductos";
import { useProductos } from "../../../context/ProductosContext";
import { Spiner } from "../../../components/Spiner";

export const ListarInformesPages = () => {
  const [db, setDb] = useState([]);
  // const [productos, setProductos] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [registraciones, setRegistraciones] = useState([]);
  const [fecha, setFecha] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [filterVentas, setFilterVentas] = useState([]);
  const [inputFactura, setInputFactura] = useState("");
  const [dataToEdit, setDataToEdit] = useState(null);
  const [stockCri, setStockCri] = useState("10");
  const [error, setError] = useState(null);
  const [loadingMovimientos, setLoadingMovimientos] = useState(true);
  const [loadingRegistraciones, setLoadingRegistraciones] = useState(true);
  const { get } = helpHttp();
  const { productos, getProductos, updateProductos } = useProductos();

  const URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    get(`${URL}/registraciones`).then((res) => {
      if (!res.error) {
        setDb(res);
        setRegistraciones(res);
        setError(null);
        setLoadingRegistraciones(false);
      } else {
        setDb(null);
        setError(res);
        setLoadingRegistraciones(false);
      }
    });

    getProductos();

    get(`${URL}/movimientos`).then((res) => {
      if (!res.error) {
        setMovimientos(res);
        setError(null);
        setLoadingMovimientos(false);
      } else {
        setMovimientos(null);
        setError(res);
        setLoadingMovimientos(false);
      }
    });
  }, []);

  const handleChangeStockCritico = (e) => {
    setStockCri(e.target.value);
  };

  //   const filterStockCritico = productos.filter((datos) => datos.Stock < stockCri);
  const filterStockCritico = productos.filter((datos) => {
    const stockValue = parseInt(stockCri, 10);
    if (isNaN(stockValue)) return true;
    return datos.Stock < stockValue;
  });

  let ventasTotales = 0;
  const sumarVentasTotales = (data = []) => {
    if (!data) return;
    for (let i = 0; i < data.length; i++) {
      let { Total } = data[i];
      ventasTotales += Number(Total);
    }
    return ventasTotales;
  };

  //Filtrar ventas por Fecha

  let ventasTotalesPorDia = 0;
  const sumarVentasPorDia = (data = [], fecha) => {
    for (let i = 0; i < data.length; i++) {
      const { Fecha, Total } = data[i];
      if (Fecha === fecha) {
        ventasTotalesPorDia += Number(Total);
      }
    }
    return ventasTotalesPorDia;
  };

  const filtrarFechasPorRango = (data = [], fechaInicio, fechaFin) => {
    if (!fechaInicio || !fechaFin) {
      return data;
    }

    let ventaFiltrada = data.filter((ventas) => {
      const fechaVenta = ventas.Fecha;
      return fechaVenta >= fechaInicio && fechaVenta <= fechaFin;
    });
    return ventaFiltrada;
  };

  let sumarVentasTotalesPorRango = 0;
  const sumarVentasTotalesPorRangoFechas = (
    data = [],
    fechaInicio,
    fechaFin
  ) => {
    if (!fechaInicio || !fechaFin) {
      return;
    }
    const filtrarVentasPorRangoFechas = data.filter((ventas) => {
      const fechaVenta = ventas.Fecha;
      return fechaVenta >= fechaInicio && fechaVenta <= fechaFin;
    });

    filtrarVentasPorRangoFechas.forEach((ventas) => {
      sumarVentasTotalesPorRango += Number(ventas.Total);
    });

    return sumarVentasTotalesPorRango;
  };

  const onClickResetFechas = () => {
    setFecha("");
    setFechaFin("");
  };

  const mostrarRegistroFiltradoPorRango = filtrarFechasPorRango(
    registraciones,
    fecha,
    fechaFin
  );

  const handleFilterVentasByFactura = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    setInputFactura(searchInput);
    if (searchInput === "") {
      setFilterVentas(registraciones);
    }

    const filterFacturaVentas = registraciones.filter((el) => {
      return (
        el.NFactura.toLocaleLowerCase().includes(searchInput) ||
        el.Fecha.toLocaleLowerCase().includes(searchInput)
      );
    });
    setFilterVentas(filterFacturaVentas);
  };

  sumarVentasTotales(registraciones);
  sumarVentasPorDia(registraciones, fecha);
  sumarVentasTotalesPorRangoFechas(registraciones, fecha, fechaFin);

  return (
    <>
      <section className="container-fluid">
        <div className="container">
          <div className="row mt-5">
            <div className="col-sm-12">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#4e73df", color: "white" }}
                >
                  Informe de Stock Critico
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    style={{
                      maxWidth: "60px",
                      display: "initial",
                      marginLeft: "15px",
                    }}
                    value={stockCri}
                    onChange={handleChangeStockCritico}
                  />
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="table-responsive">
                        <table className="table ">
                          <thead>
                            <tr>
                              <th>CodeBar</th>
                              <th>Descripcion</th>
                              <th>Precio</th>
                              <th>Stock</th>
                              <th>Familia</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="table-group-divider">
                            {stockCri.length > 0 ? (
                              filterStockCritico.length > 0 ? (
                                filterStockCritico.map((datos) => (
                                  <TableProductosRegistros
                                    key={datos.idProductos}
                                    data={datos}
                                    setDataToEdit={setDataToEdit}
                                  />
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="3">No hay stock critico</td>
                                </tr>
                              )
                            ) : (
                              <tr>
                                <td colSpan="3">Ingrese un valor</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-12 mt-3">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#4e73df", color: "white" }}
                >
                  Movimientos de Stock
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Fecha</th>
                              <th>CodeBar</th>
                              <th>Descripcion</th>
                              <th>Motivo</th>
                              <th>Cantidad</th>
                              <th>idProductos</th>
                            </tr>
                          </thead>
                          <tbody className="table-group-divider">
                            {loadingMovimientos ? (
                              <tr>
                                <td colSpan="3">
                                  {" "}
                                  <Spiner />{" "}
                                </td>
                              </tr>
                            ) : movimientos.length > 0 ? (
                              movimientos.map((datos) => (
                                <TableMovientosStockRegistros
                                  key={datos.idMovimientoStock}
                                  data={datos}
                                />
                              ))
                            ) : (
                              <tr>
                                <td colSpan="3"> No hay datos</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-12 mt-3">
              <div className="card">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#4e73df", color: "white" }}
                >
                  Informe de ventas diarias
                </div>

                <div className="card-header">
                  <p className="mt-2">
                    Total de ventas :{" "}
                    <span className="bg-success bg-gradient text-white border border-3 border-success">
                      {formatearTotal(ventasTotales)}
                    </span>
                  </p>
                </div>
                <div
                  className="card-header "
                  style={{ backgroundColor: "#4e73df", color: "white" }}
                >
                  Filtrar por fechas de ventas
                </div>
                <div className="cont d-flex justify-content-center align-items-baseline mt-4 gap-3 ">
                  <p>Seleccione fechas</p>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                  <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-danger"
                    onClick={onClickResetFechas}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <div className="alert alert-primary" role="alert">
                    Ventas por dia:{" "}
                    {formatearTotal(
                      ventasTotalesPorDia ? ventasTotalesPorDia : 0
                    )}
                  </div>
                  <div className="alert alert-info" role="alert">
                    Ventas por rango:{" "}
                    {formatearTotal(
                      sumarVentasTotalesPorRango
                        ? sumarVentasTotalesPorRango
                        : 0
                    )}
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    Buscar venta
                    <input
                      type="text"
                      className="form form-control mt-2"
                      placeholder="Buscar por numero de factura"
                      value={inputFactura}
                      onChange={handleFilterVentasByFactura}
                    />
                  </div>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>NFactura</th>
                              <th>Fecha</th>
                              <th>Total</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="table-group-divider">
                            {loadingRegistraciones ? (
                              <tr>
                                <td colSpan="3">
                                  <Spiner />{" "}
                                </td>
                              </tr>
                            ) : inputFactura === "" ? (
                              mostrarRegistroFiltradoPorRango.map((datos) => (
                                <TableRegistraciones
                                  key={datos.idRegistraciones}
                                  data={datos}
                                />
                              ))
                            ) : (
                              filterVentas.map((datos) => (
                                <TableRegistraciones
                                  key={datos.idRegistraciones}
                                  data={datos}
                                />
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalProductos dataToEdit={dataToEdit} updateData={updateProductos} />
      </section>
    </>
  );
};
