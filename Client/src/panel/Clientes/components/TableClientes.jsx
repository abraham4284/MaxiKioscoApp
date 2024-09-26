import React from "react";
import { TableClientesRows } from "./TableClientesRows";
import { Spiner } from "../../../components/Spiner";
import { useClientes } from "../../../context/ClientesContext";

export const TableClientes = ({ data, setDataToEdit }) => {
  const { deleteClientes, loading } = useClientes();

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
                  <th>Apellido</th>
                  <th>Correo</th>
                  <th>Domicilio</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {loading ? (
                  <tr>
                    <td colSpan="3">
                      <Spiner />
                    </td>
                  </tr>
                ) : data ? (
                  data.map((datos) => (
                    <TableClientesRows
                      key={datos.idClientes}
                      data={datos}
                      setDataToEdit={setDataToEdit}
                      deleteData={deleteClientes}
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
