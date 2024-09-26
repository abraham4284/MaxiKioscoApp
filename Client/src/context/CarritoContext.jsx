import { useContext, createContext, useState } from "react";

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("El useCarrito esta fuera del provider");
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [totalCarrito, setTotalCarrito] = useState(null);

  const agregarCarrito = (data) => {
    try {
      if (!data) return;
      setCarrito([...carrito, data]);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en agregarCarrito CarritoContext.jsx",
      });
    }
  };

  const deleteProductoCarrito = (id) => {
    try {
      const deleteProducto = carrito.filter((el) => el.idProductos !== id);
      setCarrito(deleteProducto);
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en deleteProductoCarrito CarritoContext.jsx",
      });
    }
  };

  const sumarTotalCarrito = (carrito) => {
    try {
      if (!carrito) return;
      let resultado = 0;
      for (let i = 0; i < carrito.length; i++) {
        let { subTotal } = carrito[i];
        resultado += subTotal;
        setTotalCarrito(resultado);
      }
    } catch (error) {
      console.log({
        error: error.message,
        errorCompleto: error,
        message: "Error en deleteProductoCarrito CarritoContext.jsx",
      });
    }
  };

  const resetCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        totalCarrito,
        agregarCarrito,
        deleteProductoCarrito,
        sumarTotalCarrito,
        setCarrito,
        resetCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
