import React, { useEffect } from "react";
import { TableProductosRows } from "./TableProductosRows";
import { Spiner } from "../../../components/Spiner";
import { formatearTotal } from "../../../helpers";

export const CardTableProductos = ({
  data,
  setDataToEdit,
  deleteProductos,
  loading,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>CodeBar</th>
          <th>img</th>
          <th>Descripcion</th>
          <th>precio-Costo</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Familia</th>
          <th>Tipo</th>
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
                <div
                  className="cont-btn"
                  style={{ display: "flex", gap: "5px" }}
                >
                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalProductos"
                    onClick={() => setDataToEdit(el)}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>

                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalModificarCantidadProducto"
                    onClick={() => setDataToEdit(el)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProductos(el.idProductos)}
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
      </tbody>
    </table>
  );
};
