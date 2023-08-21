import React, { Fragment, useState } from "react";
import axiosClient from "../../config/axios.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NuevoCliente = () => {
  const navigate = useNavigate();

  const [cliente, guardarCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    //Sending Request using Axios
    axiosClient
      .post("/clientes", cliente)
      .then((res) => {
        if (res.data.code === 11000) {
          console.log(res);
          Swal.fire({
            type: "error",
            title: "Hubo un error",
            text: "El cliente ya se encuentra registrado",
          });
        } else {
          console.log(res.data);
          Swal.fire("Success", res.data.message, "success");
        }

        navigate("/");
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    guardarCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
    // console.log(cliente);
  };

  const validateClient = () => {
    const { nombre, apellido, empresa, email, telefono } = cliente;
    let validate =
      !nombre.length ||
      !apellido.length ||
      !empresa.length ||
      !email.length ||
      !telefono.length;
    return validate;
  };

  return (
    <Fragment>
      <h2>Nuevo Cliente</h2>

      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="text"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={handleChange}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validateClient()}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default NuevoCliente;
