// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// // Fake data
// const fakeData = [
//     { id: 1, nom: 'Balade en Canoë', type: 'canoe', location: 'Paris' },
//     { id: 2, nom: 'Randonnée en montagne', type: 'randonnee', location: 'Grenoble' },
//     { id: 3, nom: 'Tour à vélo', type: 'velo', location: 'Lyon' },
//     { id: 4, nom: 'Canoë sur la rivière', type: 'canoe', location: 'Marseille' },
//     { id: 5, nom: 'Vélo autour du lac', type: 'velo', location: 'Annecy' }
// ];

// const SearchBar = () => {
//     const [type, setType] = useState('');
//     const [location, setLocation] = useState('');
//     const [radius, setRadius] = useState(10); // Valeur par défaut de 10 km
//     const [keyword, setKeyword] = useState('');
//     const [results, setResults] = useState([]); // Pour stocker les résultats filtrés

//     // Fonction de filtrage
//     const handleSearch = () => {
//         const filteredResults = fakeData.filter(item =>
//             item.nom.toLowerCase().includes(keyword.toLowerCase()),  // Filtre par mot-clé dans le champ "nom"
//         );
//         const filteredResultsByType = fakeData.filter(item =>
//             item.type.includes(type)
//         );
//         const filteredResultsByLocation = fakeData.filter(item =>
//             item.location.toLowerCase().includes(location.toLowerCase())
//         );
//         setResults(filteredResults);  // Mettre à jour les résultats filtrés
//         setResults(filteredResultsByType);
//         setResults(filteredResultsByLocation);
//     };

//     return (
//         <div className="p-3 bg-light rounded">
//             <div className="form-row mb-3">
//                 <div className="col">
//                     {/* Champ de type d'intérêt */}
//                     <div className="col-md-4">
//                         <label htmlFor="typeSelect" className="text-primary">Type de Point d'Intérêt</label>
//                         <select 
//                             id="typeSelect" 
//                             className="form-control" 
//                             value={type} 
//                             onChange={(e) => setType(e.target.value)}
//                         >
//                             <option value="">Choisir...</option>
//                             <option value="randonnee">Randonnée</option>
//                             <option value="velo">Vélo</option>
//                             <option value="autre">Autre</option>
//                         </select>
//                     </div>
                    
//                     {/* Champ de localisation */}
//                     <div className="col-md-4 mt-3">
//                         <label htmlFor="locationInput" className="text-primary">Localisation Exacte</label>
//                         <input 
//                             type="text" 
//                             id="locationInput" 
//                             className="form-control" 
//                             placeholder="Ville ou Adresse" 
//                             value={location} 
//                             onChange={(e) => setLocation(e.target.value)}
//                         />
//                     </div>

//                     <div className="col-md-4 mt-3">
//                         <label htmlFor="radiusRange" className="text-tertiary">Distance Maximale (km) : {radius} km</label>
//                         <input 
//                             type="range" 
//                             id="radiusRange" 
//                             className="form-control-range" 
//                             min="1" 
//                             max="100" 
//                             step="1" 
//                             value={radius} 
//                             onChange={(e) => setRadius(e.target.value)}
//                         />
//                     </div>                 

//                     {/* Champ de recherche par mot-clé */}
//                     <div className="col-md-4 mt-3">
//                         <label htmlFor="keywordInput" className="text-primary">Recherche par Mot-Clé</label>
//                         <input 
//                             type="text" 
//                             id="keywordInput" 
//                             className="form-control" 
//                             placeholder="Ex: canoë" 
//                             value={keyword} 
//                             onChange={(e) => setKeyword(e.target.value)}
//                         />
//                     </div>
//                 </div>

//                 {/* Bouton de recherche */}
//                 <button className="btn btn-primary w-15 mt-3" onClick={handleSearch}>Rechercher</button>
//             </div>

//             {/* Affichage des résultats */}
//             <div className="mt-3">
//             <h3>Résultats de la recherche :</h3>
//             {results.length > 0 ? (
//             <div>
//                 {results.map(result => (
//                 <div className="col-md-4 mb-3" key={result.id}>{result.nom} - {result.location}
//                 <div className="card bg-dark text-white h-100">
//                     <div className="card-body">
//                         <h5 className="card-title text-primary">{result.nom}</h5>
//                         <div className='card-body'>
//                             <p className='card-text text-primary'>
//                             {result.description}
//                             </p>
//                             <Link to="/details">
//                                 <button className="btn btn-secondary mt-2">
//                                     Voir les détails
//                                 </button>
//                             </Link>
//                         </div>

//                     </div>
//                 </div>
//                 </div>
//                 ))}
//                 </div> 
//             ) : (
//                 <p></p>
//             )}
//             </div>
//         </div>
//     );
// };

// export default SearchBar;
import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
// import places from 'places.js'; 

// Suppression des fakeData, car nous allons utiliser les données de l'API

