import React, { useState } from 'react';

const DetailsPage = ({ point, onUpdate }) => {
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            <h2>{point.name}</h2>
            <p>{point.description}</p>
            <img src={image || point.image} alt="Illustration" />
            <input type="file" onChange={handleImageUpload} />
            <button onClick={() => onUpdate(point.id, image)}>Enregistrer</button>
        </div>
    );
};

export default DetailsPage;