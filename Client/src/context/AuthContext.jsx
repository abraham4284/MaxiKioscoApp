import { createContext, useState, useContext, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw error("El useAuth tiene que estar dentro del provider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [usuarioIndividual, setUsuarioIndividual] = useState([]);
  const [isAutenticated, setIsAutenticated] = useState(false);
  const [error, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUserIndividual, setLoadingUserIndividual] = useState(true);
  const [stateSession, setStateSession] = useState(0);


  const URL = import.meta.env.VITE_BACKEND_URL;


  const { get, post, put } = helpHttp();

  const register = (data) => {
    setStateSession(1);
    try {
      let options = {
        body: data,
        headers: { "Content-Type": "application/json" },
      };
      post(`${URL}/registro`, options).then((res) => {
        console.log(res, "Soy la respuesta");
        if (res.error) {
          setUsuario(null);
          setIsAutenticated(false);
          setErrors(["El usuario ya existe"]);
          return;
        }
        setUsuario(res);
        setIsAutenticated(true);
        setErrors(null);
        setStateSession(2);
      });
    } catch (error) {
      console.log(error);
      console.log("Error en al funcion register context");
      setStateSession(3);
    }
  };

  const login = (data) => {
    setStateSession(1)
    try {
      let options = {
        body: data,
        headers: { "Content-Type": "application/json" },
      };
      post(`${URL}/login`, options).then((res) => {
        if (res.error) {
          setUsuario(null);
          setIsAutenticated(false);
          setErrors(["Usuario o contraseña incorrecta"]);
          return;
        }
        setUsuario(res);
        setIsAutenticated(true);
        setErrors(null);
        setStateSession(2)
      });
    } catch (error) {
      console.log(error);
      console.log("Error en al funcion login context");
      setStateSession(3)
    }
  };

  const getUsuariosByUsername = (data) => {
    try {
      let endpoint = `${URL}/usuarios/${data}`;
      setLoadingUserIndividual(true);
      get(endpoint).then((res) => {
        if (res.error) {
          setLoadingUserIndividual(false);
          setUsuarioIndividual(false);
        }
        setUsuarioIndividual(res);
        setLoadingUserIndividual(false);
      });
    } catch (error) {
      console.log(error);
      console.log("Error en al funcion getIdUsuarios Context");
    }
  };

  const updateUsuarios = (data) => {
    try {
      let endpoint = `${URL}/usuarios/${data.idUsuarios}`;
      let options = {
        body: data,
        headers: { "Content-Type": "application/json" },
      };
      setLoadingUserIndividual(true);
      put(endpoint, options).then((res) => {
        if (res.error) {
          setUsuarioIndividual(null);
          setLoadingUserIndividual(false);
          setIsAutenticated(false);
        }
        setUsuarioIndividual(data);
        setLoadingUserIndividual(false);
        setIsAutenticated(true);
      });
    } catch (error) {
      console.log(error);
      console.log("Error en al funcion updateUsuarios Context");
    }
  };

  const logout = () => {
    try {
      let endpoint = `${URL}/logout`;
      post(endpoint).then((res) => {
        if(res){
          setIsAutenticated(false)
          setLoading(false)
          setUsuario(null)
        }
      });
    } catch (error) {
      console.log(error);
      setIsAutenticated(false);
      setLoading(false);
      setUsuario(null);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        setLoading(true);
        let endpoint = `${URL}/verify`;
        get(endpoint).then((res) => {
           
          if (res.error) {
            setIsAutenticated(false);
            setLoading(false);
            setUsuario(null);
          } else {
            setUsuario(res);
            setIsAutenticated(true);
            setLoading(false);
          }
        });
      } catch (error) {
        setIsAutenticated(false);
        setLoading(false);
        setUsuario(null);
        console.log(error.message, "Soy el error");
      }
    };
    checkLogin();
  }, []);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <authContext.Provider
      value={{
        usuario,
        isAutenticated,
        usuarioIndividual,
        loading,
        loadingUserIndividual,
        stateSession,
        error,

        register,
        login,
        logout,
        getUsuariosByUsername,
        updateUsuarios,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
