import { useContext } from "react";

// Style
import "./Header.css";
import logo from "../../assets/images/header/logo.png";
import { IoMdMenu } from "react-icons/io";

// Lib's
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Context
import { Context } from "../../context/UserContext";

export function Header() {
  // variavel que diz se o usuario esta autenticado via token
  const authenticated = useContext(Context)

  return (
    <section className="header">
      <header>
        <button>
          <IoMdMenu size={24} />
        </button>
        <a href="#">
          <img src={logo} alt="Logomarca" />
        </a>
        {authenticated ? <p>Logado</p> : <p>Entrar ou Cadastrar</p>}
      </header>
      
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
}
