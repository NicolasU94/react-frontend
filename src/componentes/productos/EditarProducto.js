import React, { useEffect, useState, Fragment } from "react";
import axiosClient from "../../config/axios.js";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../layout/Spinner.js";
import Swal from "sweetalert2";

const EditarProducto = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
  });

  const [file, setFile] = useState("");

  //De-structuring the product

  const { nombre, precio, imagen } = producto;

  useEffect(() => {
    const fetchFromApi = async () => {
      const myProduct = await axiosClient.get(`/productos/${id}`);
      setProducto(myProduct.data);
    };
    fetchFromApi();
  }, []);

  const editProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("imagen", file);

    try {
      const res = await axiosClient.put(`/productos/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
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

  if (!nombre) return <Spinner />;

  return (
    <Fragment>
      <h2>Editar Producto</h2>

      <form action="/productos" method="POST" onSubmit={editProduct}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={readProductInfo}
            defaultValue={nombre}
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
            defaultValue={precio}
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
