import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios.js";
import Swal from "sweetalert2";
import { CRMContext } from "../../context/CRMContext.js";

function DetallesPedido({ pedido, onDelete }) {
  const { client } = pedido;
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(CRMContext);

  const deleteOrder = (id) => {
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
          .delete(`/orders/${id}`, {
            headers: { Authorization: `Bearer ${auth.token}` },
          })
          .then((res) => {
            if (res.status === 204) {
              Swal.fire(
                "Deleted!",
                "El Pedido se ha borrado exitosamente",
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
    <li className="pedido">
      <div className="info-pedido">
        <p className="id">ID: {client._id}</p>
        <p className="nombre">
          Cliente: {client.name}, {client.lastName}
        </p>

        <div className="articulos-pedido">
          <p className="productos">Order Articles: </p>
          <ul>
            {pedido.order.map((articulo) => (
              <li key={pedido._id + articulo.product?._id}>
                <p>{articulo.product?.name}</p>
                <p>Precio: {articulo.product?.price}</p>
                <p>Cantidad: {articulo.amount}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="total">Total: {pedido.total} </p>
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => deleteOrder(pedido._id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Pedido
        </button>
      </div>
    </li>
  );
}

export default DetallesPedido;
