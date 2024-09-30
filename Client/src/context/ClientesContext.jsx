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
      console.log(busqueda, "Soy la busquedael resultado");
      if (busqueda) {
        setClienteEncontrado(busqueda);
        console.log(clienteEncontrado, "Soy el cliente encontrado");
      } else {
        setClienteEncontrado("Consumidor Final");
        console.log(
          clienteEncontrado,
          "Soy el cliente encontrado por si no se encuentra"
        );
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

  const createClientes = async (data) => {
    try {
      const { data: dataClientes } = await createClientesRequest(data);
      if (!dataClientes) {
        setClientes(null);
        setLoading(false);
        setError(null);
      }
      setClientes([...clientes, dataClientes]);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en createClientes ClientesContext.jsx",
      });
    }
  };

  const updateClientes = async (id, data) => {
    try {
      const { data: dataClientes } = await updateClientesRequest(id, data);
      if (!dataClientes) {
        setClientes(null);
        setLoading(false);
        setError(null);
      }

      let newData = clientes.map((el) => (el.idClientes === id ? data : el));
      setClientes(newData);
      setLoading(false);
      setError(null);
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
