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
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="col-md">
                                
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
                        </div>
                        <div className="col-md-5 row justify-content-center">
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
        </div>
    );
};

export default DetailsPage;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; // Pour obtenir l'ID depuis l'URL
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { Icon } from "leaflet";
// import axios from 'axios'; // Pour effectuer les requêtes HTTP

// const DetailsPage = () => {
//     const { id } = useParams(); // Récupère l'ID depuis l'URL
//     const [activityDetails, setActivityDetails] = useState(null); // Stocke les détails de l'activité
//     const [loading, setLoading] = useState(true); // Indique si les données sont en cours de chargement
//     const [error, setError] = useState(null); // Pour gérer les erreurs éventuelles

//     useEffect(() => {
//         // Fonction pour récupérer les détails de l'activité depuis l'API
//         const fetchActivityDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/api/activity/id/${id}`);
//                 setActivityDetails(response.data);
//             } catch (err) {
//                 setError('Erreur lors de la récupération des détails de l\'activité');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchActivityDetails();
//     }, [id]);

//     // Icône personnalisée pour le marqueur
//     const customIcon = new Icon({
//         iconUrl: require("../img/icon.png"),
//         iconSize: [38, 38] // taille de l'icône
//     });

//     if (loading) {
//         return <div>Chargement...</div>; // Affichage en attendant les données
//     }

//     if (error) {
//         return <div>{error}</div>; // Affichage en cas d'erreur
//     }

//     if (!activityDetails) {
//         return <div>Activité introuvable</div>; // Si aucune activité n'est trouvée
//     }

//     return (
//         <div className="container mt-5">
//             <div className="card bg-light shadow-sm">
//                 <img src={activityDetails.image || "https://via.placeholder.com/800x400"} className="card-img-top" alt={activityDetails.name} />
//                 <div className="card-body">
//                     <h3 className="card-title text-primary mb-3">{activityDetails.name}</h3>
//                     <p className="card-text">{activityDetails.description}</p>

//                     <hr />

//                     <div className="row">
//                         <div className="col-md-6">
//                             <h5 className="text-secondary">Localisation :</h5>
//                             <p>{activityDetails.location}</p>
//                         </div>
//                         <div className="col-md-3">
//                             <h5 className="text-secondary">Distance :</h5>
//                             <p>{activityDetails.distance}</p>
//                         </div>
//                         <div className="col-md-3">
//                             <h5 className="text-secondary">Durée :</h5>
//                             <p>{activityDetails.duration}</p>
//                         </div>
//                     </div>

//                     <div className="row mt-3">
//                         <div className="col-md-6">
//                             <h5 className="text-secondary">Difficulté :</h5>
//                             <p>{activityDetails.difficulty}</p>
//                         </div>
//                     </div>

//                     <div className="row justify-content-center">
//                         <MapContainer center={activityDetails.coordinates} zoom={15}>
//                             <TileLayer 
//                                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                                 attribution='&copy; 
//                                 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                             />
//                             <Marker position={activityDetails.coordinates} icon={customIcon}>
//                                 <Popup><p>{activityDetails.name}</p></Popup>
//                             </Marker>
//                         </MapContainer>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DetailsPage;