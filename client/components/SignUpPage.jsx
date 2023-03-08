import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function SignUpPage({
  username, setUsername, password, setPassword, isLoggedIn, setIsLoggedIn,
}) {
  // DECLARE STATE
  const [signUpError, setSignUpError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { username, password };
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    })
      .then(() => {
        setIsLoggedIn(true);
        // if (isLoggedIn) {
        //   navigate('/homepage');
        // }
      })
      .catch((error) => {
        console.log('unable to signup user', error);
      });
  };

  // ROUTES
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/homepage');
    }
  }, [isLoggedIn]);

  const routeToSignIn = (e) => {
    e.preventDefault();
    navigate('/');
  };

  // RENDER
  return (
    <div className="loginCont">
      <div className="user-login-box">
        <h1 className="login-header">Create a new Account:</h1>
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
          <button className="submit">Submit</button>
        </form>
        <div className="login-footer">
          Already have an account?
          {' '}
          <button onClick={routeToSignIn}>Sign in here!</button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
