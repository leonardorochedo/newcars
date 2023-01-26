import api from "../../../utils/api";

import { useState, useEffect } from "react";

import { useParams } from 'react-router-dom';

import "./CarView.css"
import { FiSmartphone } from "react-icons/fi";

// SWIPER
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

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
                    <div className="swiper">
                        <Swiper
                        modules={[Pagination, A11y]}
                        slidesPerView={1}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        >
                            {car.images[0] &&
                            <SwiperSlide className="swiperslide">
                            <div
                                className="car-swiper"
                                style={{
                                    backgroundImage: `url(http://localhost:5000//images/cars/${car.images[0]})`,
                                }}
                            ></div>
                            </SwiperSlide>
                            }
                            {car.images[1] &&
                            <SwiperSlide className="swiperslide">
                            <div
                                className="car-swiper"
                                style={{
                                    backgroundImage: `url(http://localhost:5000//images/cars/${car.images[1]})`,
                                }}
                            ></div>
                            </SwiperSlide>
                            }
                            {car.images[2] &&
                            <SwiperSlide>
                            <div
                                className="car-swiper"
                                style={{
                                    backgroundImage: `url(http://localhost:5000//images/cars/${car.images[2]})`,
                                }}
                            ></div>
                            </SwiperSlide>
                            }
                        </Swiper>
                    </div>
                    <div className="title-car">
                        <h1>{car.model}</h1>
                        <h1 className="price">R${car.price}</h1>
                    </div>
                    <h3 className="desc">Descrição do Veículo:</h3>
                    <div className="description">
                        <p>Modelo: {car.model}</p>
                        <p>Fabricante: {car.manufacturer}</p>
                        <p>Ano: {car.year}</p>
                        <p>Categoria: {car.category}</p>
                        <p>Modelo: {car.model}</p>
                        <p>{car.description}</p>
                    </div>
                    <div className="contact-owner">
                        <div className="user-info">
                            {car.user.image && (
                            <div className="user-image" style={{
                                backgroundImage: `url(http://localhost:5000//images/users/${car.user.image})`,
                            }}>
                            </div>
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