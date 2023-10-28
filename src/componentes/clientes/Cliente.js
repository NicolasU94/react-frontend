import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios.js";
import Swal from "sweetalert2";
import { CRMContext } from "../../context/CRMContext.js";

const Cliente = ({ client }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(CRMContext);

  const { _id, nombre, apellido, empresa, email, telefono } = client;

  const eliminarCliente = (id) => {
    if (auth.token !== "") {
      try {
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
              .delete(`/clientes/${id}`, {
                headers: {
                  Authorization: `Bearer ${auth.token}`,
                },
              })
              .then((res) => {
                Swal.fire(
                  "Deleted!",
                  "El Cliente se ha borrado exitosamente",
                  "success"
                );
                console.log(res);
              });
          }
        });
      } catch (error) {
        if (error.response.status === 500) navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">
          {nombre} {apellido}
        </p>
        <p className="empresa">{empresa}</p>
        <p>{email}</p>
        <p>Tel: {telefono}</p>
      </div>
      <div className="acciones">
        <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Cliente
        </Link>

        <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
          <i className="fas fa-plus"></i>
          Nuevo Pedido
        </Link>
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarCliente(_id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
};

export default Cliente;
