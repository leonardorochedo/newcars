import api from '../../../utils/api';

// CONTEXT
import { useState, useEffect, useContext, createContext } from 'react';
const UserContext = createContext()
import { useAuth } from "../../../hooks/useAuth";

// RRD
import { Link } from "react-router-dom";

// CSS
import "./MyCars.css";

export function MyCars() {

    const { authenticated, register, login, deleteUser, editUser, logout } = useAuth() // pegando os dados de useAuth

    return (
        <UserContext.Provider value={{authenticated, register, login, deleteUser, editUser, logout}}>
            <MyCarsPage />
        </UserContext.Provider>
    )
}

function MyCarsPage() {
    const context = useContext(UserContext) // importanto o contexto

    return (
        <section className="container">
            {context.authenticated
            ? (
                <>
                    Meus Carros
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