import api from '../../../utils/api';

// CONTEXT
import { useState, useEffect, useContext, createContext } from 'react';
const UserContext = createContext()
import { useAuth } from "../../../hooks/useAuth";

// RRD
import { Link } from "react-router-dom";

// CSS
import "./InsertCar.css";

// COMPONENT
import { Input } from "../../../components/Input/Input";

// API
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function InsertCar() {

    const { authenticated, register, login, deleteUser, editUser, logout } = useAuth() // pegando os dados de useAuth

    return (
        <UserContext.Provider value={{authenticated, register, login, deleteUser, editUser, logout}}>
            <InsertCarPage />
        </UserContext.Provider>
    )
}

function InsertCarPage() {

    const context = useContext(UserContext) // importanto o contexto
    const navigate = useNavigate()
    const [car, setCar] = useState({})
    const [preview, setPreview] = useState([])

    const options = [
        "Carro",
        "Motocicleta",
        "Caminhonete",
        "Caminhão",
        "Outros"
    ]

    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setCar({...car, images: [...e.target.files]})
    }

    function handleChangeInput(e) {
        setCar({...car, [e.target.name]: e.target.value}) // definindo o preenchimento como key/value
    }

    function handleChangeSelect(e) {
        setCar({...car, category: e.target.options[e.target.selectedIndex].text})
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let msgText = 'Veículo criado com sucesso!'
        
        const formData = new FormData()

        // criando um formData pois como estamos mandando um array de imagens dentro de user ia acusar erro
        const carFormData = Object.keys(car).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < car[key].length; i++) {
                    formData.append(`images`, car[key][i])
                }
            } else {
                formData.append(key, car[key])
            }
        })

        formData.append('car', carFormData)

        try {
            const data = await api.post('/cars/insert', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // backend entender que esta indo uma imagem
                }
            }).then((response) => {
                return response.data
            })
            
            navigate('/')

            toast.success(msgText, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } catch (err) {
            msgText = err.response.data.message
            toast.error(msgText, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    return (
        <section className="container">
            {context.authenticated
            ? (
                <>
                    <h1 className="title">Vamos anunciar seu veículo!</h1>
                    <div className='preview-car-images'>
                        {preview.length > 0 && 
                        preview.map((image, index) => (
                            <img 
                                src={URL.createObjectURL(image)}
                                alt={car.name} key={`${car.name}+${index}`}
                            />
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="form-container">
                        <Input type="file" name="images" multiple={true} handleChangeInput={onFileChange} text="Imagens" />
                        <Input type="text" name="model" id="model" handleChangeInput={handleChangeInput} text="Título" placeholder="Digite seu título" />
                        <Input type="text" name="manufacturer" id="manufacturer" handleChangeInput={handleChangeInput} text="Fabricante" placeholder="Digite a fabricante" />
                        <Input type="number" name="year" id="year" handleChangeInput={handleChangeInput} text="Ano" placeholder="Digite o ano de fabricação" />
                        <Input type="text" name="price" id="price" handleChangeInput={handleChangeInput} text="Valor" placeholder="Digite o valor" />
                        <div className="form-input">
                            <label htmlFor="description">Descrição:</label>
                            <textarea className='form-entry' name="description" id="description" onChange={handleChangeInput} cols="30" rows="10" placeholder="Digite uma descrição ao seu veículo..." ></textarea>
                        </div>
                        <div className="form-input">
                            <label htmlFor="category">Selecione a categoria:</label>
                            <select className='form-entry' name="category" id="category" onChange={handleChangeSelect}>
                                {options.map((option) => (
                                    <>
                                        {option == "Outros" ? (
                                            <option value={option} selected>{option}</option>
                                        ) : (
                                            <option value={option}>{option}</option>
                                        )}
                                    </>
                                ))}
                            </select>
                        </div>
                        <div className="form-buttons">
                            <input type="submit" value="Criar" />
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