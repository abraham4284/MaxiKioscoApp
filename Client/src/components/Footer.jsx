import React from "react";
import './styles.css'
import { github, instagram, linkedin, portafolio } from "../helpers/social";
import CV from '../../public/AbrahamApasFullStackDeveloper.pdf'

export const Footer = () => {
  
  return (
    <div className="footer-basic mt-5">
    <footer>
      <div className="social">
        <a href={linkedin} target="_blank"><i className="fa-brands fa-linkedin"></i></a>
        <a href={github} target="_blank"><i className="fa-brands fa-github"></i></a>
        <a href={instagram} target="_blank"><i className="fa-brands fa-instagram"></i></a>
        <a href={portafolio} target="_blank"><i className="fa-solid fa-briefcase"></i></a>
      </div>
      <ul className="list-inline">
        <li className="list-inline-item"><a href={portafolio} target="_blank">Portafolio</a></li>
        <li className="list-inline-item"><span >abraham4284@hotmail.com</span></li>
        <li className="list-inline-item"><a href={CV} download="AbrahamApasFullStackDeveloper">Descargar CV</a></li>
        <li className="list-inline-item"><a href={github} target="_blank">Github</a></li>
        
      </ul>
      <p className="copyright"> <i className="fa-solid fa-code" style={{color:"#00fca8"}}></i> <b>Abraham<b style={{color:"#00fca8"}}>Tech</b>.com | Soluciones Tecnologicas © 2024</b></p>
    </footer>
  </div>
  );
};
