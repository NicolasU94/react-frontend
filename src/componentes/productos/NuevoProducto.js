import React, { useState, useContext, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios.js";
import { CRMContext } from "../../context/CRMContext.js";
import Swal from "sweetalert2";

const NuevoProducto = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(CRMContext);
  const [producto, setProducto] = useState({
    name: "",
    price: "",
  });

  const [file, setFile] = useState("");

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

  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", producto.name);
    formData.append("price", producto.price);
    formData.append("imagen", file);

    try {
      const res = await axiosClient.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (res.status === 201) {
        Swal.fire("Agregado Correctamente", res.data.mensage, "success");
      }
      navigate("/productos");
    } catch (error) {
      if (error.response.status === 500) navigate("/login");
      Swal.fire({
        type: "error",
        title: "Hubo un error",
        text: "Vuelva a intentarlo mas tarde",
      });
    }
  };

  if (!auth.auth && localStorage.getItem("token") === auth.token)
    navigate("/login");

  return (
    <Fragment>
      <h2>Nuevo Producto</h2>

      <form action="/products" method="POST" onSubmit={addProduct}>
        <legend>Fill Out all of the fields</legend>

        <div className="campo">
          <label>name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            onChange={readProductInfo}
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
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input type="file" name="imagen" onChange={readFile} />
        </div>

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Add Product" />
        </div>
      </form>
    </Fragment>
  );
};

export default NuevoProducto;
