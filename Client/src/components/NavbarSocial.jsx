import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { instagram, email, github, linkedin } from "../helpers/social";
import CV from '../../public/AbrahamApasFullStackDeveloper.pdf'

export const NavbarSocial = () => {

  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      {/* Container wrapper */}
      <div className="container">
        <Link className="navbar-brand text mb-1" to="/">
          <i className="fa-solid fa-code" style={{ color: "#00fca8" }}></i>{" "}
          <b>
            Abraham<b style={{ color: "#00fca8" }}>Tech</b>
          </b>
        </Link>

        {/* Toggle button */}
        <button
          className="navbar-toggler text-white"
          type="button"
          data-mdb-collapse-init
          data-mdb-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Collapsible wrapper */}
        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          {/* Left links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Registro
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link btn btn-cv" href={CV} download="AbrahamApasFullStackDeveloper">Descargar CV</a>
            </li>
          </ul>

          {/* Icons */}
          <ul className="navbar-nav d-flex flex-row nav-social">
            <li className="nav-item me-3 me-lg-0">
              <a className="nav-link" href={linkedin} target="_blank">
                <i className="fab fa-linkedin text-white"></i>
              </a>
            </li>
            <li className="nav-item me-3 me-lg-0">
              <a className="nav-link" href={github} target="_blank">
                <i className="fab fa-github text-white"></i>
              </a>
            </li>
            <li className="nav-item me-3 me-lg-0">
              <a className="nav-link" href={instagram} target="_blank">
                <i className="fab fa-instagram text-white"></i>
              </a>
            </li>
            
            <li className="nav-item me-3 me-lg-0">
              <a className="nav-link" href="#">
              <i className="fa-solid fa-briefcase text-white"></i>
              </a>
            </li>
          </ul>
        </div>
        {/* Collapsible wrapper */}
      </div>
      {/* Container wrapper */}
    </nav>
  );
};
