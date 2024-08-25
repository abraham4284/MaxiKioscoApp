import React from "react";
import { DescripcionSistema } from "./HomeDescription/DescripcionSistema";
import { NavbarSocial } from "../components/NavbarSocial";
import YoutubePlayer from "react-player/youtube";
import maxiKioscoPng from '../../public/MaxiKiosco.png'
import { Footer } from "../components/Footer";

export const HomePage = () => {
  return (
    <>
      <NavbarSocial />
      <div className="container">
        <DescripcionSistema />
        <div className="row ">
          <div className="col-12 text-center mt-5">
            <h3>Video explicativo</h3>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center mt-3">
            <YoutubePlayer
              url={"https://youtu.be/SSb7xITRxxw?si=Z8ZpK9K6IJTt7Jsm"}
              controls
              width={854}
              height={480}
            />
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};
