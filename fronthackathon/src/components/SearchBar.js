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
    const [sortOrder, setSortOrder] = useState(''); // Nouvel état pour gérer le tri
    const [suggestions, setSuggestions] = useState([]); // État pour stocker les suggestions

    // Function to fetch suggestions from API
    const fetchSuggestions = async (query) => {
        try {
            const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&limit=5`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des suggestions');
            }
            const data = await response.json();
            setSuggestions(data.features.map((feature) => feature.properties.label)); // Set suggestions
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la récupération des suggestions');
        }
    };

        // Handle input change for location with auto-completion
        const handleLocationChange = (e) => {
            const inputValue = e.target.value;
            setLocation(inputValue);
    
            if (inputValue.length > 2) { // Start searching after 3 characters
                fetchSuggestions(inputValue);
            } else {
                setSuggestions([]); // Clear suggestions if input is too short
            }
        };

    // Fonction de recherche par mot-clé
    const handleSearch = async () => {

        try {
            const response = await fetch(`http://localhost:8080/api/activity/type/${type}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            const data = await response.json();
            setResults(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la récupération des activités');
        }
        // if (!type) {
        //     setError('Veuillez sélectionner un type de point d\'intérêt');
        //     return;
        // }

        try {
            // Define the query parameters
            const longitude = 12.34; // Replace with the actual longitude value
            const latitude = 56.78;  // Replace with the actual latitude value
            const distance = 10.0;   // Replace with the actual distance value or let it default
            const page = 0;          // Replace with the desired page number or let it default
            const size = 10;         // Replace with the desired page size or let it default
        
            // Construct the URL with query parameters
            const response = await fetch(`http://localhost:8080/api/activity/location?longitude=${longitude}&latitude=${latitude}&distance=${distance}&page=${page}&size=${size}`);
        
            // Check if the response is okay
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
        
            // Parse the JSON response
            const data = await response.json();
        
            // Update results with the data from the API
            setResults(data);
        
            // Reset any errors
            setError(null);
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

        // Function to handle suggestion click
        const handleSuggestionClick = (suggestion) => {
            setLocation(suggestion); // Set the selected suggestion in the input field
            setSuggestions([]); // Clear suggestions after selection
        };

    // Fonction de tri
    const handleSort = (criteria) => {
        const sortedResults = [...results].sort((a, b) => {
            if (criteria === 'nom') {
                return a.nom.localeCompare(b.nom);
            } else if (criteria === 'location') {
                return a.location.localeCompare(b.location);
            }
            return 0;
        });
        setResults(sortedResults);
        setSortOrder(criteria); // Mémoriser l'ordre de tri
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
                    </div>
                    
                    <div className="row">
                    {/* Champ de localisation */}
                    {/* <div className="col-md-3 mt-3">
                        <label htmlFor="locationInput" className="text-secondary">Localisation Exacte</label>
                        <input 
                            type="text" 
                            id="locationInput" 
                            className="form-control" 
                            placeholder="Ville ou Adresse" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div> */}
                <div className="col-md-3 mt-3">
                <label htmlFor="locationInput" className="text-secondary">Localisation Exacte</label>
                <input
                    type="text"
                    id="locationInput"
                    className="form-control"
                    placeholder="Ville ou Adresse"
                    value={location}
                    onChange={handleLocationChange} // Auto-complete as user types
                />
                {/* Display suggestions */}
                {suggestions.length > 0 && (
                    <ul className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="list-group-item"
                                onClick={() => handleSuggestionClick(suggestion)}
                                style={{ cursor: 'pointer' }}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Display error if any */}
            {error && <p className="text-danger">{error}</p>}
        </div>
                <div>
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

            {/* Affichage des résultats et bouton de tri */}
            <div className="mt-3">
                {results.length > 0 && (
                    <>
                        <div className="d-flex justify-content-end mb-3">
                            <button className="btn btn-info me-2" onClick={() => handleSort('nom')}>
                                Trier par Nom
                            </button>
                            <button className="btn btn-info" onClick={() => handleSort('location')}>
                                Trier par Localisation
                            </button>
                        </div>

                        <div className='row'>
                            {results.map(result => (
                                <div className="col-md-4 my-4" key={result.id}>
                                    {result.nom} - {result.location}
                                    <div className="card text-white h-100" style={{ backgroundImage: result.image }}>
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">{result.nom}</h5>
                                            <p className='card-text text-primary'>
                                                {result.description}
                                            </p>
                                            <div className="d-flex justify-content-end mt-5">
                                                <Link to="/details">
                                                    <button className="btn btn-primary">
                                                        Voir les détails
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchBar;