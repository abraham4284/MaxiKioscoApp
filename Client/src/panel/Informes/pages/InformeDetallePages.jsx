import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TableRegistracionesDetalles } from "../components/TableRegistracionesDetalles";
import { formatearTotal } from "../../../helpers/formatearTotal";
import { Spiner } from "../../../components/Spiner";
import { useRegistraciones } from "../../../context/RegistracionesContext";
import { useClientes } from "../../../context/ClientesContext";

export const InformeDetallePages = () => {
  const { id } = useParams();

  const {
    detalleRegistraciones,
    getIdRegistracionesDetalles,
    getIdRegistraciones,
    registraciones,
    loading: loadinRegistraciones,
  } = useRegistraciones();

  const { clientes, getClientes, loading } = useClientes();
  const [mostrarParaImprimir, setMostrarParaImprimir] = useState(false);

  const getFetchRegistracionesClientes = async (id) => {
    await getIdRegistracionesDetalles(id);
    await getIdRegistraciones(id);
    await getClientes();
  };

  useEffect(() => {
    getFetchRegistracionesClientes(id);
  }, [id]);

  const { NFactura, Fecha, Total, idClientes } = registraciones;

  let clienteEncontrado = "";

  if (idClientes === null) {
    clienteEncontrado = "CONSUMIDOR FINAL";
  } else {
    const data = clientes.filter((el) => el.idClientes === idClientes);
    if (data.length > 0) {
      const { Apellido, Nombre } = data[0];
      clienteEncontrado = `${Apellido} ${Nombre}`;
    } else {
      clienteEncontrado = "CONSUMIDOR FINAL ";
    }
  }

  useEffect(() => {
    const handleBeforePrint = () => {
      setMostrarParaImprimir(true);
    };

    const handleAfterPrint = () => {
      setMostrarParaImprimir(false);
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  // console.log(loadinRegistraciones,'Soy loadingReg')

  return (
    <>
      <div className="container cont-comporobante">
        <h3 className="mt-5">
          {loadinRegistraciones ? "Nº# Cargando..." : `Nº #${NFactura}`}
        </h3>
        <div className="row">
          <p className="mt-5">
            {loadinRegistraciones ? "Fecha: Cargando..." : `Fecha: ${Fecha}`}
          </p>
          <p className="">
            {loadinRegistraciones
              ? "Total: Cargando..."
              : `Total: ${formatearTotal(Total)}`}
          </p>
          <p className="">
            {loading ? "Cliente: Cargando..." : `Cliente: ${clienteEncontrado}`}
          </p>
        </div>

        <div className="row">
          <div className="col-12 mt-3">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-12">
                  <div className="">
                    <table className="table table-sm table-hover table-light">
                      <thead>
                        <tr>
                          <th>Descripcion</th>
                          <th>Cantidad</th>
                          <th>PrecioU</th>
                          <th>SubTotal</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        <TableRegistracionesDetalles
                          data={detalleRegistraciones}
                        />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {mostrarParaImprimir && (
          <div className="row text-center mt-5">
            <p className="copyright">
              {" "}
              <i
                className="fa-solid fa-code"
                style={{ color: "#00fca8" }}
              ></i>{" "}
              <b>
                Abraham<b style={{ color: "#00fca8" }}>Tech</b>.com | Soluciones
                Tecnologicas © 2024
              </b>
            </p>
          </div>
        )}
      </div>
    </>
  );
};
