import React from "react";
import { TableProveedoresRows } from "./TableProveedoresRows";
import { Spiner } from "../../../components/Spiner";

export const TableProveedores = ({ data, setDataToEdit, deleteData }) => {
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
                {
                    data.length > 0 ? (
                        data.map((datos) => (
                            <TableProveedoresRows
                              key={datos.idProveedores}
                              data={datos}
                              setDataToEdit={setDataToEdit}
                              deleteData={deleteData}
                            />
                          ))
                    ):
                    <tr>
                        <td colSpan="3"><Spiner/></td>
                    </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};