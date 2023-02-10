import api from "../../../utils/api";
import { BASE_URL } from "../../../utils/BASE_URL";

import { useState, useEffect } from "react";

// RRD
import { useParams } from 'react-router-dom';

// CSS
import "./CarView.css";
import userNoImage from "../../../assets/images/nopic.png";
import { RoundImage } from "../../../components/RoundImage/RoundImage";
import { FiSmartphone } from "react-icons/fi";

export function CarView() {

    const [car, setCar] = useState({})
    const { id } = useParams()

    useEffect(() => {
        api.get(`/cars/${id}`).then((response) => {
            setCar(response.data.car)
        })
    }, [id])

    return (
        <>
            {car.model && (
                <section className="container">
                    <div className="car-view-images">
                        {car.images.map((image, index) => (
                            <img
                                className="car-image"
                                src={`${BASE_URL}/images/cars/${image}`}
                                alt={car.model}
                                key={index}
                            ></img>
                        ))}
                    </div>
                    <div className="title-car">
                        <h1>{car.model}</h1>
                        <h1 className="price">{car.price}</h1>
                    </div>
                    <h3 className="desc">Ficha técnica:</h3>
                    <div className="description">
                        <div className="card-desc">
                            <h3>Modelo:</h3>
                            <p>{car.model}</p>
                        </div>
                        <div className="card-desc">
                            <h3>Fabricante:</h3>
                            <p>{car.manufacturer}</p>
                        </div>
                        <div className="card-desc">
                            <h3>Ano:</h3>
                            <p>{car.year}</p>
                        </div>
                        <div className="card-desc">
                            <h3>Categoria:</h3>
                            <p>{car.category}</p>
                        </div>
                        <div className="card-desc">
                            <h3>Modelo:</h3>
                            <p>{car.model}</p>
                        </div>
                        <div className="description-text">
                            <h2>Descrição: </h2>
                            <p>{car.description}</p>
                        </div>
                    </div>
                    <div className="contact-owner">
                        <div className="user-info">
                            {car.user.image ? (
                                <RoundImage src={`http://localhost:5000/images/users/${car.user.image}`} alt={car.user.name} size="rem3" />
                            ) : (
                                <RoundImage src={userNoImage} alt={car.user.name} size="rem3" />
                            )}
                            <p>{car.user.name}</p>
                            <a href={`https://api.whatsapp.com/send?phone=+55${car.user.phone}&text=Olá ${car.user.name}, vi seu anuncio na NewCars e tenho interesse em seu veículo!`} target="_blank">
                                <div className="cell">
                                    <p><i>
                                    <FiSmartphone  size={20} />
                                    </i></p>
                                    <p><i>{car.user.phone}</i></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}