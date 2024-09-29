import { useContext, createContext, useState } from "react";
import { URL } from "../helpers/api.js";
import { helpHttp } from "../helpers/helpHttp";

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
  const [loadingDetalles, setLoadingDetalles] = useState(true)
  const [error, setError] = useState(null);
  const [errorDetalles ,setErrorDetalles] = useState(null)

  const URL_API = `${URL}/registraciones`;

  const { get, post } = helpHttp();

  const getRegistraciones = async () => {
    try {
      get(URL_API).then((res) => {
        if (!res) {
          setRegistraciones(null);
          setLoading(false);
          setError(res);
        }
        setRegistraciones(res);
        setLoading(false);
        setError(null);
      });
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
      get(`${URL_API}/${id}`).then((res) => {
        if (!res) {
          setRegistraciones(null);
          setLoading(false);
          setError(res);
        }
        setRegistraciones(res);
        setLoading(false);
        setError(null);
      });
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
      get(`${URL}/registracionesDetalles/${id}`).then((res) => {
        if (!res) {
          setDetalleRegistraciones(null);
          setLoadingDetalles(false);
          setErrorDetalles(res);
        }
        setDetalleRegistraciones(res);
        setLoadingDetalles(false);
        setLoadingDetalles(null);
      });
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getIdRegistraciones ClientesContext.jsx",
      });
    }
  };

  const createRegistraciones = async (data) => {
    let options = {
      body: data,
      headers: { "Content-Type": "application/json" },
    };
    try {
      post(URL_API, options).then((res) => {
        if (!res) {
          setRegistraciones(null);
          setLoading(false);
          setError(res);
        }
        if (res.message === "Venta registrada") {
          setRegistraciones([...registraciones, res]);
          setLoading(false);
          setError(null);
        }
      });
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en createRegistraciones ClientesContext.jsx",
      });
    }
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
        createRegistraciones,
        setRegistraciones,
        setLoading
      }}
    >
      {children}
    </RegistracionesContext.Provider>
  );
};
