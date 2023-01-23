// CONTEXT
import { useContext, createContext } from 'react';
import { useAuth } from "../../hooks/useAuth"
const UserContext = createContext()

// STYLE
import "./Header.css";
import logo from "../../assets/images/header/logo.png";

// ICONS
import { IoMdMenu } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";

// LIB'S
import { Link } from "react-router-dom";

export function Header() {

  const { authenticated, register, login, logout } = useAuth() // pegando os dados de useAuth

  return (
      <UserContext.Provider value={{authenticated, register, login, logout}}>
          <HeaderPage />
      </UserContext.Provider>
  )
}

function HeaderPage() {
  const context = useContext(UserContext)

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
          {context.authenticated ? <p onClick={context.logout}><span className="link"><FiLogOut size={24} color="#FFF" /><p>Sair</p></span></p> : <Link to="/login" className="link"><span className="link"><FiLogIn size={24} color="#FFF" /><p>Acessar</p></span></Link>}
        </div>
      </header>
    </section>
  );
}
