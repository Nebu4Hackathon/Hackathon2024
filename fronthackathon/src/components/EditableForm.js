import React from 'react';

const EditableForm = () => {
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

                    <button className="btn btn-primary mt-4 w-100">Réserver cette activité</button>
                </div>
            </div>
        </div>
        
    );
}

export default EditableForm;