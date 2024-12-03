import React, { useState } from "react";
import "../styles/styles.css";
import { ModalProductos } from "../../Stock/components/ModalProductos";
import { useProductos } from "../../../context/ProductosContext";
import { InformesStockCritico } from "../components/informes/InformesStockCritico";
import { InformeMovimientoStock } from "../components/informes/InformeMovimientoStock";


export const ListarInformesPages = () => {
  const [dataToEdit, setDataToEdit] = useState(null);
  const { updateProductos } = useProductos();

  return (
    <>
      <section className="container-fluid">
        <div className="container">
          <div className="row mt-5">
            <InformesStockCritico setDataToEdit={setDataToEdit} />
            <InformeMovimientoStock />
          </div>
        </div>
        <ModalProductos dataToEdit={dataToEdit} updateData={updateProductos} />
      </section>
    </>
  );
};
