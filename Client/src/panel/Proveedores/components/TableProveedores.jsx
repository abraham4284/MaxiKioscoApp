import React, { useEffect } from "react";
import { TableProveedoresRows } from "./TableProveedoresRows";
import { Spiner } from "../../../components/Spiner";
import { useProveedores } from "../../../context/ProveedoresContext";
import Swal from "sweetalert2";

export const TableProveedores = ({ data, setDataToEdit }) => {
  const { deleteProveedores, loading, getProveedores, error } =
    useProveedores();

  useEffect(() => {
    getProveedores();
  }, []);
  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>CUIT</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Domicilio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {loading ? (
                  <tr>
                    <td colSpan="3">
                      <Spiner />{" "}
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((datos) => (
                    <TableProveedoresRows
                      key={datos.idProveedores}
                      data={datos}
                      setDataToEdit={setDataToEdit}
                      deleteData={deleteProveedores}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="3"> No hay datos </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
