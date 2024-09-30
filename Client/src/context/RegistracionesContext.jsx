import { useContext, createContext, useState } from "react";
import {
  getRegistracionesRequest,
  getIdRegistracionesRequest,
  getIdRegistracionesDetallesRequest,
} from "../api/registraciones/registraciones.api.js";


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

        getRegistraciones,
        getIdRegistraciones,
        getIdRegistracionesDetalles,
        setRegistraciones,
        setLoading,
        setLoadingDetalles,
        resetRegistraciones,
        resetDetalleRegistraciones,
      }}
    >
      {children}
    </RegistracionesContext.Provider>
  );
};
