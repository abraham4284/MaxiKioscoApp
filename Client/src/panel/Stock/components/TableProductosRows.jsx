import React from "react";
import { formatearTotal } from "../../../helpers/formatearTotal";

export const TableProductosRows = ({ data, setDataToEdit, deleteData }) => {
  return (
    <>
      {data.length > 0 ? (
        data.map((el) => (
          <tr key={el.idProductos} className="">
            <td>{el.CodeBar}</td>
            <td>
              <img
                src={el.img}
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "1.5rem",
                }}
              />
            </td>
            <td> {el.Descripcion}</td>
            <td> {formatearTotal(el.precioCosto)} </td>
            <td> {formatearTotal(el.Precio)} </td>
            {el.tipoProducto === "Unidad" ? (
              <td> {parseInt(el.Stock)} </td>
            ) : (
              <td> {el.Stock} </td>
            )}
            <td>{el.Familia}</td>
            <td>{el.tipoProducto}</td>
            <td>
              <div className="cont-btn" style={{ display: "flex", gap: "5px" }}>
                <button
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalProductos"
                  onClick={() => setDataToEdit(el)}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteData(el.idProductos)}
                >
                  <i className="fa-solid fa-delete-left"></i>
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td>No hay datos</td>
        </tr>
      )}
    </>
  );
};
