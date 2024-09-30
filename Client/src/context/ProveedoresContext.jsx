import { createContext, useContext, useState } from "react";
import {
  getProvedoresRequest,
  getIdProveedoresRequest,
  createProveedoresRequest,
  updateProveedoresRequest,
  deleteProveedoresRequest,
} from "../api/proveedores/proveedores.api";
import Swal from "sweetalert2";

const ProveedoresContext = createContext();

export const useProveedores = () => {
  const context = useContext(ProveedoresContext);
  if (!context) {
    throw new Error("el useProveedores tiene que estar dentro del provider");
  }
  return context;
};

export const ProveedoresProvider = ({ children }) => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProveedores = async () => {
    try {
      const { data } = await getProvedoresRequest();
      if (!data) {
        setProveedores(null);
        setLoading(false);
        setError(data);
      }

      setProveedores(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getProveedores ClientesContext.jsx",
      });
    }
  };

  const getIdProveedores = async (id) => {
    try {
      const { data } = await getIdProveedoresRequest(id);
      if (!data) {
        setProveedores(null);
        setLoading(false);
        setError(data);
      }

      setProveedores(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getIdProveedores ClientesContext.jsx",
      });
    }
  };

  const createProveedores = async (data) => {
    try {
      const { data: dataProveedores } = await createProveedoresRequest(data);
      if (!dataProveedores) {
        setProveedores(null);
        setLoading(false);
        setError(dataProveedores);
      }

      setProveedores([...proveedores, dataProveedores]);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en createProveedores ClientesContext.jsx",
      });
    }
  };

  const updateProveedores = async (id, data) => {
    try {
      const { data: dataProveedores } = await updateProveedoresRequest(
        id,
        data
      );
      if (!dataProveedores) {
        setProveedores(null);
        setLoading(false);
        setError(dataProveedores);
      }
      let newData = proveedores.map((el) =>
        el.idProveedores === id ? data : el
      );
      setProveedores(newData);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en updateProveedores ClientesContext.jsx",
      });
    }
  };

  const deleteProveedores = async (id) => {
    try {
      Swal.fire({
        title: "Estas seguro?",
        text: `Eliminaras al proveedor con el id: ${id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await deleteProveedoresRequest(id);
          if (!data) {
            setProveedores(null);
            setLoading(false);
            setError(null);
          }

          let newData = clientes.filter((el) => el.idProveedores !== id);
          setProveedores(newData);
          setLoading(false);
          setError(null);
        }
      });
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en deleteProveedores ClientesContext.jsx",
      });
    }
  };

  return (
    <ProveedoresContext.Provider
      value={{
        proveedores,
        loading,
        error,

        getProveedores,
        getIdProveedores,
        createProveedores,
        updateProveedores,
        deleteProveedores
      }}
    >
      {children}
    </ProveedoresContext.Provider>
  );
};
