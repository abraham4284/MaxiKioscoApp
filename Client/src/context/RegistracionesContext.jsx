import { useContext, createContext, useState } from "react";
import {
  getRegistracionesRequest,
  getIdRegistracionesRequest,
  getIdRegistracionesDetallesRequest,
} from "../api/registraciones/registraciones.api.js";
import { fechaLocal } from "../helpers/fechaLocal.js";

const RegistracionesContext = createContext();

export const useRegistraciones = () => {
  const context = useContext(RegistracionesContext);
  if (!context) {
    throw new Error("El useRegistraciones esta fuera del provider");
  }
  return context;
};

export const RegistracionesProvider = ({ children }) => {
  const [registraciones, setRegistraciones] = useState([]);
  const [detalleRegistraciones, setDetalleRegistraciones] = useState([]);

  const [totalFechasPorRango, setTotalFechasPorRango] = useState("");
  const [totalPorFecha, setTotalPorFecha] = useState("");
  const [totalesGenerales, setTotalesGenerales] = useState("");
  const [totalVentasHoyData, setTotalVentasHoy] = useState("");
  const [filtroVentasPorRango, setFiltroVentasPorRango] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingDetalles, setLoadingDetalles] = useState(true);
  const [error, setError] = useState(null);
  const [errorDetalles, setErrorDetalles] = useState(null);

  const getRegistraciones = async () => {
    try {
      const { data } = await getRegistracionesRequest();
      if (!data) {
        setRegistraciones(null);
        setLoading(false);
        setError(data);
      }

      setRegistraciones(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getRegistraciones ClientesContext.jsx",
      });
    }
  };

  const getIdRegistraciones = async (id) => {
    try {
      const { data } = await getIdRegistracionesRequest(id);
      if (!data) {
        setRegistraciones(null);
        setLoading(false);
        setError(data);
      }

      setRegistraciones(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getIdRegistraciones ClientesContext.jsx",
      });
    }
  };

  const getIdRegistracionesDetalles = async (id) => {
    try {
      const { data } = await getIdRegistracionesDetallesRequest(id);
      if (!data) {
        setDetalleRegistraciones(null);
        setLoadingDetalles(false);
        setErrorDetalles(data);
      }

      setDetalleRegistraciones(data);
      setLoadingDetalles(false);
      setErrorDetalles(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getIdRegistraciones ClientesContext.jsx",
      });
    }
  };

  // Ventas filtros

  const sumarTotalesGenerales = (data = []) => {
    if (!data) return;

    let totalCostoGeneral = 0;
    let totalVentaGeneral = 0;
    let totalGanaciaGeneral = 0;

    for (let i = 0; i < data.length; i++) {
      let { totalCosto, Total } = data[i];
      totalCostoGeneral += Number(totalCosto);
      totalVentaGeneral += Number(Total);
      totalGanaciaGeneral = totalVentaGeneral - totalCostoGeneral;
      setTotalesGenerales({
        totalCostoGeneral,
        totalVentaGeneral,
        totalGanaciaGeneral,
      });
    }
  };

  //Filtrar ventas por Fecha

  const sumarTotalesHoy = (data = []) => {
    try {
      let totalCostoHoy = 0;
      let totalVentasHoy = 0;
      let totalGanaciaHoy = 0;
      const { HoyfechaLocal } = fechaLocal();
      const filterVentasHoy = data.filter((el) => el.Fecha === HoyfechaLocal);

      filterVentasHoy.forEach((el) => {
        totalCostoHoy += Number(el.totalCosto);
        totalVentasHoy += Number(el.Total);
        totalGanaciaHoy = totalVentasHoy - totalCostoHoy;
        setTotalVentasHoy({
          totalCostoHoy,
          totalVentasHoy,
          totalGanaciaHoy,
        });
      });
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en sumarTotalesHoy VentasContext",
      });
    }
  };

  const sumarTotalesPorFecha = (data = [], fechaInicio) => {
    try {
      if (!data || !fechaInicio) return;

      let totalCostoPorDia = 0;
      let totalVentaPorDia = 0;
      let totalGanaciasPorDia = 0;

      const filtroVentasPorFecha = data.filter(
        (el) => el.Fecha === fechaInicio
      );

      filtroVentasPorFecha.forEach((el) => {
        totalCostoPorDia += Number(el.totalCosto);
        totalVentaPorDia += Number(el.Total);
        totalGanaciasPorDia = totalVentaPorDia - totalCostoPorDia;
        setTotalPorFecha({
          totalCostoPorDia,
          totalVentaPorDia,
          totalGanaciasPorDia,
        });
      });
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en sumarTotalesPorFecha VentasContext",
      });
    }
  };

  const sumarTotalesPorRangoFechas = (data = [], fechaInicio, fechaFin) => {
    try {
      if (!data || !fechaInicio || !fechaFin) return;
      let totalCostoPorRango = 0;
      let totalVentaPorRango = 0;
      let totalGanaciasPorRango = 0;

      const filtroVentasPorRangoFechas = data.filter((el) => {
        const fechaVenta = el.Fecha;
        return fechaVenta >= fechaInicio && fechaVenta <= fechaFin;
      });

      filtroVentasPorRangoFechas.forEach((el) => {
        totalCostoPorRango += Number(el.totalCosto);
        totalVentaPorRango += Number(el.Total);
        totalGanaciasPorRango = totalVentaPorRango - totalCostoPorRango;
        setTotalFechasPorRango({
          totalCostoPorRango,
          totalVentaPorRango,
          totalGanaciasPorRango,
        });
      });

      setFiltroVentasPorRango(filtroVentasPorRangoFechas);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en sumarTotalesPorRangoFechas VentasContext",
      });
    }
  };

  const handleResetFilterVentas = (data)=>{
    setFiltroVentasPorRango(data);
  }
  const handleResetTotales = () => {
    setTotalFechasPorRango("");
    setTotalPorFecha("");
  };

  const resetRegistraciones = () => {
    setRegistraciones([]);
  };

  const resetDetalleRegistraciones = () => {
    setDetalleRegistraciones([]);
  };

  return (
    <RegistracionesContext.Provider
      value={{
        registraciones,
        loading,
        error,

        detalleRegistraciones,
        loadingDetalles,
        errorDetalles,

        totalesGenerales,
        totalVentasHoyData,
        totalPorFecha,
        totalFechasPorRango,
        filtroVentasPorRango,

        getRegistraciones,
        getIdRegistraciones,
        getIdRegistracionesDetalles,
        setRegistraciones,
        setLoading,
        setLoadingDetalles,
        resetRegistraciones,
        resetDetalleRegistraciones,

        sumarTotalesGenerales,
        sumarTotalesHoy,
        sumarTotalesPorFecha,
        handleResetTotales,
        sumarTotalesPorRangoFechas,
        handleResetFilterVentas,
        setFiltroVentasPorRango
      }}
    >
      {children}
    </RegistracionesContext.Provider>
  );
};
