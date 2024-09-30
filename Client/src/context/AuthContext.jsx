import { createContext, useState, useContext, useEffect } from "react";
import {
  getUsuariosByNameRequest,
  verifyRequest,
  registroRequest,
  loginRequest,
  updateUsuariosRequest,
  logoutRequest,
} from "../api/auth/auth.api.js";

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

  const register = async (data) => {
    setStateSession(1);
    try {
      const { data: dataUser } = await registroRequest(data);
      if (!dataUser) {
        setUsuario(null);
        setIsAutenticated(false);
        setErrors(dataUser);
        return;
      } else {
        setUsuario(dataUser);
        setIsAutenticated(true);
        setErrors(null);
        setStateSession(2);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.message);
      console.log("Error en al funcion register context");
      setStateSession(3);
    }
  };

  const login = async (data) => {
    setStateSession(1);
    try {
      const { data: dataUser } = await loginRequest(data);
      if (!dataUser) {
        setUsuario(null);
        setIsAutenticated(false);
        setErrors(dataUser);
      } else {
        setUsuario(dataUser);
        setIsAutenticated(true);
        setErrors(null);
        setStateSession(2);
      }
    } catch (error) {
      setErrors(error.response.data.message);
      setStateSession(3);
    }
  };

  const getUsuariosByUsername = async (data) => {
    try {
      const { data: dataUser } = await getUsuariosByNameRequest(data);
      if (!dataUser) {
        setLoadingUserIndividual(false);
        setUsuarioIndividual(false);
      }

      setUsuarioIndividual(dataUser);
      setLoadingUserIndividual(false);
    } catch (error) {
      console.log(error);
      console.log("Error en al funcion getIdUsuarios Context");
    }
  };

  const updateUsuarios = async (id, data) => {
    try {
      const { data: dataUser } = await updateUsuariosRequest(id, data);
      if (!dataUser) {
        setUsuarioIndividual(null);
        setLoadingUserIndividual(false);
        setIsAutenticated(false);
      }
      setUsuarioIndividual(dataUser);
      setLoadingUserIndividual(false);
      setIsAutenticated(true);
    } catch (error) {
      console.log(error);
      console.log("Error en al funcion updateUsuarios Context");
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setIsAutenticated(false);
      setUsuario(null);
    } catch (error) {
      console.log(error);
      setIsAutenticated(false);
      setLoading(false);
      setUsuario(null);
    }
  };

  useEffect(() => {
    if (error && error.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const { data } = await verifyRequest();
        if (!data) {
          setIsAutenticated(false);
          setLoading(false);
          setUsuario(null);
        } else {
          setUsuario(data);
          setIsAutenticated(true);
          setLoading(false);
        }
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
