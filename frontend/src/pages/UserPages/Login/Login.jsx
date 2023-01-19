// CONTEXT
import { useState, useContext } from 'react';
import { UserContext } from "../../../context/UserContext";

import { Link } from "react-router-dom";

import { Input } from "../../../components/Input/Input";

export function Login() {

    const [user, setUser] = useState({})
    const login = useContext(UserContext) // importnado a funcao de login do context

    function handleChangeInput(e) {
        setUser({...user, [e.target.name]: e.target.value}) // definindo o preenchimento como key/value
    }

    function handleSubmit(e) {
        e.preventDefault()

        // context.login(user) // utilizando o login do context
        console.log(login)
    }

    return (
        <section className="container container-form">
            <h1>Entre com sua conta!</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <Input type="email" name="email" id="email"  handleChangeInput={handleChangeInput} text="Email" placeholder="Digite seu e-mail" />
                <Input type="password" name="password" id="password"  handleChangeInput={handleChangeInput} text="Senha" placeholder="Digite sua senha" />
                <div className="form-buttons">
                    <input type="submit" value="Entrar" />
                    <p>Não tem uma conta? <Link to="/register" className="link"><span>Clique aqui.</span></Link></p>
                </div>
            </form>
        </section>
    );
}