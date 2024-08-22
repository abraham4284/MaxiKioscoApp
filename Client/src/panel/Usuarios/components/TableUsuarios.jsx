import React from 'react'
import { TableUsuariosRows } from './TableUsuariosRows'

export const TableUsuarios = ({ data, setDataToEdit, deleteData }) => {
    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="card">

                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            {
                                data.map(datos => (
                                    <TableUsuariosRows
                                        key={datos.idUsuarios}
                                        data={datos}
                                        setDataToEdit = {setDataToEdit}
                                        deleteData = {deleteData}
                                    />
                                ))
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
