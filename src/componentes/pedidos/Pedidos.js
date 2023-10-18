import React, { useEffect, useState, Fragment } from "react";
import axiosClient from "../../config/axios.js";
import DetallesPedido from "./DetallesPedido.js";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const checkApi = async () => {
      const res = await axiosClient.get("/pedidos");
      setPedidos(res.data);
    };
    checkApi();
  }, []);

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
