import React, { Fragment, useState, useEffect, useContext } from "react";
import axiosClient from "../../config/axios.js";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CRMContext } from "../../context/CRMContext.js";

const EditarCliente = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(CRMContext);
  //Getting the ID
  const { id } = useParams();

  const [cliente, guardarCliente] = useState({
    name: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
  });

  const fetchUser = async () => {
    try {
      const fetchedClient = await axiosClient.get(`/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      guardarCliente(fetchedClient.data);
    } catch (error) {
      if (error.response.status === 500) navigate("/login");
    }
  };

  useEffect(() => {
    if (auth.token !== "") {
      fetchUser();
    } else {
      navigate("/login");
    }
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
    axiosClient
      .put(`/clients/${id}`, cliente, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
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
      })
      .catch((error) => {
        if (error.response.status === 500) navigate("/login");
      });
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
      <h2>Editar Cliente</h2>

      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Client name"
            name="name"
            onChange={handleChange}
            value={cliente.name}
          />
        </div>

        <div className="campo">
          <label>Lastname:</label>
          <input
            type="text"
            placeholder=" Client Lastname"
            name="lastName"
            onChange={handleChange}
            value={cliente.lastName}
          />
        </div>

        <div className="campo">
          <label>Company:</label>
          <input
            type="text"
            placeholder="Client company"
            name="company"
            onChange={handleChange}
            value={cliente.company}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Client Email"
            name="email"
            onChange={handleChange}
            value={cliente.email}
          />
        </div>

        <div className="campo">
          <label>Phone:</label>
          <input
            type="text"
            placeholder="Cliente Phone"
            name="phone"
            onChange={handleChange}
            value={cliente.phone}
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
