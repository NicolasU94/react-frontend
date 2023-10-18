import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../config/axios.js";
import Swal from "sweetalert2";
import FormBuscarProducto from "./FormBuscarProducto.js";
import FormProductoCantidad from "./FormProductoCantidad.js";

const NuevoPedido = (props) => {
  const { id } = useParams();

  const [client, setclient] = useState({});
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchClientData = async () => {
      const myClient = await axiosClient.get(`/clientes/${id}`);
      setclient(myClient.data);
    };
    fetchClientData();
  }, []);

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
      console.log(resultProd);
    } else {
      Swal.fire({
        type: "error",
        title: "No Resultados",
        text: "No hay resultados",
      });
    }

    console.log(searchResult);
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
          />
        ))}
      </ul>
      <div className="campo">
        <label>Total: </label>
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          readonly="readonly"
        />
      </div>
      <div className="enviar">
        <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
      </div>
    </Fragment>
  );
};

export default NuevoPedido;
