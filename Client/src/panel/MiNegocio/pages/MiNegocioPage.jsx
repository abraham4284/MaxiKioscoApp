import React, { useEffect, useState } from "react";
import { Navbar } from "../../../components/Navbar";
import { useNegocios } from "../../../context/NegociosContext";
import { CardNegocio } from "../components/CardNegocio";
import { ModalNegocios } from "../components/ModalNegocios";
import { Spiner } from "../../../components/Spiner";

export const MiNegocioPage = () => {
  const { negocios, getNegocios, loading } = useNegocios();
  const [dataToEdit, setDataToEdit] = useState(null);

  useEffect(() => {
    getNegocios();
  }, []);

  return (
    <>
      {loading ? (
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-center">
              <Spiner />
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <CardNegocio data={negocios} setDataToEdit={setDataToEdit} />
              <ModalNegocios dataToEdit={dataToEdit} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
