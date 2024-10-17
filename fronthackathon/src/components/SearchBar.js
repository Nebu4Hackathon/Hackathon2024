import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [radius, setRadius] = useState(10); // Valeur par défaut de 10 km
    const [keyword, setKeyword] = useState('');

    const handleSearch = () => {
        onSearch({ type, location, radius, keyword });
    };

    return (
        <div className="p-3 bg-light rounded">
            <div className="form-row mb-3">
                <div className="col row">

                    {/* Interet 1  */}
                    <div className='col-md-3'>
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
                    
                    {/* Interet 2  */}
                    <div className='col-md-3'>
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

                    {/* Interet 3  */}
                    <div className='col-md-3'>
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

                    {/* Interet 4  */}
                    <div className='col-md-3'>

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
                
                <div className='row mt-3'>
                    {/* ville 1 */}
                    <div className="col-md-3">
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
                    {/* ville 2 */}
                    <div className="col-md-3">
                        <label htmlFor="locationInput" className="text-secondary">Autre localisation</label>
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
                <div className="col-md-3 mt-3">
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
                <div className="col-md-s7 mt-3">
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
            <button className="btn btn-primary w-15" onClick={handleSearch}>Rechercher</button>
        </div>
    );
};

export default SearchBar;