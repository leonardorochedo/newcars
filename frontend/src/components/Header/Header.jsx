import api from "../../utils/api";
import { useState, useEffect, useContext, createContext } from 'react';
// CONTEXT
import { useAuth } from "../../hooks/useAuth"
const UserContext = createContext()

// STYLE
import "./Header.css";
import logo from "../../assets/images/header/logo.png";
import userNoImage from "../../assets/images/nopic.png";

// ICONS
import { IoMdMenu } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";

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

  const [user, setUser] = useState({_id: "", name: "", image: ""})

  useEffect(() => {
    api.get("/users/single").then((response) => {
      setUser({
        _id: response.data.user._id,
        name: response.data.user.name,
        image: response.data.user.image
      })
    });
  }, [])

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
          {context.authenticated ?
          <Link to={`/users/${user._id}`} className="link">
            <div className="user-header">
              {user.image ? (
                <div className="user-image" style={{
                  backgroundImage: `url(http://localhost:5000//images/users/${user.image})`,
                }}>
                </div>
              ) : (
                <img src={userNoImage} alt="Foto de perfil" className="perfil" />
              )}
              <p>{user.name.split(" ")[0].toUpperCase()}</p>
            </div>
          </Link>
          : 
          <Link to="/login" className="link">
            <span className="link">
              <FiLogIn size={24} color="#FFF" /><p>Entrar</p>
            </span>
          </Link>}
        </div>
      </header>
    </section>
  );
}
