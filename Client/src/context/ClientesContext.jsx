import { createContext, useContext, useState } from "react";
import {
  getClientesRequest,
  createClientesRequest,
  updateClientesRequest,
  deleteClientesRequest,
} from "../api/clientes/clientes.api.js";

import Swal from "sweetalert2";

const ClientesContext = createContext();

export const useClientes = () => {
  const context = useContext(ClientesContext);
  if (!context) {
    throw new Error("El useClientes esta fuera del provider");
  }
  return context;
};

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [clienteEncontrado, setClienteEncontrado] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getClientes = async () => {
    try {
      const { data } = await getClientesRequest();
      if (!data) {
        setClientes(null);
        setLoading(false);
        setError(null);
      } else {
        setClientes(data);
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getClientes ClientesContext.jsx",
      });
    }
  };

  const buscarClientesPorDNI = async (CUIT) => {
    try {
      let busqueda = clientes.find((el) => el.CUIT === CUIT);
      if (busqueda) {
        setClienteEncontrado(busqueda);
      } else {
        setClienteEncontrado("Consumidor Final");
      }
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en getClientes ClientesContext.jsx",
      });
    }
  };

  const resetClientesEncontrado = () => {
    setClienteEncontrado("Consumidor Final");
  };

  const resetClientes = () => {
    setClientes([]);
  };

  const createClientes = async (dataCliente) => {
    try {
      const { data } = await createClientesRequest(dataCliente);
      if (data.status === "OK") {
        setClientes([...clientes, data.data]);
        setLoading(false);
        setError(null);
        return { success: true, message: data.message };
      } else {
        setClientes(null);
        setLoading(false);
        setError(null);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en createClientes ClientesContext.jsx",
      });
    }
  };

  const updateClientes = async (id, dataClientes) => {
    try {
      const { data } = await updateClientesRequest(id, dataClientes);
      if (data.status === "OK") {
        let newData = clientes.map((el) =>
          el.idClientes === id ? dataClientes : el
        );
        setClientes(newData);
        setLoading(false);
        setError(null);
        return { success: true, message: data.message };
      } else {
        setLoading(false);
        setError(null);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en updateClientes ClientesContext.jsx",
      });
    }
  };

  const deleteClientes = async (id) => {
    try {
      Swal.fire({
        title: "Estas seguro?",
        text: `Eliminaras al cliente con el id: ${id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await deleteClientesRequest(id);
          if (!data) {
            setClientes(null);
            setLoading(false);
            setError(null);
          }

          let newData = clientes.filter((el) => el.idClientes !== id);
          setClientes(newData);
          setLoading(false);
          setError(null);
        }
      });
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en deleteClientes ClientesContext.jsx",
      });
    }
  };

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        loading,
        error,
        clienteEncontrado,

        getClientes,
        createClientes,
        updateClientes,
        deleteClientes,
        buscarClientesPorDNI,
        resetClientesEncontrado,
        setLoading,
        resetClientes,
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};
