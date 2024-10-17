import { useState } from "react";

const EditPage = () => {
    const [fakeData, setFakeData] = useState({
        name: "Randonnée au Mont Blanc",
        description: "Découvrez les magnifiques paysages du Mont Blanc lors d'une randonnée guidée. Profitez de vues imprenables sur les sommets enneigés et explorez la faune et la flore locales.",
        location: "Chamonix-Mont-Blanc, France",
        distance: "12 km",
        duration: "6 heures",
        difficulty: "Modérée",
        image: "https://via.placeholder.com/800x400", // Image de remplacement
    });

    return (
        <div className="container mt-5">
        <div className="card bg-light shadow-sm">
            <img src={fakeData.image} className="card-img-top" alt={fakeData.name} />
            <div className="card-body">
                <form>
                    <div className="form-group mb-3">
                        <label htmlFor="activityName" className="text-primary">Nom de l'activité</label>
                        <input
                            type="text"
                            className="form-control"
                            id="activityName"
                            value={fakeData.name}
                        />
                    </div>
                    
                    <div className="form-group mb-3">
                        <label htmlFor="activityDescription" className="text-primary">Description</label>
                        <textarea
                            className="form-control"
                            id="activityDescription"
                            rows="4"
                            value={fakeData.description}
                        />
                    </div>

                    <div className="form-row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="activityLocation" className="text-secondary">Localisation</label>
                            <input
                                type="text"
                                className="form-control"
                                id="activityLocation"
                                value={fakeData.location}
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="activityDistance" className="text-secondary">Distance</label>
                            <input
                                type="text"
                                className="form-control"
                                id="activityDistance"
                                value={fakeData.distance}
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="activityDuration" className="text-secondary">Durée</label>
                            <input
                                type="text"
                                className="form-control"
                                id="activityDuration"
                                value={fakeData.duration}
                            />
                        </div>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="activityDifficulty" className="text-secondary">Difficulté</label>
                        <select
                            className="form-control"
                            id="activityDifficulty"
                            value={fakeData.difficulty}
                        >
                            <option value="Facile">Facile</option>
                            <option value="Modérée">Modérée</option>
                            <option value="Difficile">Difficile</option>
                        </select>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="activityImage" className="text-secondary">Changer l'image</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="activityImage"
                        />
                    </div>

                    <button type="submit" className="btn btn-success mt-4 w-20">Enregistrer les modifications</button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default EditPage;