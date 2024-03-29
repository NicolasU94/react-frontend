import React, { Fragment, useState, useEffect, useContext } from "react";
import { CRMContext } from "../../context/CRMContext.js";
//Importing Axios client

import axiosClient from "../../config/axios.js";
import Cliente from "./Cliente.js";

import { Link, useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner.js";

const Clientes = () => {
  //Setting Up navigate
  const navigate = useNavigate();
  //Setting Up state
  const [clients, setClients] = useState([]);
  const [refresh, setRefresh] = useState(false);
  //Setting up context
  const [auth, setAuth] = useContext(CRMContext);

  const apiQuery = async () => {
    try {
      const clientesQuery = await axiosClient.get("/clients", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setClients(clientesQuery.data);
    } catch (error) {
      if (error.response.status === 500) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (auth.token !== "") {
      apiQuery();
    } else {
      navigate("/login");
    }
  }, [refresh]);

  const handleDelete = async () => {
    try {
      await apiQuery();
      setRefresh(true);
    } catch (error) {
      console.log(error);
    } finally {
      setRefresh(false);
    }
  };

  if (!auth.auth && localStorage.getItem("token") === auth.token)
    navigate("/login");

  if (!clients.length) return <Spinner />;

  return (
    <Fragment>
      <h2>Clientes</h2>

      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul className="listado-clientes">
        {clients.map((client) => (
          <Cliente key={client._id} client={client} onDelete={handleDelete} />
        ))}
      </ul>
    </Fragment>
  );
};

export default Clientes;
