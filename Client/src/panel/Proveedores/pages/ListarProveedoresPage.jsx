import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CardProveedores } from "../components/CardProveedores";
import { Navbar } from "../../../components/Navbar.jsx";
import { TableProveedores } from "../components/TableProveedores";
import { helpHttp } from "../../../helpers/helpHttp.js";

export const ListarProveedoresPage = () => {
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);

  let { get, post, put, deleted } = helpHttp();
  let url = "http://localhost:3000/api/proveedores";

  useEffect(() => {
    get(url).then((res) => {
      if (!res.error) {
        setDb(res);
        console.log(res);
        setError(null);
      } else {
        setDb(null);
        setError(res);
      }
    });
  }, [url]);

  const createData = (data) => {
    let options = {
      body: data,
      headers: { "Content-Type": "application/json" },
    };
    post(url, options).then((res) => {
      if (!res.error) {
        setDb([...db, res]);
        setError(null);
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.idProveedores}`;
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
      } else {
        setError(res);
      }
    });
  };

  const handleInputBusquedaProveedores = (e)=>{
      e.preventDefault();
      const searchInput = e.target.value.toLocaleLowerCase();
      if(searchInput === ""){
        get(url).then((res)=>{
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
        let endpoint = `${url}/${id}`;
        deleted(endpoint).then((res) => {
          if (!res.error) {
            let newData = db.filter((el) => el.idProveedores !== id);
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
        />
      </div>
    </>
  );
};
