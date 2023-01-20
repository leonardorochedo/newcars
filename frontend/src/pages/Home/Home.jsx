import api from "../../utils/api";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./Home.css";

export function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    api.get("/cars").then((response) => {
      setCars(response.data.cars);
    });
  }, []);

  return (
      <section className="container">
        <div className="home-text">
          <h1>Veja os veículos disponíveis!</h1>
        </div>
        <div className="cars-container">
          {cars.length > 0 &&
            cars.map((car) => (
              <div className="car-card" key={car._id}>
                <div
                  className="car-image"
                  style={{
                    backgroundImage: `url(http://localhost:5000//images/cars/${car.images[0]})`,
                  }}
                ></div>
                <div className="car-infos">
                  <div className="car-text">
                    <h3>{car.model}</h3>
                    <h4>Ano {car.year}</h4>
                    <p>R$ {car.price}</p>
                  </div>
                  <div className="user-info">
                    {car.user.image && (
                      <div className="user-image" style={{
                        backgroundImage: `url(http://localhost:5000//images/users/${car.user.image})`,
                      }}>
                      </div>
                    )}
                    <p>{car.user.name}</p>
                  </div>
                </div>
              </div>
            ))}
          {cars.length === 0 && (
            <p className="warning">Não há carros cadastrados ou disponíveis no momento 😞!</p>
          )}
        </div>
      </section>
  );
}
