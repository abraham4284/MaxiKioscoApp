import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useClientes } from "../../../context/ClientesContext";
import { useRegistraciones } from "../../../context/RegistracionesContext";
import { CardTableRegistracionesCompleto } from "./cards/CardTableRegistracionesCompleto";
import { Spiner } from "../../../components/Spiner";
import { TableDetalleRegistracionesCompleto } from "./tables/TableDetalleRegistracionesCompleto";

export const InformeDetalleVentasCompleto = () => {
  const { id } = useParams();

  const {
    detalleRegistraciones,
    getIdRegistracionesDetalles,
    getIdRegistraciones,
    registraciones,
    loadingDetalles,
    loading: loadinRegistraciones,
    resetRegistraciones,
    resetDetalleRegistraciones,
    setLoading: setLoadingRegistraciones,
    setLoadingDetalles,
  } = useRegistraciones();

  const { clientes, getClientes, loading, resetClientes, setLoading } =
    useClientes();
  const [mostrarParaImprimir, setMostrarParaImprimir] = useState(false);

  const getFetchRegistracionesClientes = async (id) => {
    setLoading(true);
    setLoadingRegistraciones(true);
    setLoadingDetalles(true);

    resetClientes();
    resetDetalleRegistraciones();
    resetRegistraciones();

    await getIdRegistracionesDetalles(id);
    await getIdRegistraciones(id);
    await getClientes();
  };

  const clearUseEffet = () => {
    resetClientes();
    resetDetalleRegistraciones();
    resetRegistraciones();
  };

  useEffect(() => {
    getFetchRegistracionesClientes(id);
    return () => {
      clearUseEffet();
    };
  }, [id]);

 

  const { NFactura, Fecha, totalCosto, Total, idClientes } = registraciones;

  let ganancia = Total - totalCosto;

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

  return (
    <>
      {loading || loadinRegistraciones || loadingDetalles ? (
        <div className="container mt-5">
          <div className="row mt-5">
            <div className="col mt-5 d-flex justify-content-center">
              <Spiner />
            </div>
          </div>
        </div>
      ) : (
        <div className="container cont-comporobante">
          <CardTableRegistracionesCompleto
            loadinRegistraciones={loadinRegistraciones}
            loading={loading}
            NFactura={NFactura}
            Fecha={Fecha}
            clienteEncontrado={clienteEncontrado}
            totalCosto={totalCosto}
            Total={Total}
            ganancia={ganancia}
          />
          <TableDetalleRegistracionesCompleto
            loadingDetalles = { loadingDetalles}
            data = { detalleRegistraciones }
            mostrarParaImprimir = { mostrarParaImprimir }
          />
        </div>
      )}
    </>
  );
};
