import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(CRMContext);

  const logout = () => {
    setAuth({
      token: "",
      auth: false,
    });
    localStorage.setItem("token", "");
    navigate("/login");
  };

  return (
    <header className="barra">
      <div className="contenedor">
        <div className="contenido-barra">
          <h1>CRM - Administrador de Clientes</h1>
          {auth.auth ? (
            <button type="button" className="btn btn-rojo" onClick={logout}>
              <i className="far fa-times-circle"> Logout</i>
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
};
export default Header;
