import React from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../config/axios.js";
import Swal from "sweetalert2";

const Producto = ({ producto }) => {
  const { _id, nombre, precio, imagen } = producto;

  const deleteProduct = (id) => {
    Swal.fire({
      title: "Esta Seguro?",
      text: "No sera posible revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.delete(`/productos/${id}`).then((res) => {
          if (res.status === 204) {
            Swal.fire(
              "Deleted!",
              "El Producto se ha borrado exitosamente",
              "success"
            );
          }
        });
      }
    });
  };

  return (
    <li class="producto">
      <div class="info-producto">
        <p class="nombre">{nombre}</p>
        <p class="precio">${precio} </p>
        {imagen ? <img src={`http://localhost:5500/${imagen}`} /> : null}
      </div>
      <div class="acciones">
        <a href="#" class="btn btn-azul">
          <i class="fas fa-pen-alt"></i>
          Editar Producto
        </a>

        <Link
          to={`/productos/editar/${_id}`}
          className="btn btn-verde nvo-cliente"
        >
          <i className="fas fa-plus-circle"></i>
          Nuevo Producto
        </Link>

        <button
          type="button"
          class="btn btn-rojo btn-eliminar"
          onClick={() => deleteProduct(_id)}
        >
          <i class="fas fa-times"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
};

export default Producto;