const SearchBar = () => {

    const [keyword, setKeyword] = useState(''); // Mot-clé pour la recherche
    const [results, setResults] = useState([]); // Pour stocker les résultats de l'API
    const [error, setError] = useState(null); // Pour stocker les erreurs
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [radius, setRadius] = useState(10); // Valeur par défaut de 10 km



    // useEffect(() => {
    //     const locationInput = document.querySelector('#locationInput');

    //     const placesAutocomplete = places({
    //         appId: 'G0TCD82RYZ',      // Remplacez par votre appId
    //         apiKey: '2a56f347f12e2d1fd2c36f509d7d2c39',    // Remplacez par votre Search API Key
    //         container: locationInput,
    //         countries: ['fr'],  // Limite les résultats à la France
    //         type: 'address',     // Recherche d'adresses et de villes
    //         language: 'fr',      // Utilise la langue française pour les suggestions
    //     });

    //     placesAutocomplete.on('change', (e) => {
    //         setLocation(e.suggestion.value);
    //     });

    //     return () => {
    //         placesAutocomplete.destroy();  // Nettoyer l'instance d'Algolia Places lors du démontage
    //     };
    // }, []);
    // Fonction de recherche par mot-clé
    const handleSearch = async () => {
        // if (!type) {
        //     setError('Veuillez sélectionner un type de point d\'intérêt');
        //     return;
        // }

        try {
            const response = await fetch(`http://localhost:8080/api/activity/type/${type}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            const data = await response.json(); // Convertir la réponse en JSON
            setResults(data); // Mettre à jour les résultats avec les données de l'API
            setError(null); // Réinitialiser les erreurs
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la récupération des activités');
        }
    
        // if (!keyword) {
        //     setError('Veuillez entrer un mot-clé');
        //     return;
        // }

        try {
            const response = await fetch(`http://localhost:8080/api/activity/full-text/${keyword}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            const data = await response.json(); // Convertir la réponse en JSON
            setResults(data); // Mettre à jour les résultats avec les données de l'API
            setError(null); // Réinitialiser les erreurs
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la récupération des activités');
        }
    };
    return (
        <div className="p-3 bg-light rounded">
            <div className="form-row mb-3">
                <div className="col">
                    <div className="row">
                         {/* Champ de type d'intérêt */}
                    <div className="col-md-3">
                        <label htmlFor="typeSelect" className="text-primary">Type de Point d'Intérêt</label>
                        <select 
                            id="typeSelect" 
                            className="form-control" 
                            value={type} 
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Choisir...</option>
                            <option value="randonnee">Randonnée</option>
                            <option value="velo">Vélo</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                          {/* Champ de type d'intérêt */}
                          <div className="col-md-3">
                        <label htmlFor="typeSelect" className="text-primary">2éme Type de Point d'Intérêt</label>
                        <select 
                            id="typeSelect" 
                            className="form-control" 
                            value={type} 
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Choisir...</option>
                            <option value="randonnee">Randonnée</option>
                            <option value="velo">Vélo</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                          {/* Champ de type d'intérêt */}
                          <div className="col-md-3">
                        <label htmlFor="typeSelect" className="text-primary">3éme Type de Point d'Intérêt</label>
                        <select 
                            id="typeSelect" 
                            className="form-control" 
                            value={type} 
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Choisir...</option>
                            <option value="randonnee">Randonnée</option>
                            <option value="velo">Vélo</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                          {/* Champ de type d'intérêt */}
                          <div className="col-md-3">
                        <label htmlFor="typeSelect" className="text-primary">4éme Type de Point d'Intérêt</label>
                        <select 
                            id="typeSelect" 
                            className="form-control" 
                            value={type} 
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Choisir...</option>
                            <option value="randonnee">Randonnée</option>
                            <option value="velo">Vélo</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                    </div>
                    
                    <div className="row">
                    {/* Champ de localisation */}
                    <div className="col-md-3 mt-3">
                        <label htmlFor="locationInput" className="text-secondary">Localisation Exacte</label>
                        <input 
                            type="text" 
                            id="locationInput" 
                            className="form-control" 
                            placeholder="Ville ou Adresse" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
              
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="radiusRange" className="text-tertiary">Distance Maximale (km) : {radius} km</label>
                        <input 
                            type="range" 
                            id="radiusRange" 
                            className="form-control-range" 
                            min="1" 
                            max="100" 
                            step="1" 
                            value={radius} 
                            onChange={(e) => setRadius(e.target.value)}
                        />
                    </div> 
                   

                    {/* Champ de recherche par mot-clé */}
                    <div className="col-md-5 mt-3">
                        <label htmlFor="keywordInput" className="text-primary">Recherche par Mot-Clé</label>
                        <input 
                            type="text" 
                             id="keywordInput" 
                             className="form-control" 
                             placeholder="Ex: canoë" 
                             value={keyword} 
                             onChange={(e) => setKeyword(e.target.value)}
                         />
                     </div>
                 </div>

                 {/* Bouton de recherche */}
                 <button className="btn btn-primary w-15 mt-3" onClick={handleSearch}>Rechercher</button>
             </div>

             {/* Affichage des résultats */}
             <div className="mt-3">
             <h3>Résultats de la recherche :</h3>
             {results.length > 0 ? (
             <div>
                 {results.map(result => (
                 <div className="col-md-4 mb-3" key={result.id}>{result.nom} - {result.location}
                 <div className="card bg-dark text-white h-100">
                     <div className="card-body">
                         <h5 className="card-title text-primary">{result.nom}</h5>
                         <div className='card-body'>
                             <p className='card-text text-primary'>
                             {result.description}
                             </p>
                             <Link to="/details">
                                 <button className="btn btn-secondary mt-2">
                                     Voir les détails
                                 </button>
                             </Link>
                         </div>

                     </div>
                 </div>
                 </div>
                 ))}
                 </div> 
             ) : (
                <p></p>
            )}
             </div>
         </div>
     );
 };

export default SearchBar;