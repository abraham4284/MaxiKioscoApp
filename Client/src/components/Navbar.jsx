import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNegocios } from "../context/NegociosContext";

export const Navbar = () => {
  const { logout, usuario } = useAuth();
  const { negocios } = useNegocios();
  const location = useLocation();

  const negocioPath = location.pathname === "/crearNegocio" ? true : false

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary" hidden = {negocioPath}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand mt-2 mt-lg-0" to={"/panel/ventas"}>
            <i className="fa-solid fa-code" style={{ color: "#00fca8" }}></i>{" "}
            <b>
              Abraham<b style={{ color: "#00fca8" }}>Tech</b>
            </b>
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/panel/ventas" ? "active" : ""
                }`}
                to={"/panel/ventas"}
              >
                Ventas
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/panel/productos/listar" ? "active" : ""
                }`}
                to={"/panel/productos/listar"}
              >
                Stock
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/panel/informes" ? "active" : ""
                }`}
                to={"/panel/informes"}
              >
                Informes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/panel/clientes/listar" ? "active" : ""
                }`}
                to={"/panel/clientes/listar"}
              >
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/panel/proveedores/listar" ? "active" : ""
                }`}
                to={"/panel/proveedores/listar"}
              >
                Proveedores
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/panel/configuracion" ? "active" : ""
                }`}
                to={"/panel/configuracion"}
              >
                Configuración
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/panel/negocio" ? "active" : ""
                }`}
                to={"/panel/negocio"}
              >
                Mi Negocio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="" onClick={() => logout()}>
                <i
                  className="fa-solid fa-right-from-bracket"
                  style={{ color: "#d40c0c" }}
                ></i>{" "}
                Salir
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex ms-auto align-items-center">
          <span className="me-3">{usuario.Username}</span>
          <div className="dropdown">
            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="#"
              id="navbarDropdownMenuAvatar"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={usuario.img}
                className="rounded-circle"
                height="25"
                alt="Avatar"
                loading="lazy"
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuAvatar"
            >
              <li>
                <Link className="dropdown-item" to="/panel/configuracion">
                  Configuración
                </Link>
              </li>
              {negocios && (
                <li>
                  <Link className="dropdown-item" to="/panel/negocio">
                    Mi Negocio
                  </Link>
                </li>
              )}
              <li>
                <Link className="dropdown-item" to="#" onClick={() => logout()}>
                  <i
                    className="fa-solid fa-right-from-bracket"
                    style={{ color: "#d40c0c" }}
                  ></i>{" "}
                  Salir
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
