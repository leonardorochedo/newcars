import api from "../../../utils/api";
import { BASE_URL } from "../../../utils/BASE_URL";

// CONTEXT
import { useState, useEffect, useContext  } from "react";
import { Context } from "../../../context/UserContext";

// RRD
import { Link, useParams } from "react-router-dom";

// CSS
import "./Perfil.css";
import userNoImage from "../../../assets/images/nopic.png";
import { RoundImage } from "../../../components/RoundImage/RoundImage";
import { FiLogOut, FiTrash2 } from "react-icons/fi";
import { HiOutlinePencilAlt } from "react-icons/hi";

export function Perfil() {

    const { authenticated, logout } = useContext(Context)

    const [user, setUser] = useState({})

    const { id } = useParams()

    useEffect(() => {
        api.get(`/users/${id}`).then((response) => {
            setUser(response.data.user)
        })
    }, [])

    return (
        <section className="container">
            {authenticated ? (
                <>
                <div className="user-perfil">
                    <h1 className="title">Gerenciamento de perfil</h1>
                    {user.image ? (
                        <RoundImage src={`${BASE_URL}/images/users/${user.image}`} alt={user.name} size="rem12" />
                    ) : (
                        <RoundImage src={userNoImage} alt={user.name} size="rem12" />
                    )}
                    <h2>{user.name}</h2>
                </div>
                <div className="user-links">
                    <Link to={`/users/edit/${user._id}`} className="user-link" ><HiOutlinePencilAlt />Editar Perfil</Link>
                    <p onClick={logout} className="user-link" ><FiLogOut />Sair</p>
                    <Link to={`/users/delete/${user._id}`} className="user-link delete-link" ><FiTrash2 />Excluir Conta</Link>
                </div>
                </>
            ) : (
                <>
                    <h1 className="title">Você não está logado!</h1>
                    <Link to="/login" className="link comeback" >Entre com sua conta.</Link>
                </>
            )}
        </section>
    );
}