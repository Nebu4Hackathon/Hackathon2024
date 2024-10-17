import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ username: '', email: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
//   const [loginError, setLoginError] = useState(''); // State to handle login errors
//   const [registerError, setRegisterError] = useState(''); // State to handle registration errors

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  //const handleLoginSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   const response = await fetch('http://localhost:5000/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(loginData),
    //     credentials: 'include', // important to include session cookies
    //   });
    //   if (response.ok) {
    //     window.location.href = '/dashboard'; // Navigate to dashboard
    //   } else {
    //     const errorData = await response.json();
    //     setLoginError(errorData.error || 'Login failed'); // Set the error message
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error);
    //   setLoginError('An unexpected error occurred during login'); // Set the error message
    // }
 // };

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(registerData),
//         credentials: 'include', // important to include session cookies
//       });
//       if (response.ok) {
//         window.location.href = '/dashboard'; // Navigate to dashboard
//       } else {
//         const errorData = await response.json();
//         setRegisterError(errorData.error || 'Registration failed'); // Set the error message
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       setRegisterError('An unexpected error occurred during registration'); // Set the error message
//     }
//   };

  return (
    <main className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Login Form */}
          <form id="loginForm" onSubmit={handleLoginSubmit} className="p-4 border rounded shadow">
            <h2 className="text-center mb-4">Login</h2>
            {loginError && <p className="text-danger">{loginError}</p>} {/* Display login error */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                required
                type="text"
                name="username"
                value=""
                onChange=""
                className="form-control"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                required
                type="email"
                name="email"
                value=""
                onChange=""
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                required
                type="password"
                name="password"
                value=""
                onChange=""
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

        <div className="col-md-6">
          {/* Register Form */}
          <form id="registerForm" onSubmit={handleRegisterSubmit} className="p-4 border rounded shadow">
            <h2 className="text-center mb-4">Register</h2>
            {registerError && <p className="text-danger">{registerError}</p>} {/* Display registration error */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                required
                type="text"
                name="username"
                value=""
                onChange=""
                className="form-control"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                required
                type="email"
                name="email"
                value=""
                onChange=""
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                required
                type="password"
                name="password"
                value=""
                onChange=""
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