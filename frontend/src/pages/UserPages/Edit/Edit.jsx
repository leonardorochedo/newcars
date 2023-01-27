// CONTEXT
import { useState, useContext, createContext } from 'react';
const UserContext = createContext()
import { useAuth } from "../../../hooks/useAuth"

// RRD
import { Link, useParams } from "react-router-dom";
import api from '../../../utils/api';

// COMPONENT
import { Input } from "../../../components/Input/Input";
import { useEffect } from 'react';

export function Edit() {

    const { authenticated, register, login, deleteUser, logout } = useAuth() // pegando os dados de useAuth

    return (
        <UserContext.Provider value={{authenticated, register, login, deleteUser, logout}}>
            <EditPage />
        </UserContext.Provider>
    )
}

function EditPage() {

    const context = useContext(UserContext) // importanto o contexto
    const [user, setUser] = useState({})
    const [userAPI, setUserAPI] = useState({})
    const [preview, setPreview] = useState()
    const { id } = useParams()

    useEffect(() => {
        api.get(`/users/${id}`).then((response) => {
            setUserAPI(response.data.user)
        })
    }, [])

    function onFileChange(e) {
        setPreview(e.target.files[0]) // preview da image
        setUser({...user, [e.target.name]: e.target.files[0]}) // setando a image no perfil

        console.log(URL.createObjectURL(preview))
    }

    function handleChangeInput(e) {
        setUser({...user, [e.target.name]: e.target.value}) // definindo o preenchimento como key/value
    }

    function handleSubmit(e) {
        e.preventDefault()

        context.editUser(user)
    }

    return (
        <section className="container container-form">
            {context.authenticated
            ? (
                <>
                    <h1 className="title">Atualizando Perfil</h1>
                    {user.image && (
                        <div className="user-image" style={{
                            backgroundImage: `url(http://localhost:5000//images/users/${user.image})`,
                            }}>
                        </div>
                    )}
                    {preview && (
                        <img className='perfil' src={URL.createObjectURL(preview)} alt={user.name} />
                    )}
                    <form onSubmit={handleSubmit} className="form-container">
                        <Input text="Imagem" type="file" name="image" handleOnChange={onFileChange} />
                        <Input type="name" value={userAPI.name} name="name" id="name"  handleChangeInput={handleChangeInput} text="Nome" placeholder="Digite seu nome" />
                        <Input type="text" value={userAPI.phone} name="phone" id="phone"  handleChangeInput={handleChangeInput} text="Celular" placeholder="Digite sua número de celular" />
                        <Input type="email" value={userAPI.email} name="email" id="email"  handleChangeInput={handleChangeInput} text="Email" placeholder="Digite seu e-mail" />
                        <Input type="password" name="password" id="password"  handleChangeInput={handleChangeInput} text="Senha" placeholder="Digite sua senha" />
                        <Input type="password" name="confirmpassword" id="confirmpassword"  handleChangeInput={handleChangeInput} text="Confirme sua senha" placeholder="Confirme sua senha" />
                        <div className="form-buttons">
                            <input type="submit" value="Atualizar" />
                        </div>
                    </form>
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