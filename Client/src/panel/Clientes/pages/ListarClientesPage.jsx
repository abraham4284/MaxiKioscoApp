import React, { useEffect, useState } from "react";
import { CardClientesComponents } from "../components/CardClientesComponents";
import { TableClientes } from "../components/TableClientes";
import { useClientes } from "../../../context/ClientesContext.jsx";

export const ListarClientesPage = () => {
  const [dataToEdit, setDataToEdit] = useState(null);
  const { clientes, getClientes } = useClientes();
  const [filterClientes, setFilterClientes] = useState([]);

  useEffect(() => {
    getClientes();
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    if (searchInput === "") {
      getClientes();
      setFilterClientes([]);
    } else {
      const filterClientes = clientes.filter((datos) => {
        return datos.Nombre.toLocaleLowerCase().includes(searchInput);
      });
      setFilterClientes(filterClientes);
    }
  };

  let dataClientes = filterClientes.length > 0 ? filterClientes : clientes;

  return (
    <>
      <div className="container">
        <CardClientesComponents
          handleInput={handleInput}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />

        <TableClientes data={dataClientes} setDataToEdit={setDataToEdit} />
      </div>
    </>
  );
};
