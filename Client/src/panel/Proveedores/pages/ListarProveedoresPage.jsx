import React, { useEffect, useState } from "react";
import { CardProveedores } from "../components/CardProveedores";
import { TableProveedores } from "../components/TableProveedores";
import { useProveedores } from "../../../context/ProveedoresContext.jsx";

export const ListarProveedoresPage = () => {
  const [filterProveedoresData, setFilterProveedoresData] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);

  const { proveedores, getProveedores } = useProveedores();

  useEffect(() => {
    getProveedores();
  }, []);

  
  const handleInputBusquedaProveedores = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    if (searchInput === "") {
      setFilterProveedoresData(proveedores)
    } else {
      const filterProveedores = proveedores.filter((datos) => {
        return datos.Nombre.toLocaleLowerCase().includes(searchInput);
      });
      setFilterProveedoresData(filterProveedores);
    }
  };


  let proveedoresFinal = filterProveedoresData.length > 0 ? filterProveedoresData : proveedores;
  return (
    <>
      <div className="container">
        <CardProveedores
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          handleInputBusquedaProveedores={handleInputBusquedaProveedores}
        />
        <TableProveedores
          data={proveedoresFinal}
          setDataToEdit={setDataToEdit}
        />
      </div>
    </>
  );
};
