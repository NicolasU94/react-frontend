import React, { Fragment, useState, useContext } from "react";
import axiosClient from "../../config/axios.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CRMContext } from "../../context/CRMContext.js";

const NuevoCliente = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(CRMContext);
  const [cliente, guardarCliente] = useState({
    name: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post("/clients", cliente, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
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
      .catch((error) => {
        if (error.response.status === 500) navigate("/login");
      });
    //Sending Request using Axios
  };

  const handleChange = (e) => {
    guardarCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
    // console.log(cliente);
  };

  const validateClient = () => {
    const { name, lastName, company, email, phone } = cliente;
    let validate =
      !name.length ||
      !lastName.length ||
      !company.length ||
      !email.length ||
      !phone.length;
    return validate;
  };

  if (!auth.auth && localStorage.getItem("token") === auth.token)
    navigate("/login");

  return (
    <Fragment>
      <h2>Nuevo Cliente</h2>

      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Client name"
            name="name"
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Lastname:</label>
          <input
            type="text"
            placeholder="Client lastname"
            name="lastName"
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Company:</label>
          <input
            type="text"
            placeholder="company Cliente"
            name="company"
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
          <label>Phone:</label>
          <input
            type="text"
            placeholder="Client Phone"
            name="phone"
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
