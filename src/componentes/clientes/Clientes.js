import React, { Fragment, useState, useEffect } from "react";

//Importing Axios client

import axiosClient from "../../config/axios.js";
import Cliente from "./Cliente.js";

import { Link } from "react-router-dom";

const Clientes = () => {
  const [clients, setClients] = useState([]);

  const apiQuery = async () => {
    const clientesQuery = await axiosClient.get("/clientes");
    setClients(clientesQuery.data);
  };

  useEffect(() => {
    apiQuery();
  }, [clients]);

  return (
    <Fragment>
      <h2>Clientes</h2>

      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul className="listado-clientes">
        {clients.map((client) => (
          <Cliente key={client._id} client={client} />
        ))}
      </ul>
    </Fragment>
  );
};

export default Clientes;
