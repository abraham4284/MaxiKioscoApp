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

  const createNegocio = async (data) => {
    try {
      const { data: dataNegocio } = await createNegociosRequest(data);
      if (!dataNegocio) {
        setNegocios([]);
        setLoading(false);
        setError(dataNegocio);
      }
      setNegocios([...negocios, dataNegocio]);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Errore en CreateNegocio ",
      });
    }
  };

  const updateNegocios = async (id,data) => {
    try {
      const { data: dataNegocio } = await updateNegociosRequest(id,data);
      if (!dataNegocio) {
        setNegocios([]);
        setLoading(false);
        setError(dataNegocio);
      }

      let newData = negocios.map((el) =>
        el.idNegocios === id ? data : el
      );
      setNegocios(newData);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
