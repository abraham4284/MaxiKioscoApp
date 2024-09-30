import React, { useEffect, useState } from "react";
import { TableProductosRegistros } from "../TableProductosRegistros";
import { useProductos } from "../../../../context/ProductosContext";


export const InformesStockCritico = ({ setDataToEdit }) => {
  const [stockCri, setStockCri] = useState("10");
  const { productos, getProductos } = useProductos();
  

  useEffect(()=>{
    getProductos()
  },[])
  const handleChangeStockCritico = (e) => {
    setStockCri(e.target.value);
  };

  const filterStockCritico = productos.filter((datos) => {
    const stockValue = parseInt(stockCri, 10);
    if (isNaN(stockValue)) return true;
    return datos.Stock < stockValue;
  });

  return (
    <div className="col-sm-12">
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: "#4e73df", color: "white" }}
        >
          Informe de Stock Critico
          <input
            type="number"
            className="form-control form-control-sm"
            style={{
              maxWidth: "60px",
              display: "initial",
              marginLeft: "15px",
            }}
            value={stockCri}
            onChange={handleChangeStockCritico}
          />
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <div className="table-responsive">
                <table className="table ">
                  <thead>
                    <tr>
                      <th>CodeBar</th>
                      <th>Descripcion</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Familia</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {stockCri.length > 0 ? (
                      filterStockCritico.length > 0 ? (
                        filterStockCritico.map((datos) => (
                          <TableProductosRegistros
                            key={datos.idProductos}
                            data={datos}
                            setDataToEdit={setDataToEdit}
                          />
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">No hay stock critico</td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td colSpan="3">Ingrese un valor</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
