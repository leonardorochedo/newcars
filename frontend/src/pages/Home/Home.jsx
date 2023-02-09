import api from "../../utils/api";
import { BASE_URL } from "../../utils/BASE_URL";

import { useState, useEffect } from "react";

// RRD
import { Link } from "react-router-dom";

// CSS
import "./Home.css";
import userNoImage from "../../assets/images/nopic.png";
import { RoundImage } from "../../components/RoundImage/RoundImage";

export function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    api.get("/cars").then((response) => {
      setCars(response.data.cars);
    });
  }, []);

  return (
      <section className="container">
        <h1 className="title">Veja os veículos disponíveis!</h1>
        <div className="cars-container">
          {cars.length > 0 &&
            cars.map((car, index) => (
              <>
              {car.available && (
                <Link to={`/cars/${car._id}`} className="car-link" key={index}>
                <div className="car-card" key={car._id}>
                  <div
                    className="car-image"
                    style={{
                      backgroundImage: `url(${BASE_URL}/images/cars/${car.images[0]})`,
                    }}
                  ></div>
                  <div className="car-infos">
                    <div className="car-text">
                      <h3>{car.model}</h3>
                      <h4>Ano {car.year}</h4>
                      <p>R$ {car.price}</p>
                    </div>
                    <div className="user-info">
                      {car.user.image ? (
                        <RoundImage src={`${BASE_URL}/images/users/${car.user.image}`} alt={car.user.name} size="rem3" />
                      ) : (
                        <RoundImage src={userNoImage} alt={car.user.name} size="rem3" />
                      )}
                      <p>{car.user.name}</p>
                    </div>
                  </div>
                </div>
                </Link>
              )}
              </>
            ))}
          {cars.length === 0 && (
            <p className="warning">Não há carros cadastrados ou disponíveis no momento 😞!</p>
          )}
        </div>
      </section>
  );
}
