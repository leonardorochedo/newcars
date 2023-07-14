import api from "../../utils/api";
import { BASE_URL } from "../../utils/BASE_URL";

// CONTEXT
import { useState, useEffect, useContext } from 'react';
import { Context } from "../../context/UserContext";

// CSS
import "./Header.css";
import logo from "../../assets/images/header/logo.png";
import userNoImage from "../../assets/images/nopic.png";
import { RoundImage } from "../RoundImage/RoundImage";
import { IoMdMenu } from "react-icons/io";
import { MdClose, MdAttachMoney } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { AiOutlineCar } from "react-icons/ai";

// RRD
import { Link } from "react-router-dom";

export function Header() {
  const { authenticated } = useContext(Context)

  const [user, setUser] = useState({id: "", name: "", image: ""})
  const [navStatus, setNavStatus] = useState(false)

  useEffect(() => {
    api.get("/users/profile").then((response) => {
      setUser({
        id: response.data.data.id,
        name: response.data.data.name,
        image: response.data.data.image
      })
    });
  }, [authenticated])

  return (
    <section className="header">
      <header>
        <div className="button-header">
          {screen.width < 1000 && (
            <button onClick={() => setNavStatus(!navStatus)}>
              {navStatus
              ? <MdClose size={24} color="#FFF" />
              : <IoMdMenu size={24} color="#FFF" />}
            </button>
          )}
        </div>
        <Link to="/" className="logo-header">
          <img src={logo} alt="Logomarca" />
        </Link>
        <div className="button-header">
          {authenticated ?
          <Link to={`/users/${user.id}`} className="link">
            <div className="user-header">
              {user.image ? (
                <RoundImage src={`${BASE_URL}/images/users/${user.image}`} alt={user.name} size="rem3" />
              ) : (
                <RoundImage src={userNoImage} alt={user.name} size="rem3" />
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
        {screen.width > 1000 && (
            <div className="navbar-header-desk">
              <Link to="/cars/insert" className="link"><MdAttachMoney size={20} /><span>VENDA SEU VEÍCULO</span></Link>
              <Link to="/cars/mycars" className="link"><AiOutlineCar size={20} /><span>MEUS VEÍCULOS</span></Link>
            </div>
          )}
      </header>
      {navStatus && (
        <div className="navbar-header">
          <ul>
            <li>
              <Link to="/cars/insert" onClick={() => setNavStatus(!navStatus)} className="link"><MdAttachMoney size={22} /><span>VENDA SEU VEÍCULO</span></Link>
            </li>
            <li>
              <Link to="/cars/mycars" onClick={() => setNavStatus(!navStatus)} className="link"><AiOutlineCar size={22} /><span>MEUS VEÍCULOS</span></Link>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}
