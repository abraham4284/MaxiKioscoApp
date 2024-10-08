import { createContext, useContext, useState } from "react";

import {
  getProductosRequest,
  createProductosRequest,
  updateProductosRequest,
  deleteProductosRequest,
} from "../api/productos/productos.api.js";
import Swal from "sweetalert2";

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
  const [productoEncontrado, setProductoEncontrado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const getProductos = async () => {
    try {
      const { data } = await getProductosRequest();
      if (!data) {
        setProductos(null);
        setLoading(false);
        setError(data);
      }

      setProductos(data);
      setLoading(false);
      setError(null);
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
      } else {
        setProductoEncontrado(null);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  const resetProductoEncontrado = () => {
    setProductoEncontrado([]);
  };

  const createProductos = async (data) => {
    try {
      const { data: dataProductos } = await createProductosRequest(data);
      if (!dataProductos) {
        setProductos(null);
        setLoading(false);
        setError(dataProductos);
      }

      setProductos([...productos, dataProductos]);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  const updateProductos = async (id,data) => {
    try {
      const { data: dataProductos } = await updateProductosRequest(id,data);
      if (!dataProductos) {
        setProductos(null);
        setLoading(false);
        setError(dataProductos);
      }

      let newData = productos.map((el) =>
        el.idProductos === id ? data : el
      );
      setProductos(newData);
      setLoading(false);
      setError(null);
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await deleteProductosRequest(id);
          if (!data) {
            setProductos(null);
            setLoading(false);
            setError(data);
          }
          let newData = productos.filter((el) => el.idProductos !== id);
          setProductos(newData);
          setLoading(false);
          setError(null);

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
        resetProductoEncontrado,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
