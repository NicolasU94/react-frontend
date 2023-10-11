import React, { Fragment } from "react";

//* Importing Routing */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//** Importing Layout */
import Header from "./componentes/layout/Header.js";
import Navegacion from "./componentes/layout/Navegacion.js";

//**Importing Components */
import Clientes from "./componentes/clientes/Clientes.js";
import NuevoCliente from "./componentes/clientes/NuevoCliente.js";
import EditarCliente from "./componentes/clientes/EditarCliente.js";
import Productos from "./componentes/productos/Productos.js";
import EditarProducto from "./componentes/productos/EditarProductos.js";
import Producto from "./componentes/productos/Producto.js";
import NuevoProducto from "./componentes/productos/NuevoProducto.js";
import Pedidos from "./componentes/pedidos/Pedidos.js";
function App() {
  return (
    <Router>
      <Fragment>
        <Header />
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/" element={<Clientes />} />
              <Route path="/clientes/nuevo" element={<NuevoCliente />} />
              <Route path="/clientes/editar/:id" element={<EditarCliente />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/nuevo" element={<NuevoProducto />} />
              <Route
                path="/productos/editar/:id"
                element={<EditarProducto />}
              />
              <Route path="/pedidos" element={<Pedidos />} />
            </Routes>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
