// import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon} from "leaflet";

//ajouter map indiquant localisation de l'activité

const DetailsPage = () => {
    const fakeData = {
        name: "Randonnée au Mont Blanc",
        description: "Découvrez les magnifiques paysages du Mont Blanc lors d'une randonnée guidée. Profitez de vues imprenables sur les sommets enneigés et explorez la faune et la flore locales.",
        location: "Chamonix-Mont-Blanc, France",
        coordinates: [45.9246705, 6.8727506],
        distance: "12 km",
        duration: "6 heures",
        difficulty: "Modérée",
        image: "https://via.placeholder.com/800x400", // Image de remplacement
    };

    const customIcon = new Icon({
        iconUrl: require("../img/icon.png"),
        iconSize: [38,38] // size of icon
    })

    return (
        <div className="container mt-5">
            <div className="card bg-light shadow-sm">
                <img src={fakeData.image} className="card-img-top" alt={fakeData.name} />
                <div className="card-body">
                    <h3 className="card-title text-primary mb-3">{fakeData.name}</h3>
                    <p className="card-text">{fakeData.description}</p>

                    <hr />

                    <div className="row">
                        
                        <div className="col-md-6">
                            <h5 className="text-secondary">Localisation :</h5>
                            <p>{fakeData.location}</p>
                        </div>
                        <div className="col-md-3">
                            <h5 className="text-secondary">Distance :</h5>
                            <p>{fakeData.distance}</p>
                        </div>
                        <div className="col-md-3">
                            <h5 className="text-secondary">Durée :</h5>
                            <p>{fakeData.duration}</p>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <h5 className="text-secondary">Difficulté :</h5>
                            <p>{fakeData.difficulty}</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <MapContainer 
                            center={fakeData.coordinates} 
                            zoom={15} 
                        >
                            <TileLayer 
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; 
                                <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                                <Marker position={fakeData.coordinates} icon={customIcon}>
                                    <Popup><p>{fakeData.name}</p></Popup>
                                </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;