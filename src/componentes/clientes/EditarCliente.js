import React, { Fragment, useState, useEffect } from "react";
import axiosClient from "../../config/axios.js";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditarCliente = () => {
  const navigate = useNavigate();
  //Getting the ID
  const { id } = useParams();

  const [cliente, guardarCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  const fetchUser = async () => {
    const fetchedClient = await axiosClient.get(`/clientes/${id}`);
    guardarCliente(fetchedClient.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    guardarCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Sending Request using Axios
    axiosClient.put(`/clientes/${id}`, cliente).then((res) => {
      console.log(res);
      if (res.data.code === 11000) {
        console.log(res);
        Swal.fire({
          type: "error",
          title: "Hubo un error",
          text: "El cliente ya se encuentra registrado",
        });
      } else {
        Swal.fire(
          "Exito",
          "La informacion se actualizo correctamente",
          "success"
        );
      }

      navigate("/");
      // history.push("/");
    });
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
      <h2>Editar Cliente</h2>

      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={handleChange}
            value={cliente.nombre}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            onChange={handleChange}
            value={cliente.apellido}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={handleChange}
            value={cliente.empresa}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={handleChange}
            value={cliente.email}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="text"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={handleChange}
            value={cliente.telefono}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Cambios"
            disabled={validateClient()}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default EditarCliente;
