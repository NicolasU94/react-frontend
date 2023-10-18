import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios.js";
import Swal from "sweetalert2";
import FormBuscarProducto from "./FormBuscarProducto.js";
import FormProductoCantidad from "./FormProductoCantidad.js";

const NuevoPedido = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setclient] = useState({});
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchClientData = async () => {
      const myClient = await axiosClient.get(`/clientes/${id}`);
      setclient(myClient.data);
    };
    fetchClientData();

    updateTotal();
  }, [products]);

  const { nombre, apellido, email, empresa } = client;

  const readSearchData = (e) => {
    setSearch(e.target.value);
  };

  const reduceProds = (i) => {
    const currentProds = [...products];

    if (currentProds[i].cantidad === 0) return;
    currentProds[i].cantidad--;
    setProducts(currentProds);
  };

  const incrementProds = (i) => {
    const currentProds = [...products];
    currentProds[i].cantidad++;
    setProducts(currentProds);
  };

  const updateTotal = () => {
    if (products.length === 0) {
      setTotal(0);
      return;
    }
    let newTotal = 0;
    products.map(
      (producto) => (newTotal += producto.precio * producto.cantidad)
    );
    setTotal(newTotal);
  };

  const eliminateProduct = (id) => {
    const allProds = products.filter((prod) => prod.producto !== id);
    setProducts(allProds);
  };

  const searchProduct = async (e) => {
    e.preventDefault();
    const searchResult = await axiosClient.post(
      `/productos/busqueda/${search}`
    );
    if (searchResult.data[0]) {
      let resultProd = searchResult.data[0];

      resultProd.producto = searchResult.data[0]._id;
      resultProd.cantidad = 0;
      setProducts([...products, resultProd]);
    } else {
      Swal.fire({
        type: "error",
        title: "No Resultados",
        text: "No hay resultados",
      });
    }
  };

  const confirmOrder = async (e) => {
    e.preventDefault();

    const pedido = {
      cliente: id,
      pedido: products,
      total: total,
    };
    const res = await axiosClient.post("/pedidos", pedido);

    if (res.status === 201) {
      Swal.fire({
        type: "success",
        title: "Exito",
        text: "El pedido fue creado exitosamente",
      });
    } else {
      Swal.fire({
        type: "error",
        title: "Hubo un Error",
        text: "intente nuevamente mas tarde",
      });
    }
    navigate("/pedidos");
  };

  return (
    <Fragment>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Datos de Cliente</h3>
        <p>Nombre : {nombre}</p>
        <p>Apellido: {apellido}</p>
        <p>Empresa: {empresa}</p>
        <p>Email: {email}</p>
      </div>

      <FormBuscarProducto
        buscarProducto={searchProduct}
        leerDatosBusqueda={readSearchData}
      />

      <ul className="resumen">
        {products.map((producto, index) => (
          <FormProductoCantidad
            key={producto.producto}
            producto={producto}
            aumentarProductos={incrementProds}
            restarProductos={reduceProds}
            index={index}
            eliminarProductoPedido={eliminateProduct}
          />
        ))}
      </ul>
      <p className="total">
        Total a Pagar: <span>${total}</span>
      </p>

      {total > 0 ? (
        <form onSubmit={confirmOrder}>
          <input
            type="submit"
            className="btn btn-verde btn-block"
            value="Realizar Pedido"
          />
        </form>
      ) : null}
    </Fragment>
  );
};

export default NuevoPedido;
