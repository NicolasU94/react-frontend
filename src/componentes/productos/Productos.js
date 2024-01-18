import React, { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../layout/Spinner.js";
import axiosClient from "../../config/axios.js";
import { CRMContext } from "../../context/CRMContext.js";

//Importing Components
import Producto from "./Producto.js";

const Productos = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [auth, setAuth] = useContext(CRMContext);

  const fetchProducts = async () => {
    try {
      const productsQuery = await axiosClient.get("/products", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setProductos(productsQuery.data);
    } catch (error) {
      if (error.response.status === 500) navigate("/login");
    }
  };

  useEffect(() => {
    if (auth.token !== "") {
      fetchProducts();
    } else {
      navigate("/login");
    }
  }, [refresh]);

  const handleDelete = async () => {
    try {
      await fetchProducts();
      setRefresh(true);
    } catch (error) {
      console.log(error);
    } finally {
      setRefresh(false);
    }
  };

  if (!auth.auth && localStorage.getItem("token") === auth.token)
    navigate("/login");

  if (!productos.length) return <Spinner />;

  return (
    <Fragment>
      <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Producto
      </Link>

      <ul className="listado-productos">
        {productos.map((producto) => (
          <Producto
            key={producto._id}
            producto={producto}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default Productos;
