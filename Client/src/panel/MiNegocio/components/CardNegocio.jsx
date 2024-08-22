import React, { useEffect } from "react";
import "../styles/styles.css";
import { useNegocios } from "../../../context/NegociosContext";

export const CardNegocio = ({ data, setDataToEdit }) => {
  const { loading } = useNegocios();

  if(loading){
    return <h3>Cargando...</h3>
  }

  

  return (
    <>
      {data.map((el) => (
        <div
          className="card mb-3"
          style={{ maxWidth: "850px", margin: "50px auto 0 auto" }}
          key={el.idNegocios}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={el.img}
                className="img-fluid rounded-start"
                alt={el.Nombre}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{el.Nombre}</h5>
                <p className="card-text">{el.Descripcion}</p>
                <p className="card-text">
                  <small className="text-body-secondary">{el.Rubro}</small>
                </p>
                <button
                  className="btn btn-warning"
                  onClick={() => setDataToEdit(el)}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalNegocios"
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
