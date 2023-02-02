import api from '../../../utils/api';

// CONTEXT
import { useState, useEffect, useContext, createContext } from 'react';
const UserContext = createContext()
import { useAuth } from "../../../hooks/useAuth";

// RRD
import { Link } from "react-router-dom";

// CSS
import "./MyCars.css";
import { RoundImage } from "../../../components/RoundImage/RoundImage";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlinePencilAlt } from "react-icons/hi";

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

    const [cars, setCars] = useState([])

    useEffect(() => {
        api.get("/cars/mycars").then((response) => {
          setCars(response.data.cars);
        });
      }, []);
    

    return (
        <section className="container">
            <h1 className="title">Meus veículos!</h1>
            {context.authenticated
            ? (
                <div className='cars-list'>
                {cars.length > 0 ? (
                    cars.map((car, index) => (
                        <div className="car-list" key={index}>
                            <RoundImage 
                                src={`http://localhost:5000//images/cars/${car.images[0]}`}
                                alt={car.model}
                                size="rem5 img"
                            />
                            <div className="car-list-info">
                                <h3>{car.model}</h3>
                                <h4>Ano {car.year}</h4>
                                <p>R$ {car.price}</p>
                            </div>
                            <div className="car-list-options">
                                <Link to={`/cars/edit/${car._id}`}><HiOutlinePencilAlt size={20} color={"yellow"} /></Link>
                                <Link to={`/cars/delete/${car._id}`}><FiTrash2 size={20} color={"red"} /></Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="warning">Não há carros cadastrados ou disponíveis no momento 😞!</p>
                )}
                </div>
            ) : (
                <>
                    <h1 className="title">Você não está logado!</h1>
                    <Link to="/login" className="link comeback" >Entre com sua conta.</Link>
                </>
            )}
        </section>
    );
}