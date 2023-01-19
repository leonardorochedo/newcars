import { useContext } from "react";

// Style
import "./Header.css";
import logo from "../../assets/images/header/logo.png";

// Icons
import { IoMdMenu } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";

// Lib's
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Context
import { UserContext } from "../../context/UserContext";

export function Header() {
  // variavel que diz se o usuario esta autenticado via token
  const authenticated = useContext(UserContext)
  const logout = useContext(UserContext)

  return (
    <section className="header">
      <header>
        <div className="button-header">
          <button>
            <IoMdMenu size={24} color="#FFF" />
          </button>
        </div>
        <Link to="/">
          <img src={logo} alt="Logomarca" />
        </Link>
        <div className="button-header">
          {authenticated ? <p onClick={logout}>Logout</p> : <Link to="/login" className="link"><span className="link"><FiLogIn size={24} color="#FFF" /><p>Acessar</p></span></Link>}
        </div>
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
