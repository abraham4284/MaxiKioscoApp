import React from "react";
import ReactPlayer from "react-player";
import { DescripcionSistema } from "./HomeDescription/DescripcionSistema";

export const HomePage = () => {
  return (
    <div className="container">
       <DescripcionSistema />
      <div className="row ">
        <div className="col-12 text-center mt-5">
           <h3>Video explicativo</h3>
        </div>
        <div className="col-12 d-flex justify-content-center mt-5 ">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            controls
            width={854}
            height={480}
          />
        </div>
      </div>
    </div>
  );
};
