import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import EditPage from './pages/EditPage';
import Header from './components/Header'; 
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter basename="/app">
      <Header />
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<HomePage />} />

        {/* Route pour la page de détails */}
        <Route path="/connect" element={<LoginPage />} />

        <Route path="/map" element={<DetailsPage />} />

        {/* Route pour la page d'édition */}
        <Route path="contact" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;