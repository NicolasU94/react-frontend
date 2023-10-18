import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios.js";
import Swal from "sweetalert2";

const NuevoProducto = () => {
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
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

    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("imagen", file);

    try {
      const res = await axiosClient.post("/productos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        Swal.fire("Agregado Correctamente", res.data.mensage, "success");
      }
      navigate("/productos");
    } catch (error) {
      console.log(error);
      Swal.fire({
        type: "error",
        title: "Hubo un error",
        text: "Vuelva a intentarlo mas tarde",
      });
    }
  };

  return (
    <Fragment>
      <h2>Nuevo Producto</h2>

      <form action="/productos" method="POST" onSubmit={addProduct}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={readProductInfo}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            min="0.00"
            step="1"
            placeholder="Precio"
            onChange={readProductInfo}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input type="file" name="imagen" onChange={readFile} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
          />
        </div>
      </form>
    </Fragment>
  );
};

export default NuevoProducto;
