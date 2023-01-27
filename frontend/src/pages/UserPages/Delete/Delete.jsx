// CONTEXT
import { useContext, createContext  } from "react";
import { useAuth } from "../../../hooks/useAuth"
const UserContext = createContext()

// RRD
import { Link, useParams } from "react-router-dom";

export function Delete() {

    const { authenticated, register, login, deleteUser, logout } = useAuth() // pegando os dados de useAuth

    return (
        <UserContext.Provider value={{authenticated, register, login, deleteUser, logout}}>
            <DeletePage />
        </UserContext.Provider>
    )
}

function DeletePage() {

    const context = useContext(UserContext)

    const { id } = useParams()

    function buttonSubmit(e) {
        e.preventDefault()

        context.deleteUser(id)
    }

    return (
        <section className="container">
            {context.authenticated ? (
                <>
                    <h1 className="title">Tem certeza que deseja excluir sua conta?</h1>
                    <button className="delete-button" onClick={buttonSubmit}>Sim! Deletar</button>
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