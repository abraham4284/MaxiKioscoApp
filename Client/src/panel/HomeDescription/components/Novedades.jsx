import React from "react";
import { color } from "../../../components/color";
import YouTubePlayer from "react-player/youtube";
import DOMPurify from "dompurify";

export const Novedades = ({ data }) => {
  return (
    <div>
      {data.length > 0 ? (
        data.map((el) => {
          return (
            <div key={el.id}>
              <div className="row">
                <div className="col mt-5 ">
                  <div className="cont-text ">
                    <h1>{el.title} - {el.fecha}</h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(el.descripcion),
                      }}
                    ></p>
                    <h3>Funcionalidades</h3>
                    {el.funcionalidades.map((data) => {
                      return (
                        <ul key={data.id}>
                          <li>
                            <b style={color.colorPrimary}> {data.title}</b>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(data.descripcion),
                              }}
                            ></p>
                          </li>
                        </ul>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-center mt-5">
                  <h3>Video explicativo</h3>
                </div>
                <div className="col d-flex justify-content-center mt-3">
                  <YouTubePlayer
                    url={el.youtubeURL}
                    controls
                    width={854}
                    height={480}
                  />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h3>Sin datos</h3>
      )}
    </div>
  );
};
