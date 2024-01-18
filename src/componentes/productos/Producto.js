import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios.js";
import Swal from "sweetalert2";
import { CRMContext } from "../../context/CRMContext.js";

const Producto = ({ producto, onDelete }) => {
  const navigate = useNavigate();
  const { _id, name, price, imagen } = producto;
  const [auth, setAuth] = useContext(CRMContext);

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
        axiosClient
          .delete(`/products/${id}`, {
            headers: { Authorization: `Bearer ${auth.token}` },
          })
          .then((res) => {
            if (res.status === 204) {
              Swal.fire(
                "Deleted!",
                "El Producto se ha borrado exitosamente",
                "success"
              );
            }
          })
          .catch((error) => {
            if (error.response.status === 500) navigate("/login");
          });
        onDelete && onDelete();
      }
    });
  };

  return (
    <li class="producto">
      <div class="info-producto">
        <p class="nombre">{name}</p>
        <p class="precio">${price} </p>
        {imagen ? <img src={`http://localhost:5500/${imagen}`} /> : null}
      </div>
      <div class="acciones">
        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
          <i class="fas fa-pen-alt"></i>
          Editar Producto
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
