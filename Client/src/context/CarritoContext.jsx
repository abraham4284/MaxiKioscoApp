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

  const updateCantidadProducto = (data) => {
    if (!data || !data.idProductos) return;
    const newCarrito = carrito.map((el) =>
      el.idProductos === data.idProductos
        ? {
            ...el,
            Cantidad: data.Cantidad,
            SubTotal: data.Cantidad * data.Precio,
          }
        : el
    );
    setCarrito(newCarrito);
  };

  const chekingProductoCarrito = (idProductos) => {
    return carrito.some((item) => item.idProductos === idProductos);
  };

  const deleteProductoCarrito = (id) => {
    try {
      const deleteProducto = carrito.filter((el) => el.idProductos !== id);
      setCarrito(deleteProducto);
      if (deleteProducto.length === 0) {
        setTotalCarrito(0);
      }
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
        let { SubTotal } = carrito[i];
        resultado += SubTotal;
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
    setTotalCarrito(0);
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
        chekingProductoCarrito,
        updateCantidadProducto,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
