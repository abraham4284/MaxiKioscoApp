import React, { useEffect, useState } from "react";
import { formatearTotal } from "../../../../helpers/formatearTotal";
import { Spiner } from "../../../../components/Spiner";
import { TableRegistraciones } from "../TableRegistraciones";
import { useRegistraciones } from "../../../../context/RegistracionesContext";

export const InformesVentasDiarias = () => {
  const [fecha, setFecha] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [filterVentas, setFilterVentas] = useState([]);
  const [inputFactura, setInputFactura] = useState("");

  const { registraciones, getRegistraciones, loading } = useRegistraciones();

  useEffect(() => {
    getRegistraciones();
  }, []);

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
            {formatearTotal(ventasTotalesPorDia ? ventasTotalesPorDia : 0)}
          </div>
          <div className="alert alert-info" role="alert">
            Ventas por rango:{" "}
            {formatearTotal(
              sumarVentasTotalesPorRango ? sumarVentasTotalesPorRango : 0
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
                    {loading ? (
                      <tr>
                        <td colSpan="3">
                          <Spiner />{" "}
                        </td>
                      </tr>
                    ) : inputFactura === "" ? (
                      mostrarRegistroFiltradoPorRango &&
                      mostrarRegistroFiltradoPorRango.length > 0 &&
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
  );
};
