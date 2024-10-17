import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Fake data
const fakeData = [
    { id: 1, nom: 'Balade en Canoë', type: 'canoe', location: 'Paris' },
    { id: 2, nom: 'Randonnée en montagne', type: 'randonnee', location: 'Grenoble' },
    { id: 3, nom: 'Tour à vélo', type: 'velo', location: 'Lyon' },
    { id: 4, nom: 'Canoë sur la rivière', type: 'canoe', location: 'Marseille' },
    { id: 5, nom: 'Vélo autour du lac', type: 'velo', location: 'Annecy' }
];

const SearchBar = () => {
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [radius, setRadius] = useState(10); // Valeur par défaut de 10 km
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]); // Pour stocker les résultats filtrés

    // Fonction de filtrage
    const handleSearch = () => {
        const filteredResults = fakeData.filter(item =>
            item.nom.toLowerCase().includes(keyword.toLowerCase()),  // Filtre par mot-clé dans le champ "nom"
        );
        const filteredResultsByType = fakeData.filter(item =>
            item.type.includes(type)
        )
        const filteredResultsByLocation = fakeData.filter(item =>
            item.location.toLowerCase().includes(location.toLowerCase())
        )
        setResults(filteredResults);  // Mettre à jour les résultats filtrés
        setResults(filteredResultsByType);
        setResults(filteredResultsByLocation);
    };

    return (
        <div className="p-3 bg-light rounded">
            <div className="form-row mb-3">
                <div className="col">
                    {/* Champ de type d'intérêt */}
                    <div className="col-md-4">
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
                    
                    {/* Champ de localisation */}
                    <div className="col-md-4 mt-3">
                        <label htmlFor="locationInput" className="text-primary">Localisation Exacte</label>
                        <input 
                            type="text" 
                            id="locationInput" 
                            className="form-control" 
                            placeholder="Ville ou Adresse" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4 mt-3">
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
                    <div className="col-md-4 mt-3">
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