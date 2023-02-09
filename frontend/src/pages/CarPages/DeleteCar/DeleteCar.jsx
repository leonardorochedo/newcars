import api from "../../../utils/api";

// CONTEXT
import { useContext } from "react";
import { Context } from "../../../context/UserContext";

// RRD
import { Link, useParams } from "react-router-dom";

// API
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function DeleteCar() {

    const { authenticated } = useContext(Context)
    const navigate = useNavigate()
    const { id } = useParams()

    async function buttonSubmit() {
        let msgText = "Veículo deletado com sucesso!"

        await api.delete(`/cars/delete/${id}`).then((response) => {
            return response.data
        })

        navigate('/')
            
        toast.success(msgText, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        })
    }

    return (
        <section className="container">
            {authenticated ? (
                <>
                    <h1 className="title">Tem certeza que deseja deletar este veículo?</h1>
                    <button className="delete-button" onClick={buttonSubmit} >Sim! Deletar</button>
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