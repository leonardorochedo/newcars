import api from '../../../utils/api';
import { BASE_URL } from '../../../utils/BASE_URL';

// CONTEXT
import { useState, useEffect, useContext } from 'react';
import { Context } from "../../../context/UserContext";

// RRD
import { Link, useParams } from "react-router-dom";

// COMPONENT
import { RoundImage } from '../../../components/RoundImage/RoundImage';
import { Input } from "../../../components/Input/Input";

// MASK
import { IMaskInput } from 'react-imask';

export function Edit() {

    const { authenticated, editUser } = useContext(Context) // importanto o contexto
    const [user, setUser] = useState({})
    const [clickable, setClickable] = useState(false)
    const [preview, setPreview] = useState()
    const { id } = useParams()

    useEffect(() => {
        api.get(`/users/${id}`).then((response) => {
            setUser(response.data)
        })
    }, [])

    useEffect(() => {
        if (user.image && user.password && user.confirmpassword) {
            setClickable(true)
        } else {
            setClickable(false)
        }
    }, [user])
    
    function onFileChange(e) {
        setPreview(e.target.files[0]) // preview da image
        setUser({...user, [e.target.name]: e.target.files[0]}) // setando a image no perfil
    }

    function handleChangeInput(e) {
        setUser({...user, [e.target.name]: e.target.value}) // definindo o preenchimento como key/value
    }

    function handleSubmit(e) {
        e.preventDefault()

        editUser(user, id)
    }

    return (
        <section className="container container-form">
            {authenticated
            ? (
                <>
                    <h1 className="title">Atualizando Perfil</h1>
                    {(user.image || preview) && (
                        <RoundImage src={
                            preview
                            ? URL.createObjectURL(preview)
                            : `${BASE_URL}/images/users/${user.image}`}
                            alt={user.name}
                            size="rem12" />
                    )}
                    <form onSubmit={handleSubmit} className="form-container">
                        <Input type="file" name="image" handleChangeInput={onFileChange} text="Imagem" />
                        <Input type="name" value={user.name} name="name" id="name"  handleChangeInput={handleChangeInput} text="Nome" placeholder="Digite seu nome" />
                        <div className="form-input">
                            <label htmlFor="phone">Celular:</label>
                            <IMaskInput mask={"(00) 000000000"} value={user.phone} name="phone" id="phone" onChange={handleChangeInput} placeholder="Digite seu celular" className="imask" />
                        </div>
                        <Input type="email" value={user.email} name="email" id="email"  handleChangeInput={handleChangeInput} text="Email" placeholder="Digite seu e-mail" />
                        <Input type="password" name="password" id="password"  handleChangeInput={handleChangeInput} text="Senha" placeholder="Digite sua senha" />
                        <Input type="password" name="confirmpassword" id="confirmpassword"  handleChangeInput={handleChangeInput} text="Confirme sua senha" placeholder="Confirme sua senha" />
                        <div className="form-buttons">
                            {clickable
                            ?
                            <input type="submit" value="Atualizar" />
                            :
                            <input className='submit-disabled' type="submit" value="Atualizar" disabled/>
                            }
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