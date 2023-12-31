import React, { Fragment, useContext } from "react";

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
import EditarProducto from "./componentes/productos/EditarProducto.js";
import Producto from "./componentes/productos/Producto.js";
import NuevoProducto from "./componentes/productos/NuevoProducto.js";
import Pedidos from "./componentes/pedidos/Pedidos.js";
import NuevoPedido from "./componentes/pedidos/NuevoPedido.js";
import Login from "./componentes/auth/Login.js";
import Signup from "./componentes/auth/Signup.js";
import { CRMContext, CRMProvider } from "./context/CRMContext.js";
function App() {
  const [auth, setAuth] = useContext(CRMContext);
  return (
    <Router>
      <Fragment>
        <CRMProvider value={[auth, setAuth]}>
          <Header />
          <div className="grid contenedor contenido-principal">
            <Navegacion />
            <main className="caja-contenido col-9">
              <Routes>
                <Route path="/" element={<Clientes />} />
                <Route path="/clientes/nuevo" element={<NuevoCliente />} />
                <Route
                  path="/clientes/editar/:id"
                  element={<EditarCliente />}
                />
                <Route path="/productos" element={<Productos />} />
                <Route path="/productos/nuevo" element={<NuevoProducto />} />
                <Route
                  path="/productos/editar/:id"
                  element={<EditarProducto />}
                />
                <Route path="/pedidos" element={<Pedidos />} />
                <Route path="/pedidos/nuevo/:id" element={<NuevoPedido />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
          </div>
        </CRMProvider>
      </Fragment>
    </Router>
  );
}

export default App;
