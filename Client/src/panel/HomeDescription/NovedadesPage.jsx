import React from "react";
import { color } from "../../components/color";
import YoutubePlayer from "react-player/youtube";

export const NovedadesPage = () => {
  return (
    <section>
      <div className="row">
        <div className="col mt-5 ">
          <div className="cont-text ">
            <h1>Nuevas funcionalidades agregadas</h1>
            <p>
              Estas nuevas funcionalidades te ayudaran a gestionar tu negocio de
              una manera mas rapida y comoda a la hora de trabajar. <br />
              Estas funcionalidades fueron agregadas en el{" "}
              <b style={color.colorSecundary}>modulo de ventas</b>.
            </p>
            <h3>Funcionalidades</h3>
            <ol>
              <li className="mb-3">
                <b style={color.colorPrimary}>
                  Descarga e impresión de ticket de venta
                </b>
                : Al confirmar una venta, ahora puedes elegir entre dos
                opciones. Si descargas el ticket, el formato PDF está optimizado
                para <b>impresoras ticketeras</b>. Si decides visualizar el
                comprobante en pantalla,{" "}
                <b>se imprimirá en un formato A4 al presionar CTRL + P.</b>
              </li>
              <li className="mb-3">
                <b style={color.colorPrimary}>
                  Búsqueda y agregado de productos por nombre y código de barras
                </b>
                : Ahora puedes buscar un producto por su nombre y agregarlo al
                carrito.{" "}
                <b>
                  Al presionar F7, se abrirá una ventana donde podrás realizar
                  la búsqueda por nombre y añadir el producto directamente al
                  carrito
                </b>
                . Una vez en el carrito, también puedes modificar la cantidad de
                unidades.
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center mt-5">
          <h3>Video explicativo</h3>
        </div>
        <div className="col d-flex justify-content-center mt-3">
          <YoutubePlayer
            url={"https://youtu.be/dkCnc9AQsQY"}
            controls
            width={854}
            height={480}
          />
        </div>
      </div>
    </section>
  );
};
