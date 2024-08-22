import React, { useEffect, useState } from "react";
import "../style/Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

export const LoginPage = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const navigation = useNavigate();
  const { login, isAutenticated, error } = useAuth();

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
    };
    login(user);
  };

  useEffect(() => {
    if (isAutenticated) {
      navigation("/ventas");
    }
  }, [isAutenticated]);

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        {/* Tabs Titles */}
        <h2 className="active">Login</h2>
        {
          error && error.length > 0 && (
            <div className="alert alert-danger mt-3">
                {
                  error.map((err,index)=>(
                    <p key={index}>{err}</p>
                  ))
                }
            </div>
          )
        }
       
        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="fadeIn second input-text"
            name="username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
          />
          <input
            type="password"
            className="fadeIn second input-text"
            name="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <input type="submit" className="fadeIn fourth" value="Login" />
        </form>
       

        {/* Remind Passowrd */}
        <div id="formFooter">
          Aun no tiene cuenta? <Link to={"/home/register"}>Registrarse</Link>
        </div>
      </div>
    </div>
  );
};
