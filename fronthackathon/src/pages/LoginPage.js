import React, { useState } from 'react';

const LoginPage = () => {
  // États pour le formulaire de connexion
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  // États pour le formulaire d'enregistrement
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState(null);

  // Fonction de gestion du formulaire de connexion
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }

      const data = await response.json();
      console.log('Connexion réussie:', data);

      // Stocker le token ou effectuer une redirection si nécessaire
      localStorage.setItem('accessToken', data.accessToken);
      alert('Connexion réussie');
      localStorage.setItem('accessToken', data.accessToken);
      setLoginError(null); // Réinitialiser les erreurs

    } catch (error) {
      console.error('Erreur:', error);
      setLoginError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  // Fonction de gestion du formulaire d'enregistrement
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement');
      }

      const data = await response.json();
      console.log('Enregistrement réussi:', data);

      alert('Enregistrement réussi');
      setRegisterError(null); // Réinitialiser les erreurs

    } catch (error) {
      console.error('Erreur:', error);
      setRegisterError('Erreur lors de l\'enregistrement. Veuillez réessayer.');
    }
  };

  return (
    <main className="container mt-5">
      <div className="row justify-content-center">
        {/* Login Form */}
        <div className="col-md-5">
          <form id="loginForm" onSubmit={handleLoginSubmit} className="p-4 border rounded shadow">
            <h2 className="text-center mb-4">Login</h2>
            
            {loginError && <p className="text-danger">{loginError}</p>} {/* Affichage des erreurs de connexion */}

            <div className="mb-3">
              <label htmlFor="loginUsername" className="form-label">Username</label>
              <input
                required
                type="text"
                name="username"
                id="loginUsername"
                value={loginUsername}
                className="form-control"
                placeholder="Entrer votre identifiant"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loginPassword" className="form-label">Password</label>
              <input
                required
                type="password"
                name="password"
                id="loginPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <input type="submit" value="Login" className="btn btn-primary w-100" />
            </div>
          </form>
        </div>

        <div className="col-md-1 d-flex align-items-center justify-content-center">
          <span>OU</span>
        </div>

        {/* Register Form */}
        <div className="col-md-5">
          <form id="registerForm" onSubmit={handleRegisterSubmit} className="p-4 border rounded shadow">
            <h2 className="text-center mb-4">Register</h2>
            
            {registerError && <p className="text-danger">{registerError}</p>} {/* Affichage des erreurs d'enregistrement */}

            <div className="mb-3">
              <label htmlFor="registerUsername" className="form-label">Username</label>
              <input
                required
                type="text"
                name="username"
                id="registerUsername"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                className="form-control"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="registerEmail" className="form-label">Email</label>
              <input
                required
                type="email"
                name="email"
                id="registerEmail"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="registerPassword" className="form-label">Password</label>
              <input
                required
                type="password"
                name="password"
                id="registerPassword"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <input type="submit" value="Register" className="btn btn-primary w-100" />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;