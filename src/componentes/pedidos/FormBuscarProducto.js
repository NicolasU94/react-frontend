import React, { useState, useEffect } from "react";

const FormBuscarProducto = (props) => {
  const { buscarProducto, leerDatosBusqueda } = props;
  return (
    <form onSubmit={buscarProducto}>
      <legend>Busca un Producto y agrega una cantidad</legend>

      <div class="campo">
        <label>Productos:</label>
        <input
          type="text"
          placeholder="Nombre Productos"
          name="productos"
          onChange={leerDatosBusqueda}
        />
      </div>
      <input
        type="submit"
        className="btn btn-azul btn-block"
        value="Buscar Productos"
      />
    </form>
  );
};

export default FormBuscarProducto;
