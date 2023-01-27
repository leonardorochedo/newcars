import api from "../../../utils/api";

// CONTEXT
import { useState, useEffect, useContext, createContext  } from "react";
import { useAuth } from "../../../hooks/useAuth"
const UserContext = createContext()

// RRD
import { Link, useParams } from "react-router-dom";

import "./Perfil.css";
import userNoImage from "../../../assets/images/nopic.png";
import { FiLogOut, FiTrash2 } from "react-icons/fi";
import { HiOutlinePencilAlt } from "react-icons/hi";


export function Perfil() {

    const { authenticated, register, login, logout } = useAuth() // pegando os dados de useAuth

    return (
        <UserContext.Provider value={{authenticated, register, login, logout}}>
            <PerfilPage />
        </UserContext.Provider>
    )
}

function PerfilPage() {

    const context = useContext(UserContext)

    const [user, setUser] = useState({})

    const { id } = useParams()

    useEffect(() => {
        api.get(`/users/${id}`).then((response) => {
            setUser(response.data.user)
        })
    }, [])

    return (
        <section className="container">
            {context.authenticated ? (
                <>
                <div className="user-perfil">
                    <h1 className="title">Gerenciamento de perfil</h1>
                    {user.image ? (
                        <div className="user-image" style={{
                            backgroundImage: `url(http://localhost:5000//images/users/${user.image})`,
                            }}>
                        </div>
                    ) : (
                        <img src={userNoImage} alt="Foto de perfil" className="perfil" />
                    )}
                    <h2>{user.name}</h2>
                </div>
                <div className="user-links">
                    <Link to={`/users/edit/${user._id}`} className="user-link" ><HiOutlinePencilAlt />Editar Perfil</Link>
                    <p onClick={context.logout} className="user-link" ><FiLogOut />Sair</p>
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