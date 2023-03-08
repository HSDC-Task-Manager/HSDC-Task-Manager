import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function SignUpPage() {
  // DECLARE STATE
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { username: user, password };
    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        setIsLoggedIn(true);
        if (isLoggedIn) {
          navigate('/');
        }
      })
      .catch((error) => {
        console.log('unable to signup user', error);
      });
  };

  // ROUTES
  const routeToHomePage = (e) => {
    e.preventDefault();
    navigate('/homepage');
  };

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
              onChange={(e) => setUser(e.target.value)}
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

/* tried useContext ...

import UserProvider from '../UserContext';
import UserContext from '../UserContext';
STATE HERE IF NEEDED
const user = useContext(UserProvider)
const password = useContext(UserProvider)
// const signUpToggle = useContext(UserProvider)
// const setSignUpToggle = useContext(UserProvider)
const [signUpToggle, setSignUpToggle] = useContext(UserContext)

function toggle () {
  console.log('toggle: ', typeof setSignUpToggle)
  console.log(setSignUpToggle)
  return setSignUpToggle(false)

*/
