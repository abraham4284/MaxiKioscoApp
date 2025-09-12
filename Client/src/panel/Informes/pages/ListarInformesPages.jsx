import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import { InformesStockCritico } from "../components/informes/InformesStockCritico";
import { InformeMovimientoStock } from "../components/informes/InformeMovimientoStock";
import { useUtilsState } from "../../../hooks";
import { ModalReposicionStock } from "../components";
import { useMovimientosStock } from "../../hooks";
import { useProductos } from "@/context";

export const ListarInformesPages = () => {
  const { dataEdit, addDataEdit } = useUtilsState();
  const { updateStockProductos } = useProductos();
  const { movimientos, loading, error, getMovimientos, resetMovimientos } =
    useMovimientosStock();
  const { productos, getProductos, resetProductos } = useProductos();

  useEffect(() => {
    getMovimientos();
    getProductos();
    return () => {
      resetMovimientos();
      resetProductos();
    };
  }, []);

  return (
    <section className="container-fluid">
      <div className="container">
        <div className="row mt-5">
          <InformesStockCritico
            setDataToEdit={addDataEdit}
            productos={productos}
          />
          <InformeMovimientoStock movimientos={movimientos} loading={loading} />
        </div>
      </div>
      {/* <ModalProductos dataToEdit={dataEdit} updateData={updateProductos} /> */}
      <ModalReposicionStock
        dataToEdit={dataEdit}
        setDataToEdit={addDataEdit}
        updateStockProductos={updateStockProductos}
        getMovimientos={getMovimientos}
      />
    </section>
  );
};
