import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import DetailsPage from './pages/DetailsPage';
import EditPage from './pages/EditPage';
import './App.css';

function App() {
    const [results, setResults] = useState([]);

    const handleSearch = (filters) => {
        console.log('Filtres de recherche appliqués:', filters);
        const mockResults = [
            {
                id: 1,
                name: "Randonnée Montagne",
                description: "Une belle randonnée à travers les montagnes avec des paysages incroyables.",
                type : "randonnée"
            },
            {
                id: 2,
                name: "Tour en Vélo",
                description: "Un tour guidé en vélo à travers la ville.",
                type : "vélo"
            },
            {
                id: 3,
                name: "Excursion en Canoë",
                description: "Partez pour une aventure en canoë sur la rivière tranquille.",
                type : "canoë"
            },
        ];
        setResults(mockResults);
    };

    const handleSelect = (result) => {
        console.log('Point d\'intérêt sélectionné:', result);
    };

    return (
        <>
            <nav className="navbar navbar-dark bg-dark mb-4">
                <div className="container">
                    <a className="navbar-brand" href="#">Tourisme Explorer</a>
                    <a className="navbar-brand" href="#">Rechercher</a>
                    <a className="navbar-brand" href="#">Carte</a>
                </div>
            </nav>
            <div className="container">
                <h1 className="text-center text-primary mb-4">Recherchez des Activités Touristiques</h1>
                <SearchBar onSearch={handleSearch} />
                <SearchResults results={results} onSelect={handleSelect} />
                <DetailsPage/>
                <EditPage/>
            </div>
        </>
    );
}

export default App;