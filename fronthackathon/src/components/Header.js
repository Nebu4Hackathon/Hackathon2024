import React from 'react';
import { Link } from 'react-router-dom';
import plusImage from '../img/plus.jpg';
import villeImage from '../img/ville.jpg';
import mapImage from '../img/map.jpg';
import coImage from '../img/co.jpg';
const Header = () => {
    return (
        <header>
<header>
            <nav className="navbar navbar-dark bg-dark mb-4">
                <div className="container">
                    {/* Lien Home avec classe home */}
                    <Link to="/" className="nav-link home">
                        <img src={plusImage} alt="Home" className="nav-img" style={{ width: '5rem', height: '5rem' }} />
                    </Link>

                    {/* Lien Rechercher avec classe search */}
                    <Link to="/contact" className="nav-link search">
                        <img src={villeImage} alt="Rechercher" className="nav-img" style={{ width: '5rem', height: '5rem' }} />
                    </Link>

                    {/* Lien Carte avec classe map */}
                    <Link to="/map" className="nav-link map">
                        <img src={mapImage} alt="Carte" className="nav-img" style={{ width: '5rem', height: '5rem' }} />
                    </Link>

                    {/* Lien Connexion avec classe connexion */}
                    <Link to="/connect" className="nav-link connexion">
                        <img src={coImage} alt="Connexion" className="nav-img" style={{ width: '5rem', height: '5rem' }} />
                    </Link>
                </div>
            </nav>
        </header>
        </header>

    );
};

export default Header;