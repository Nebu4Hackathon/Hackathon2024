import React from 'react';

const SearchResults = ({ results, onSelect }) => {
    return (
        <div className="row mt-4">
            {results.map((result, index) => (
                <div key={index} className="col-md-4 mb-3">
                    <div className="card bg-dark text-white">
                        <div className="card-body">
                            <h5 className="card-title text-primary">{result.name}</h5>
                            <p className="card-text">{result.description.slice(0, 100)}...</p>
                            <button 
                                className="btn btn-secondary"
                                onClick={() => onSelect(result)}
                            >
                                Voir Plus
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;