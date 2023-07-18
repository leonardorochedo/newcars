import api from '../../../utils/api';
import { BASE_URL } from '../../../utils/BASE_URL';

// CONTEXT
import { useState, useEffect, useContext } from 'react';
import { Context } from "../../../context/UserContext";

// RRD
import { Link } from "react-router-dom";

// CSS
import "./MyCars.css";
import { RoundImage } from "../../../components/RoundImage/RoundImage";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlinePencilAlt } from "react-icons/hi";

import { toast } from "react-toastify";

export function MyCars() {
    const { authenticated } = useContext(Context) // importanto o contexto

    const [cars, setCars] = useState([])

    useEffect(() => {
        api.get("/vehicles/myvehicles").then((response) => {
          setCars(response.data.cars);
        });
      }, []);
    
      async function buttonUndoSell(id) {
        const data = await api.patch(`/vehicles/resale/${id}`).then((response) => {
            return response.data
        })

        window.location.reload(true)

        toast.success(data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
      }

      async function buttonSellCar(id) {
        const data = await api.patch(`/vehicles/sell/${id}`).then((response) => {
            return response.data
        })

        window.location.reload(true)

        toast.success(data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
      }

    return (
        <section className="container">
            {authenticated && (
                <h1 className="title">Meus veículos!</h1>
            )}
            {authenticated
            ? (
                <div className='cars-list'>
                {cars.length > 0 ? (
                    cars.map((car, index) => (
                        <>
                            <div className="car-item">
                                <div className="car-list" key={index}>
                                    <RoundImage 
                                        src={`${BASE_URL}/images/vehicle/${car.images[0]}`}
                                        alt={car.model}
                                        size="rem5 img"
                                    />
                                    <div className="car-list-info">
                                        <h3>{car.model}</h3>
                                        <h4>Ano {car.year}</h4>
                                        <p>{car.price}</p>
                                    </div>
                                    <div className="car-list-options">
                                        <Link to={`/cars/edit/${car.id}`}><HiOutlinePencilAlt size={20} color={"yellow"} /></Link>
                                        <Link to={`/cars/delete/${car.id}`}><FiTrash2 size={20} color={"red"} /></Link>
                                    </div>
                                </div>
                                <div className="car-options">
                                    <div className="car-options-sell">
                                        {car.available ? (
                                            <>
                                                <button onClick={() => buttonUndoSell(car.id)} disabled >ANUNCIAR NOVAMENTE</button>
                                                <button onClick={() => buttonSellCar(car.id)} >MARCAR COMO VENDIDO</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => buttonUndoSell(car.id)} >ANUNCIAR NOVAMENTE</button>
                                                <button onClick={() => buttonSellCar(car.id)} disabled >MARCAR COMO VENDIDO</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                ) : (
                    <p className="warning">Não há carros cadastrados!</p>
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