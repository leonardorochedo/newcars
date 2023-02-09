// CONTEXT
import { useContext  } from "react";
import { Context } from "../../../context/UserContext";

// RRD
import { Link, useParams } from "react-router-dom";

export function Delete() {

    const { authenticated, deleteUser } = useContext(Context)

    const { id } = useParams()

    function buttonSubmit(e) {
        e.preventDefault()

        deleteUser(id)
    }

    return (
        <section className="container">
            {authenticated ? (
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