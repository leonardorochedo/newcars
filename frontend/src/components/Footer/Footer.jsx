import "./Footer.css";

import logo from "../../assets/images/footer/logo.png";

import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer>
            <Link to="/" className="link">
                <img src={logo} alt="Logo" />
            </Link>
            <div className="social-medias">
                <p>Onde seu carro tem o valor que merece!</p>
                <cite>@2023 NewCars</cite>
            </div>
        </footer>
    );
}