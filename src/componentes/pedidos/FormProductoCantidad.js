import React from "react";

const FormProductoCantidad = (props) => {
  const {
    producto,
    restarProductos,
    aumentarProductos,
    index,
    eliminarProductoPedido,
  } = props;

  return (
    <li>
      <div className="texto-producto">
        <p className="name">{producto.name}</p>
        <p className="price">${producto.price}</p>
      </div>
      <div className="acciones">
        <div className="contenedor-cantidad">
          <i
            className="fas fa-minus"
            onClick={() => restarProductos(index)}
          ></i>
          <p>{producto.amount}</p>
          <i
            className="fas fa-plus"
            onClick={() => aumentarProductos(index)}
          ></i>
        </div>
        <button
          type="button"
          className="btn btn-rojo"
          onClick={() => eliminarProductoPedido(producto._id)}
        >
          <i className="fas fa-minus-circle"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  );
};

export default FormProductoCantidad;
