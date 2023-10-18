import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../layout/Spinner.js";
import axiosClient from "../../config/axios.js";

//Importing Components
import Producto from "./Producto.js";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsQuery = await axiosClient.get("/productos");
      setProductos(productsQuery.data);
    };

    fetchProducts();
  }, []);

  if (!productos.length) return <Spinner />;

  return (
    <Fragment>
      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map((producto) => (
          <Producto key={producto._id} producto={producto} />
        ))}
      </ul>
    </Fragment>
  );
};

export default Productos;
