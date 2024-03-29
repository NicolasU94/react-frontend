import React, { useEffect, useState, useContext, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios.js";
import Swal from "sweetalert2";
import FormBuscarProducto from "./FormBuscarProducto.js";
import FormProductoCantidad from "./FormProductoCantidad.js";
import { CRMContext } from "../../context/CRMContext.js";

const NuevoPedido = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setclient] = useState({});
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [auth, setAuth] = useContext(CRMContext);

  const fetchClientData = async () => {
    try {
      const myClient = await axiosClient.get(`/clients/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setclient(myClient.data);
    } catch (error) {
      if (error.response.status === 500) navigate("/login");
    }
  };

  useEffect(() => {
    if (auth.token !== "") {
      fetchClientData();
      updateTotal();
    } else {
      navigate("/login");
    }
  }, [products]);

  const { name, lastName, email, company } = client;

  const readSearchData = (e) => {
    setSearch(e.target.value);
  };

  const reduceProds = (i) => {
    const currentProds = [...products];

    if (currentProds[i].amount === 0) return;
    currentProds[i].amount--;
    setProducts(currentProds);
  };

  const incrementProds = (i) => {
    const currentProds = [...products];
    currentProds[i].amount++;
    setProducts(currentProds);
  };

  const updateTotal = () => {
    if (products.length === 0) {
      setTotal(0);
      return;
    }
    let newTotal = 0;
    products.map((prod) => (newTotal += prod.price * prod.amount));
    setTotal(newTotal);
  };

  const eliminateProduct = (id) => {
    const allProds = products.filter((prod) => prod.product !== id);
    setProducts(allProds);
  };

  const searchProduct = async (e) => {
    e.preventDefault();
    try {
      const searchResult = await axiosClient.post(
        `/products/search/${search}`,
        null,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      if (searchResult.data[0]) {
        let resultProd = searchResult.data[0];

        resultProd.product = searchResult.data[0]._id;
        resultProd.amount = 0;
        console.log(resultProd);
        setProducts([...products, resultProd]);
      } else {
        Swal.fire({
          type: "error",
          title: "No Resultados",
          text: "No hay resultados",
        });
      }
    } catch (error) {
      if (error.response.status === 500) navigate("/login");
    }
  };

  const confirmOrder = async (e) => {
    e.preventDefault();

    const order = {
      client: id,
      order: products,
      total: total,
    };
    try {
      const res = await axiosClient.post("/orders", order, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      if (res.status === 201) {
        Swal.fire({
          type: "success",
          title: "Exito",
          text: "El pedido fue creado exitosamente",
        });
      } else {
        Swal.fire("Success", "Order was created successfully", "success");
      }
      navigate("/pedidos");
    } catch (error) {
      if (error.response.status === 500) navigate("/login");
    }
  };

  if (!auth.auth && localStorage.getItem("token") === auth.token)
    navigate("/login");

  return (
    <Fragment>
      <h2>Nuevo Pedido</h2>

      <div className="ficha-cliente">
        <h3>Client Data</h3>
        <p>Name : {name}</p>
        <p>Lastname: {lastName}</p>
        <p>Company: {company}</p>
        <p>Email: {email}</p>
      </div>

      <FormBuscarProducto
        buscarProducto={searchProduct}
        leerDatosBusqueda={readSearchData}
      />

      <ul className="resumen">
        {products.map((producto, index) => (
          <FormProductoCantidad
            key={producto.product}
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
