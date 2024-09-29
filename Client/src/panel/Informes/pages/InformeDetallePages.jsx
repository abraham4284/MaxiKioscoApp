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
    setLoading: setLoadingRegistraciones,
  } = useRegistraciones();

  const { clientes, getClientes, loading, setLoading } = useClientes();
  const [mostrarParaImprimir, setMostrarParaImprimir] = useState(false);

  const getFetchRegistracionesClientes = async (id) => {
    setLoadingRegistraciones(true);
    setLoading(true);

    await getIdRegistracionesDetalles(id);
    await getIdRegistraciones(id);
    await getClientes();

    setLoadingRegistraciones(false);
    setLoading(false);
  };

  useEffect(() => {
     getFetchRegistracionesClientes(id)
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

  console.log(loadinRegistraciones, "LoadingRegistraciones");
  console.log(loading, "Loading Clientes");

  return (
    <>
      {loading && loadinRegistraciones ? (
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-center">
              <Spiner />
            </div>
          </div>
        </div>
      ) : (
        <div className="container cont-comporobante">
          <h3 className="mt-5">Nº #{NFactura}</h3>
          <div className="row">
            <p className="mt-5">Fecha: {Fecha}</p>
            <p className="">Total: {formatearTotal(Total)}</p>
            <p className="">Cliente: {clienteEncontrado}</p>
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
                          {detalleRegistraciones.map((datos) => (
                            <TableRegistracionesDetalles
                              key={datos.idDetalleRegistraciones}
                              data={datos}
                            />
                          ))}
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
                  Abraham<b style={{ color: "#00fca8" }}>Tech</b>.com |
                  Soluciones Tecnologicas © 2024
                </b>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
