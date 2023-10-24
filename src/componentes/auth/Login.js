import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios.js";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const readData = (e) => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const processLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/login", credentials);
      //Extracting the Token
      const { token } = res.data;
      //Setting the Token in localStorage
      localStorage.setItem("token", token);
      Swal.fire("Login Correcto", "Has Iniciado Sesion", "success");
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        type: "error",
        title: "Hubo un error",
        text: error.response.data.mensaje,
      });
    }
  };
  return (
    <div>
      <h2>Iniciar Sesion</h2>
      <div className="contenedor-formulario">
        <form onSubmit={processLogin}>
          <div className="campo">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Ingresa Tu email"
              required
              onChange={readData}
            />
          </div>

          <div className="campo">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={readData}
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-verde btn-block"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
