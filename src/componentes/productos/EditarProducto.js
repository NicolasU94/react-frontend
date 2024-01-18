import React, { useEffect, useState, useContext, Fragment } from "react";
import axiosClient from "../../config/axios.js";
import { useParams, useNavigate, isRouteErrorResponse } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext.js";
import Spinner from "../layout/Spinner.js";
import Swal from "sweetalert2";

const EditarProducto = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(CRMContext);
  const [producto, setProducto] = useState({
    name: "",
    price: "",
    imagen: "",
  });

  const [file, setFile] = useState("");

  //De-structuring the product

  const { name, price, imagen } = producto;

  const fetchFromApi = async () => {
    try {
      const myProduct = await axiosClient.get(`/products/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setProducto(myProduct.data);
    } catch (error) {
      if (error.response.status === 500) navigate("/login");
    }
  };

  useEffect(() => {
    if (auth.token !== "") {
      fetchFromApi();
    } else {
      navigate("/login");
    }
  }, []);

  const editProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", producto.name);
    formData.append("price", producto.price);
    formData.append("imagen", file);

    try {
      const res = await axiosClient.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (res.status === 200) {
        Swal.fire("Agregado Correctamente", res.data.message, "success");
      }
      navigate("/productos");
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) navigate("/login");
      Swal.fire({
        type: "error",
        title: "Hubo un error",
        text: "Vuelva a intentarlo mas tarde",
      });
    }
  };

  const readProductInfo = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const readFile = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  if (!auth.auth && localStorage.getItem("token") === auth.token)
    navigate("/login");

  if (!name) return <Spinner />;

  return (
    <Fragment>
      <h2>Edit Product</h2>

      <form action="/products" method="POST" onSubmit={editProduct}>
        <legend>Fill Out all of the fields</legend>

        <div className="campo">
          <label>name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            onChange={readProductInfo}
            defaultValue={name}
          />
        </div>

        <div className="campo">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            min="0.00"
            step="1"
            placeholder="price"
            onChange={readProductInfo}
            defaultValue={price}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {imagen ? (
            <img
              src={`http://localhost:5500/${imagen}`}
              alt="imagen"
              width="300"
            ></img>
          ) : null}
          <input type="file" name="imagen" onChange={readFile} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Editar Producto"
          />
        </div>
      </form>
    </Fragment>
  );
};

export default EditarProducto;
