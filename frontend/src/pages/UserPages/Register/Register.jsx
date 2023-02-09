// CONTEXT
import { useState, useContext } from 'react';

// CONTEXT
import { Context } from "../../../context/UserContext";

// RRD
import { Link } from "react-router-dom";

// COMPONENT
import { Input } from "../../../components/Input/Input";

export function Register() {

    const [user, setUser] = useState({})
    const { authenticated, register } = useContext(Context) // importanto o contexto

    function handleChangeInput(e) {
        setUser({...user, [e.target.name]: e.target.value}) // definindo o preenchimento como key/value
    }

    function handleSubmit(e) {
        e.preventDefault()

        register(user)
    }

    return (
        <section className="container container-form">
            {authenticated
            ? (
                <>
                    <h1 className="title">Você já está logado!</h1>
                    <Link to="/" className="link comeback" >Voltar para a página inicial.</Link>
                </>
            ) : (
                <>
                    <h1 className="title">Registre sua conta!</h1>
                    <form onSubmit={handleSubmit} className="form-container">
                        <Input type="name" name="name" id="name"  handleChangeInput={handleChangeInput} text="Nome" placeholder="Digite seu nome" />
                        <Input type="text" name="phone" id="phone"  handleChangeInput={handleChangeInput} text="Celular" placeholder="Digite sua número de celular" />
                        <Input type="email" name="email" id="email"  handleChangeInput={handleChangeInput} text="Email" placeholder="Digite seu e-mail" />
                        <Input type="password" name="password" id="password"  handleChangeInput={handleChangeInput} text="Senha" placeholder="Digite sua senha" />
                        <Input type="password" name="confirmpassword" id="confirmpassword"  handleChangeInput={handleChangeInput} text="Confirme sua senha" placeholder="Confirme sua senha" />
                        <div className="form-buttons">
                            <input type="submit" value="Registrar" />
                            <p>Já tem uma conta? <Link to="/login" className="link"><span>Clique aqui.</span></Link></p>
                        </div>
                    </form>
                </>
            )}
        </section>
    );
}