import React, { useEffect, useState } from "react";
import "../style/Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { NavbarSocial } from "../../components/NavbarSocial";

export const RegisterPage = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [img, setImg] = useState("");
  const navigation = useNavigate();
  const { register, isAutenticated, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Username || !Password) {
      Swal.fire({
        title: "Los campos no pueden ir vacios",
        text: "Todos los campos son obligatorios",
        icon: "error",
      });
      return;
    }
    const user = {
      Username: Username,
      Password: Password,
      img: img,
    };
    console.log(user, "datos que se envian");
    register(user);
  };

  useEffect(() => {
    if (isAutenticated) {
      navigation("/panel/crearNegocio");
    }
  }, [isAutenticated]);

  return (
    <>
      <NavbarSocial />
      <div className="wrapper fadeInDown">
        <div id="formContent">
          {/* Tabs Titles */}
          <h2 className="active">Registro</h2>
          {error && error.length > 0 && (
            <div className="alert alert-danger ">
              {error.map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="fadeIn second input-text"
              name="usuario"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
            />
            <input
              type="password"
              className="fadeIn second input-text"
              name="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
            <input
              type="text"
              className="fadeIn second input-text"
              name="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="URL de imagen"
            />
            <input
              type="submit"
              className="fadeIn fourth"
              value="Registrarse"
            />
          </form>

          {/* Remind Passowrd */}
          <div id="formFooter">
            Aun no tiene cuenta? <Link to={"/home/login"}>Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};
