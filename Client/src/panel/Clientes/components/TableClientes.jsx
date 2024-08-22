import React from "react";
import { TableClientesRows } from "./TableClientesRows";
import { Spiner } from "../../../components/Spiner";

export const TableClientes = ({ data, setDataToEdit, deleteData }) => {
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
                {
                    data.length > 0 ? (
                        data.map((datos, index) => (
                            <TableClientesRows
                              key={index}
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
