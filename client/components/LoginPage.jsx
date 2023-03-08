import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({
  username, setUsername, password, setPassword, isLoggedIn, setIsLoggedIn,
}) {
  // DECLARE STATE

  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const loginData = { username, password };
      const result = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      console.log('RESULT FROM LOGIN REQUEST: ', result);
      // TODO: fix this when the backend is ready - CS & NN
      setIsLoggedIn(true);
    } catch (error) {
      console.log('incorrect username or password', error);
    }
  };

  // ROUTES
  // send user to homepage if successfully logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/homepage');
    }
  }, [isLoggedIn]);

  // send user to signup if signup button is clicked
  const routeToSignUp = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  // RENDER
  return (
    <div className="loginCont">
      <div className="user-login-box">
        <h1 className="login-header">Welcome! Sign in here! </h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="formLine">
            <label className="login-text" htmlFor="username">
              Username/Email
            </label>
            <input
              className="user-input"
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="formLine">
            <label className="login-text" htmlFor="password">
              Password
            </label>
            <input
              className="user-input"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="submit">Login</button>
        </form>
        <div className="login-footer">
          Don't have an Account?
          {' '}
          <button onClick={routeToSignUp}>Sign up here!</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
