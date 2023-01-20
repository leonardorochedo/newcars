// CONTEXT
import { useState, useContext, createContext } from 'react';
const UserContext = createContext()
import { useAuth } from "../../../hooks/useAuth"

// RRD
import { Link } from "react-router-dom";

// COMPONENT
import { Input } from "../../../components/Input/Input";

export function Login() {

    const { authenticated, register, login, logout } = useAuth() // pegando os dados de useAuth

    return (
        <UserContext.Provider value={{authenticated, register, login, logout}}>
            <LoginPage />
        </UserContext.Provider>
    )
}

function LoginPage() {

    const [user, setUser] = useState({})
    const context = useContext(UserContext) // importando o contexto

    function handleChangeInput(e) {
        setUser({...user, [e.target.name]: e.target.value}) // definindo o preenchimento como key/value
    }

    function handleSubmit(e) {
        e.preventDefault()

        context.login(user)
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