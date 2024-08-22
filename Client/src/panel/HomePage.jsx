import React from "react";
import { DescripcionSistema } from "./HomeDescription/DescripcionSistema";
import { NavbarSocial } from "../components/NavbarSocial";

export const HomePage = () => {
  return (
    <> 
    <NavbarSocial/>
    <div className="container">
       <DescripcionSistema />
      <div className="row ">
        <div className="col-12 text-center mt-5">
           <h3>Video explicativo</h3>
        </div>
      </div>
    </div>
    </>
  );
};
