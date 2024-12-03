import React, { useEffect, useState } from "react";
import { TableRegistraciones } from "./tables/TableRegistraciones.jsx";
import { useRegistraciones } from "../../../context/RegistracionesContext.jsx";
import { CardDashboardGeneral } from "../components/cards/CardDashboardGeneral.jsx";
import { CardFilterVentas } from "./cards/CardFilterVentas.jsx";

export const InformesVentasDiarias = () => {
  const [fecha, setFecha] = useState("");
  const [fechaFin, setFechaFin] = useState("");
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
    setFiltroVentasPorRango,

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
      setFiltroVentasPorRango(registraciones);
    }

    const filterFacturaVentas = registraciones.filter((el) => {
      return (
        el.NFactura.toLocaleLowerCase().includes(searchInput) ||
        el.Fecha.toLocaleLowerCase().includes(searchInput)
      );
    });
    setFiltroVentasPorRango(filterFacturaVentas);
  };

  const { totalVentaGeneral, totalGanaciaGeneral } = totalesGenerales;
  const { totalVentasHoy, totalGanaciaHoy } = totalVentasHoyData;
  const { totalVentaPorDia, totalGanaciasPorDia } = totalPorFecha;
  const { totalVentaPorRango, totalGanaciasPorRango } = totalFechasPorRango;

  return (
    <div className="col-sm-12 mt-3">
      <div className="card">
        
        <CardDashboardGeneral
          totalVentasHoy={totalVentasHoy}
          totalGanaciaHoy={totalGanaciaHoy}
          totalVentaGeneral={totalVentaGeneral}
          totalGanaciaGeneral={totalGanaciaGeneral}
          getRegistraciones = {getRegistraciones}
        />
    
        <CardFilterVentas
          setFecha={setFecha}
          setFechaFin={setFechaFin}
          fecha={fecha}
          fechaFin={fechaFin}
          inputFactura={inputFactura}
          handleFilterVentasByFactura={handleFilterVentasByFactura}
          onClickResetFechas={onClickResetFechas}
          totalVentaPorDia={totalVentaPorDia}
          totalGanaciasPorDia={totalGanaciasPorDia}
          totalVentaPorRango={totalVentaPorRango}
          totalGanaciasPorRango={totalGanaciasPorRango}
        />
        <TableRegistraciones
          inputFactura={inputFactura}
          data={filtroVentasPorRango}
          loading={loading}
        />
      </div>
    </div>
  );
};
