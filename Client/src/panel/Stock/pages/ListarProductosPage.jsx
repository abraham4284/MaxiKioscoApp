import React, { useEffect, useState } from "react";
import { Navbar } from "../../../components/Navbar.jsx";

import { CardProductos } from "../components/CardProductos.jsx";
import { CardTableProductos } from "../components/CardTableProductos.jsx";
import { helpHttp } from "../../../helpers/helpHttp.js";
import Swal from "sweetalert2";

export const ListarProductosPage = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);

  const { get, post, put, deleted } = helpHttp();

  const URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    get(`${URL}/productos`).then((res) => {
      if (!res.error) {
        setDb(res);
        setError(null);
      } else {
        setDb(null);
        setError(res);
      }
    });
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.toLocaleLowerCase();
    if (searchInput === "") {
      get(`${URL}/productos`).then((res) => {
        if (!res.error) {
          setDb(res);
        }
      });
    } else {
      const filterProductos = db.filter((datos) => {
        return datos.Descripcion.toLocaleLowerCase().includes(searchInput);
      });
      setDb(filterProductos);
    }
  };

  const createData = (data) => {
    let options = {
      body: data,
      headers: { "Content-Type": "application/json" },
    };
    post(`${URL}/productos`, options).then((res) => {
      if (!res.error) {
        setDb([...db, res]);
        setError(null);
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${URL}/productos/${data.idProductos}`;
    let options = {
      body: data,
      headers: { "Content-Type": "application/json" },
    };
    put(endpoint, options).then((res) => {
      if (!res.error) {
        let newData = db.map((el) =>
          el.idProductos === data.idProductos ? data : el
        );
        setDb(newData);
        setError(null);
        
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: `Eliminaras al provedor con el id: ${id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
    }).then((result) => {
      if (result.isConfirmed) {
        let endpoint = `${URL}/productos/${id}`;
        deleted(endpoint).then((res) => {
          if (!res.error) {
            let newData = db.filter((el) => el.idProductos !== id);
            setDb(newData);
          } else {
            setError(res);
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
        <CardProductos
          handleInput={handleInput}
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        <CardTableProductos
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
        />
      </div>
    </>
  );
};
