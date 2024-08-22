import React, { useEffect, useState } from "react";
import { Navbar } from "../../../components/Navbar.jsx";
import { CardClientesComponents } from "../components/CardClientesComponents";
import { TableClientes } from "../components/TableClientes";
import Swal from "sweetalert2";
import { helpHttp } from "../../../helpers/helpHttp.js";

export const ListarClientesPage = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  let { get, post, put, deleted } = helpHttp();

  const URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    get(`${URL}/cliente`).then((res) => {
      if (!res.error) {
        setDb(res);
        setError(null);
        setLoading(false)
      } else {
        setDb(null);
        setError(res);
        setLoading(false)
      }
    });
  }, []);


  const handleInput = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    if (searchInput === "") {
      get(`${URL}/cliente`).then((res) => {
        if (!res.error) {
          setDb(res);
        }
      });
    } else {
      const filterClientes = db.filter((datos) => {
        return datos.Nombre.toLocaleLowerCase().includes(searchInput);
      });
      setDb(filterClientes);
    }
  };



  const createData = (data) => {
    let options = {
      body: data,
      headers: { "Content-Type": "application/json" },
    };

    post(`${URL}/cliente`, options).then((res) => {
      if (!res.error) {
        setDb([...db, res]);
        setError(null);
        setLoading(false)
      } else {
        setError(res);
        setLoading(false)
      }
    });
  };

  const updateData = (data) => {
    let endpoind = `${URL}/cliente/${data.idClientes}`;
    let options = {
      body: data,
      headers: { "Content-Type": "application/json" },
    };
    put(endpoind, options).then((res) => {
      if (!res.error) {
        let newData = db.map((el) =>
          el.idClientes === data.idClientes ? data : el
        );
        setDb(newData);
        setError(null);
        setLoading(false)
      } else {
        setError(res);
        setLoading(false)
      }
    });
  };

  const deleteData = (id) => {
    let endpoind = `${URL}/cliente/${id}`;

    Swal.fire({
      title: "Estas seguro?",
      text: `Eliminaras al cliente con el id: ${id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        deleted(endpoind).then((res) => {
          if (!res.error) {
            let newData = db.filter((el) => el.idClientes !== id);
            setDb(newData);
            setLoading(false)
          } else {
            setError(res);
            setLoading(false)
          }
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

 

  return (
    <>
      <div className="container">
        <CardClientesComponents
          handleInput = {handleInput}
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          
        />

        <TableClientes
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          loading = {loading}
        />
      </div>
    </>
  );
};
