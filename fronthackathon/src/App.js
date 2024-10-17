import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import EditPage from './pages/EditPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<HomePage />} />

        {/* Route pour la page de détails */}
        <Route path="/details" element={<DetailsPage />} />

        {/* Route pour la page d'édition */}
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;