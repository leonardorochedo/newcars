import api from "../../../utils/api";

import { useState, useEffect } from "react";

// RRD
import { useParams } from 'react-router-dom';

// CSS
import "./CarView.css";
import userNoImage from "../../../assets/images/nopic.png";
import { RoundImage } from "../../../components/RoundImage/RoundImage";
import { FiSmartphone } from "react-icons/fi";

// SWIPER
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/a11y';

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
                        modules={[Pagination]}
                        slidesPerView={1}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        >
                            {car.images[0] &&
                            <SwiperSlide>
                            <div
                                className="car-swiper"
                                style={{
                                    backgroundImage: `url(http://localhost:5000//images/cars/${car.images[0]})`,
                                }}
                            ></div>
                            </SwiperSlide>
                            }
                            {car.images[1] &&
                            <SwiperSlide>
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
                                <RoundImage src={`http://localhost:5000//images/users/${car.user.image}`} alt={car.user.name} size="rem3" />
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