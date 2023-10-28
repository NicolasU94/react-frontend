import React, { useEffect, useState, Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios.js";
import DetallesPedido from "./DetallesPedido.js";
import { CRMContext } from "../../context/CRMContext.js";
import Spinner from "../layout/Spinner.js";

const Pedidos = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [auth, setAuth] = useContext(CRMContext);

  const checkApi = async () => {
    try {
      const res = await axiosClient.get("/pedidos", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setPedidos(res.data);
    } catch (error) {
      if (error.response.status === 500) navigate("/login");
    }
  };

  useEffect(() => {
    if (auth.token !== "") {
      checkApi();
    } else {
      navigate("/login");
    }
  }, []);

  if (!auth.auth && localStorage.getItem("token") === auth.token)
    if (!pedidos.length) return <Spinner />;

  return (
    <Fragment>
      <h2>Pedidos</h2>

      <ul className="listado-pedidos">
        {pedidos.map((pedido) => (
          <DetallesPedido key={pedido._id} pedido={pedido} />
        ))}
      </ul>
    </Fragment>
  );
};

export default Pedidos;
