import React, { useState } from "react";
import "../styles/styles.css";
import { ModalProductos } from "../../Stock/components/ModalProductos";
import { useProductos } from "../../../context/ProductosContext";
import { InformesStockCritico } from "../components/informes/InformesStockCritico";
import { InformeMovimientoStock } from "../components/informes/InformeMovimientoStock";
import { useUtilsState } from "../../../hooks";
import { ModalReposicionStock } from "../components";

export const ListarInformesPages = () => {
  const { dataEdit, addDataEdit } = useUtilsState();
  const { updateStockProductos } = useProductos();

  return (
    <>
      <section className="container-fluid">
        <div className="container">
          <div className="row mt-5">
            <InformesStockCritico setDataToEdit={addDataEdit} />
            <InformeMovimientoStock />
          </div>
        </div>
        {/* <ModalProductos dataToEdit={dataEdit} updateData={updateProductos} /> */}
        <ModalReposicionStock
          dataToEdit={dataEdit}
          setDataToEdit={addDataEdit}
          updateStockProductos={updateStockProductos}
        />
      </section>
    </>
  );
};
