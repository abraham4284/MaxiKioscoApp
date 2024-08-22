import React, { useEffect, useState } from "react";
import { ModalUsuarios } from "./ModalUsuarios";
import { useAuth } from "../../../context/AuthContext";
import { Spiner } from "../../../components/Spiner";

const initialForm = {
  idUsuarios: null,
  Username: "",
  Password: "",
};

export const CardUsuarios = ({ dataToEdit, setDataToEdit }) => {
  const {
    usuarioIndividual,
    getUsuariosByUsername,
    usuario,
    loadingUserIndividual,
  } = useAuth();
  const { Username } = usuario;

  useEffect(() => {
    getUsuariosByUsername(Username);
  }, []);

  const { Username: User, img, Password } = usuarioIndividual;

  const ocultarPassword = Password ? "*".repeat(Password.length) : "";

  return (
    <>
      {loadingUserIndividual ? (
        <div className="container">
          <div className="row mt-5">
            <div className="col d-flex justify-content-center">
                <Spiner/>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="card mb-3 "
          style={{ maxWidth: "850px", margin: "50px auto 0 auto" }}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img src={img} className="img-fluid rounded-start" alt={User} />
            </div>
            <div className="col-md-8 d-flex">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="fa-solid fa-user"></i> {User}
                </h5>
                <p className="card-text">
                  <i className="fa-solid fa-key"></i> {ocultarPassword}
                </p>
                <button
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalUsuarios"
                  onClick={() => setDataToEdit(usuarioIndividual)}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
              </div>
            </div>
          </div>
          <ModalUsuarios dataToEdit={dataToEdit} />
        </div>
      )}
    </>
  );
};
