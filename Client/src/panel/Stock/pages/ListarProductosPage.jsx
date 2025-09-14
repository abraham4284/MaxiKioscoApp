import React, { useEffect, useState } from "react";
import { CardProductos } from "../components/CardProductos.jsx";
import { CardTableProductos } from "../components/CardTableProductos.jsx";
import { useProductos } from "../../../context/ProductosContext.jsx";
import { ModalReposicionStock } from "../../Informes/components";
import { useMovimientosStock } from "../../hooks";

export const ListarProductosPage = () => {
  const [dataToEdit, setDataToEdit] = useState(null);
  const {
    productos,
    getProductos,
    deleteProductos,
    loading,
    updateStockProductos,
  } = useProductos();
  const { getMovimientos } = useMovimientosStock();
  const [filterProductos, setFilterProductos] = useState([]);

  useEffect(() => {
    getProductos();
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    if (searchInput === "") {
      getProductos();
      setFilterProductos([]);
    } else {
      const filterProductos = productos.filter((datos) => {
        return datos.Descripcion.toLocaleLowerCase().includes(searchInput);
      });
      setFilterProductos(filterProductos);
    }
  };

  let productosFinal = filterProductos.length > 0 ? filterProductos : productos;

  return (
    <div className="container">
      <CardProductos
        handleInput={handleInput}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      <CardTableProductos
        data={productosFinal}
        setDataToEdit={setDataToEdit}
        loading={loading}
        deleteProductos={deleteProductos}
      />
      <ModalReposicionStock
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        getMovimientos={getMovimientos}
        updateStockProductos={updateStockProductos}
      />
    </div>
  );
};
