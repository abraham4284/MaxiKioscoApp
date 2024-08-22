import { createContext, useContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

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

  const { get, post, put } = helpHttp();
  let url = "http://localhost:3000/api/negocios";
  const URL = import.meta.env.VITE_BACKEND_URL

  const getNegocios = () => {
    setLoading(true);
    try {
      get(`${URL}/negocios`).then((res) => {
        if (res.error) {
          setError(res);
          setNegocios([]);
        } else {
          setNegocios(res);
          setError(null);
        }
        setLoading(false);
      });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getNegocios();
  // }, []);

  const createNegocio = (data) => {
    let options = {
      body: data,
      headers: { "Content-Type": "application/json" },
    };
    setLoading(true);
    post(`${URL}/negocios`, options).then((res) => {
      if (res.error) {
        setError(res);
      } else {
        setNegocios([...negocios, res]);
        setError(null);
      }
      setLoading(false);
    });
  };

  const updateNegocios = (data) => {
    try {
      let endpoint = `${URL}/negocios/${data.idNegocios}`;
      let options = {
        body: data,
        headers: { "Content-Type": "application/json" },
      };

      setLoading(true);
      put(endpoint, options).then((res) => {
        if (!res.error) {
          let newData = negocios.map((el) =>
            el.idNegocios === data.idNegocios ? data : el
          );
          setNegocios(newData);
          setError(null);
        } else {
          setError(res);
        }
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <negociosContext.Provider
      value={{ negocios, error, loading, createNegocio, updateNegocios, getNegocios }}
    >
      {children}
    </negociosContext.Provider>
  );
};
