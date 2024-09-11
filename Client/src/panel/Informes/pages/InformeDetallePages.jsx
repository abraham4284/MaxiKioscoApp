import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { helpHttp } from "../../../helpers/helpHttp";
import { Navbar } from "../../../components/Navbar";
import { TableRegistracionesDetalles } from "../components/TableRegistracionesDetalles";
import { formatearTotal } from "../../../helpers/formatearTotal";
import { Spiner } from "../../../components/Spiner";

export const InformeDetallePages = () => {
  const { id } = useParams();
  const { get } = helpHttp();

  const [detalles, setDetalles] = useState([]);
  const [resgistraciones, setRegistraciones] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [errorRegistraciones, setErrorRegistraciones] = useState(null);
  const [error, setError] = useState(null);
  const [errorClientes, setErrorClientes] = useState(null);
  const [loading, setLoading] = useState(true);

  const URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const getDetallesRegistraciones = async (id) => {
      try {
        let endpoint = `${URL}/registracionesDetalles/${Number(id)}`;
        get(endpoint).then((res) => {
          if (res.error) {
            setDetalles(null);
            setError(res);
            setLoading(false);
          }
          setDetalles(res);
          setError(null);
          setLoading(false);
        });
        setDetalles([])
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };

    const getRegistraciones = async (id) => {
      try {
        let enpoint = `${URL}/registraciones/${id}`;
        get(enpoint).then((res) => {
          if (res.error) {
            setRegistraciones(null);
            setErrorRegistraciones(res);
            setLoading(false);
          }
          setRegistraciones(res);
          setErrorRegistraciones(null);
          setLoading(false);
        });
        setRegistraciones([])
      } catch (error) {
        console.log(error.message);
        setErrorRegistraciones(error.message);
      }
    };
    const getClientes = async () => {
      try {
        get(`${URL}/cliente`).then((res) => {
          if (res.error) {
            setClientes(null);
            setErrorClientes(res);
            setLoading(false);
          }
          setClientes(res);
          setErrorClientes(null);
          setLoading(false);
        });
        setClientes([])
      } catch (error) {
        console.log(error);
        setErrorClientes(error.message);
      }
    };

    getRegistraciones(id);
    getDetallesRegistraciones(id);
    getClientes();
  }, [id]);

  const { NFactura, Fecha, Total, idClientes } = resgistraciones;

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

  return (
    <>
      {loading ? (
        <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-center">
              <Spiner />
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
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
                          {detalles.map((datos) => (
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
        </div>
      )}
    </>
  );
};
