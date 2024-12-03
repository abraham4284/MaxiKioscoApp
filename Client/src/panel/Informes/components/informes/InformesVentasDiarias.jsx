import React, { useEffect, useState } from "react";
import { formatearTotal } from "../../../../helpers/formatearTotal";
import { Spiner } from "../../../../components/Spiner";
import { TableRegistraciones } from "../TableRegistraciones";
import { useRegistraciones } from "../../../../context/RegistracionesContext";
import { CardDashboardGeneral } from "../../../Dashboard/components/CardDashboardGeneral";

export const InformesVentasDiarias = () => {
  const [fecha, setFecha] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [filterVentas, setFilterVentas] = useState([]);
  const [inputFactura, setInputFactura] = useState("");

  const {
    registraciones,
    getRegistraciones,
    loading,
    sumarTotalesGenerales,
    sumarTotalesHoy,
    sumarTotalesPorFecha,
    handleResetTotales,
    handleResetFilterVentas,
    sumarTotalesPorRangoFechas,

    totalesGenerales,
    totalVentasHoyData,
    totalPorFecha,
    totalFechasPorRango,
    filtroVentasPorRango,
  } = useRegistraciones();

  useEffect(() => {
    getRegistraciones();
  }, []);

  useEffect(() => {
    if (registraciones.length > 0) {
      sumarTotalesGenerales(registraciones);
      sumarTotalesHoy(registraciones);
      handleResetFilterVentas(registraciones);
    }
  }, [registraciones]);

  useEffect(() => {
    if (registraciones.length > 0 && fecha) {
      sumarTotalesPorFecha(registraciones, fecha);
    }
    if (registraciones.length > 0 && fecha && fechaFin) {
      sumarTotalesPorRangoFechas(registraciones, fecha, fechaFin);
    }
  }, [fecha, fechaFin]);

  const onClickResetFechas = () => {
    setFecha("");
    setFechaFin("");
    handleResetTotales();
  };

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

  const { totalVentaGeneral, totalGanaciaGeneral } = totalesGenerales;
  const { totalVentasHoy, totalGanaciaHoy } = totalVentasHoyData;
  const { totalVentaPorDia, totalGanaciasPorDia } = totalPorFecha;
  const { totalVentaPorRango, totalGanaciasPorRango } = totalFechasPorRango;

  return (
    <div className="col-sm-12 mt-3">
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: "#4e73df", color: "white" }}
        >
          Informe de ventas diarias
        </div>

        <CardDashboardGeneral
          totalVentasHoy={totalVentasHoy}
          totalGanaciaHoy={totalGanaciaHoy}
          totalVentaGeneral={totalVentaGeneral}
          totalGanaciaGeneral={totalGanaciaGeneral}
        />
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
            {formatearTotal(totalVentaPorDia ? totalVentaPorDia : 0)}
          </div>
          <div className="alert alert-primary" role="alert">
            Ganancia por dia:{" "}
            {formatearTotal(totalGanaciasPorDia ? totalGanaciasPorDia : 0)}
          </div>
          <div className="alert alert-info" role="alert">
            Ventas por rango:{" "}
            {formatearTotal(totalVentaPorRango ? totalVentaPorRango : 0)}
          </div>
          <div className="alert alert-success" role="alert">
            Ganancia por rango:{" "}
            {formatearTotal(totalGanaciasPorRango ? totalGanaciasPorRango : 0)}
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
                      filtroVentasPorRango &&
                      filtroVentasPorRango.length > 0 &&
                      filtroVentasPorRango.map((datos) => (
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
