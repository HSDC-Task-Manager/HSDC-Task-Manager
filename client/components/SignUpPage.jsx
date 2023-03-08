import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import UserContext from '../UserContext';

function SignUpPage() {
  const {
    username, setUsername, password, setPassword, isLoggedIn, setIsLoggedIn,
  } = useContext(UserContext);

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
      })
      .catch((error) => {
        console.log('unable to signup user', error);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/homepage');
    }
  }, [isLoggedIn]);

  const routeToSignIn = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="loginCont">
      <div className="user-login-box">
        <h1 className="login-header">Create a new Account:</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="formLine">
            <label className="login-text" htmlFor="username">
              Username/Email
              <input
                className="user-input"
                type="text"
                required
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="formLine">
            <label className="login-text" htmlFor="password">
              Password
              <input
                className="user-input"
                type="password"
                required
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
        <div className="login-footer">
          Already have an account?
          {' '}
          <button type="button" onClick={routeToSignIn}>
            Sign in here!
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
