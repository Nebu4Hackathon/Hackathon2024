import React, { useState } from 'react';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ username: '', email: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [loginError, setLoginError] = useState(''); // State to handle login errors
  const [registerError, setRegisterError] = useState(''); // State to handle registration errors

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include', // important to include session cookies
      });
      if (response.ok) {
        window.location.href = '/dashboard'; // Navigate to dashboard
      } else {
        const errorData = await response.json();
        setLoginError(errorData.error || 'Login failed'); // Set the error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('An unexpected error occurred during login'); // Set the error message
    }
 };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
        credentials: 'include', // important to include session cookies
      });
      if (response.ok) {
        window.location.href = '/dashboard'; // Navigate to dashboard
      } else {
        const errorData = await response.json();
        setRegisterError(errorData.error || 'Registration failed'); // Set the error message
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setRegisterError('An unexpected error occurred during registration'); // Set the error message
    }
  };

  return (
    <main className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          {/* Login Form */}
          <form id="loginForm" onSubmit={handleLoginSubmit} className="p-4 border rounded shadow">
            <h2 className="text-center mb-4">Se connecter</h2>
            
            {loginError && <p className="text-danger">{loginError}</p>} {/* Affichage des erreurs de connexion */}

            <div className="mb-3">
              <label htmlFor="loginUsername" className="form-label">Identifiant</label>
              <input
                required
                type="text"
                name="username"
                value=""
                onChange=""
                className="form-control"
                placeholder="Entrer votre identifiant"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loginPassword" className="form-label">Mot de passe</label>
              <input
                required
                type="password"
                name="password"
                value=""
                onChange=""
                className="form-control"
                placeholder="Entrer votre mot de passe"
              />
            </div>
            <div>
              <input type="submit" value="Connexion" className="btn btn-primary w-100" />
            </div>
          </form>
        </div>

        <div className="col-md-1 d-flex align-items-center justify-content-center">
          <span>OU</span>
        </div>

        <div className="col-md-5">
          {/* Register Form */}
          <form id="registerForm" onSubmit={handleRegisterSubmit} className="p-4 border rounded shadow">
            <h2 className="text-center mb-4">S'inscrire</h2>
            
            {registerError && <p className="text-danger">{registerError}</p>} {/* Affichage des erreurs d'enregistrement */}

            <div className="mb-3">
              <label htmlFor="registerUsername" className="form-label">Identifiant</label>
              <input
                required
                type="text"
                name="username"
                value=""
                onChange=""
                className="form-control"
                placeholder="Entrer votre identifiant"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="registerEmail" className="form-label">Adresse Mail</label>
              <input
                required
                type="email"
                name="email"
                value=""
                onChange=""
                className="form-control"
                placeholder="Entrer votre adresse mail"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="registerPassword" className="form-label">Mot de passe</label>
              <input
                required
                type="password"
                name="password"
                value=""
                onChange=""
                className="form-control"
                placeholder="Entrer votre mot de passe"
              />
            </div>
            <div>
              <input type="submit" value="Inscription" className="btn btn-primary w-100" />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;