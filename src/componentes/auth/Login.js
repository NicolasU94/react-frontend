import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../../config/axios.js";
import Swal from "sweetalert2";

import "./Login.css";
import { CRMContext } from "../../context/CRMContext.js";

const Login = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useContext(CRMContext);

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
      //Setting the Token in localStorage and in context
      localStorage.setItem("token", token);
      setAuth({
        token: token,
        auth: true,
      });
      Swal.fire("Login Correcto", "Has Iniciado Sesion", "success");
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        type: "error",
        title: "An error Ocurred",
        text: "There was an error please try again later",
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
        <div className="Signup">
          <p>
            Dont have an account?{" "}
            <Link to={"/signup"} className="Signup-Link">
              Click Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
