import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CardProveedores } from "../components/CardProveedores";
import { Navbar } from "../../../components/Navbar.jsx";
import { TableProveedores } from "../components/TableProveedores";
import { helpHttp } from "../../../helpers/helpHttp.js";

export const ListarProveedoresPage = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let { get, post, put, deleted } = helpHttp();
  const URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    get(`${URL}/proveedores`).then((res) => {
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

  const createData = (data) => {
    let options = {
      body: data,
      headers: { "Content-Type": "application/json" },
    };
    post(`${URL}/proveedores`, options).then((res) => {
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
    let endpoint = `${URL}/proveedores/${data.idProveedores}`;
    let options = {
      body: data,
      headers: { "Content-Type": "application/json" },
    };
    put(endpoint, options).then((res) => {
      if (!res.error) {
        let newData = db.map((el) =>
          el.idProveedores === data.idProveedores ? data : el
        );
        setDb(newData);
        setLoading(false)
      } else {
        setError(res);
        setLoading(false)

      }
    });
  };

  const handleInputBusquedaProveedores = (e)=>{
      e.preventDefault();
      const searchInput = e.target.value.toLocaleLowerCase();
      if(searchInput === ""){
        get(`${URL}/proveedores`).then((res)=>{
          if(!res.error){
            setDb(res)
          }
        })
      }else{
         const filterProveedores = db.filter((datos)=>{
           return datos.Nombre.toLocaleLowerCase().includes(searchInput)
         })
         setDb(filterProveedores);
      }
  }

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
        let endpoint = `${URL}/proveedores/${id}`;
        deleted(endpoint).then((res) => {
          if (!res.error) {
            let newData = db.filter((el) => el.idProveedores !== id);
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
        <CardProveedores
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          handleInputBusquedaProveedores = {handleInputBusquedaProveedores}
        />
        <TableProveedores
          data={db}
          setDataToEdit={setDataToEdit}
          deleteData={deleteData}
          loading = {loading}
        />
      </div>
    </>
  );
};
