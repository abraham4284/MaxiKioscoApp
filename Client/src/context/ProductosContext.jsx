import { createContext, useContext, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

const ProductosContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error("El useNegocios tiene que estar dentro del provider");
  }
  return context;
};

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [productoEncontrado, setProductoEncontrado] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { get, post, put, deleted } = helpHttp();

  const URL = import.meta.env.VITE_BACKEND_URL;

  const getProductos = () => {
    try {
      setLoading(true);
      get(`${URL}/productos`).then((res) => {
        if (!res.error) {
          setProductos(res);
          setError(null);
        } else {
          setProductos(null);
          setError(res);
          setLoading(false);
        }
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  const busquedaProducto = async (CodeBar) => {
    try {
      let busqueda = productos.find((el) => el.CodeBar === CodeBar);
      if (busqueda) {
        setProductoEncontrado(busqueda);
      }else{
        console.log("No existe el producto")
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  const resetProductoEncontrado = () =>{
    setProductoEncontrado([]);
  }

  const createProductos = (data) => {
    try {
      let options = {
        body: data,
        headers: { "Content-Type": "application/json" },
      };
      setLoading(true);
      post(`${URL}/productos`, options).then((res) => {
        if (!res.error) {
          setProductos([...db, res]);
          setError(null);
        } else {
          setError(res);
          setLoading(false);
          setProductos(null);
        }
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  const updateProductos = (data) => {
    try {
      let endpoint = `${URL}/productos/${data.idProductos}`;
      let options = {
        body: data,
        headers: { "Content-Type": "application/json" },
      };
      setLoading(true);
      put(endpoint, options).then((res) => {
        if (!res.error) {
          let newData = productos.map((el) =>
            el.idProductos === data.idProductos ? data : el
          );
          setProductos(newData);
          setError(null);
          getProductos();
        } else {
          setError(res);
          setLoading(false);
          setProductos(null);
        }
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteProductos = (id) => {
    try {
      Swal.fire({
        title: "Estas seguro?",
        text: `Eliminaras al provedor con el id: ${id}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!",
      }).then((result) => {
        if (result.isConfirmed) {
          let endpoint = `${URL}/productos/${id}`;
          setLoading(true);
          deleted(endpoint).then((res) => {
            if (!res.error) {
              let newData = db.filter((el) => el.idProductos !== id);
              setProductos(newData);
            } else {
              setError(res);
              setLoading(false);
              setProductos(null);
            }
            setLoading(false);
          });
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        error,
        loading,
        getProductos,
        createProductos,
        updateProductos,
        deleteProductos,

        productoEncontrado,
        busquedaProducto,
        resetProductoEncontrado
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
