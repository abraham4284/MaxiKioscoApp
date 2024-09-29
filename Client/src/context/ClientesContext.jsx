import { createContext, useContext, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
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

  const URL = `${import.meta.env.VITE_BACKEND_URL}/cliente`;

  const { get, post, put, deleted } = helpHttp();

  const getClientes = async () => {
    try {
      get(URL).then((res) => {
        if(!res){
          setClientes(null);
          setLoading(false);
          setError(null);
        }
        setClientes(res);
        setLoading(false);
        setError(null);
      });
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

  const resetClientes = () =>{
    setClientes([]);
  }

  const createClientes = async (data) => {
    let options = {
      body: data,
      headers: { "Content-Type": "application/json" },
    };

    try {
      post(URL, options).then((res) => {
        console.log(res);
        if (!res) {
          setClientes(null);
          setLoading(false);
          setError(null);
        }

        setClientes([...clientes, res]);
        setLoading(false);
        setError(null);
      });
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en createClientes ClientesContext.jsx",
      });
    }
  };

  const updateClientes = async (data) => {
    let endpoind = `${URL}/${data.idClientes}`;
    let options = {
      body: data,
      headers: { "Content-Type": "application/json" },
    };
    try {
      put(endpoind, options).then((res) => {
        if (!res) {
          setClientes(null);
          setLoading(false);
          setError(null);
        }
        let newData = clientes.map((el) =>
          el.idClientes === data.idClientes ? data : el
        );
        setClientes(newData);
        setLoading(false);
        setError(null);
      });
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en updateClientes ClientesContext.jsx",
      });
    }
  };

  const deleteClientes = async (id) => {
    let endpoind = `${URL}/${id}`;

    try {
      Swal.fire({
        title: "Estas seguro?",
        text: `Eliminaras al cliente con el id: ${id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
      }).then((result) => {
        if (result.isConfirmed) {
          deleted(endpoind).then((res) => {
            if (!res) {
              setClientes(null);
              setLoading(false);
              setError(null);
            }
            let newData = clientes.filter((el) => el.idClientes !== id);
            setClientes(newData);
            setLoading(false);
            setError(null);
          });
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
        resetClientes
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};
