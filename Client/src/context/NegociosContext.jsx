import { createContext, useContext, useState } from "react";

import {
  getNegociosRequest,
  createNegociosRequest,
  updateNegociosRequest,
} from "../api/negocios/negocios.api.js";

const negociosContext = createContext();

export const useNegocios = () => {
  const context = useContext(negociosContext);
  if (!context) {
    throw new Error("El useNegocios tiene que estar dentro del provider");
  }
  return context;
};

export const NegociosProvider = ({ children }) => {
  const [negocios, setNegocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getNegocios = async () => {
    try {
      const { data } = await getNegociosRequest();
      if (!data) {
        setNegocios([]);
        setLoading(false);
        setError(data);
      }
      setNegocios(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const createNegocio = async (dataNegocio) => {
    try {
      const { data } = await createNegociosRequest(dataNegocio);
      if (data.status === "OK") {
        setNegocios([...negocios, dataNegocio]);
        setLoading(false);
        setError(null);
        return { success: true, message: data.message };
      } else {
        setLoading(false);
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Errore en CreateNegocio ",
      });
      const { response: { data: { message } } = {} } = error;
      console.log(error, "Error en createNegocio ClientesContext");
      return { success: false, message: message || "Error del servidor" };
    }
  };

  const updateNegocios = async (id, dataNegocio) => {
    try {
      const { data } = await updateNegociosRequest(id, dataNegocio);
      if (data.status === "OK") {
        let newData = negocios.map((el) =>
          el.idNegocios === id ? dataNegocio : el
        );
        setNegocios(newData);
        setLoading(false);
        setError(null);
        return { success: true, message: data.message };
      } else {
        setNegocios([]);
        setLoading(false);
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.log(error);
      const { response: { data: { message } } = {} } = error;
      console.log(error, "Error en updateNegocios ClientesContext");
      return { success: false, message: message || "Error del servidor" };
    }
  };

  return (
    <negociosContext.Provider
      value={{
        negocios,
        error,
        loading,
        createNegocio,
        updateNegocios,
        getNegocios,
      }}
    >
      {children}
    </negociosContext.Provider>
  );
};
