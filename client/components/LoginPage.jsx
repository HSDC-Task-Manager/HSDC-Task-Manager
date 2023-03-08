import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from './HomePage.jsx';
// import { Outlet, Link } from "react-router-dom";

function LoginPage() {
  // DECLARE STATE
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const loginTest = useRef(false);

  const navigate = useNavigate();

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const loginData = { username: user, password };
      const result = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      if (result.ok) {
        setIsLoggedIn(true);
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.log('incorrect username or password', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/homepage');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (loginError) {
      alert('Incorrect username or password');
    }
  }, [loginError]);

  // ROUTES
  // ROUTE TO SIGN UP PAGE IF BUTTON CLICKED
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

/* tried useContext()

import UserProvider from '../UserContext';
import UserContext from '../UserContext';

const user = useContext(UserProvider)
const password = useContext(UserProvider)
const signUpToggle = useContext(UserProvider)
const setSignUpToggle = useContext(UserProvider)
const [signUpToggle, setSignUpToggle] = useContext(UserContext)

function toggle () {
  console.log(setSignUpToggle)
  console.log('toggle: ', typeof setSignUpToggle)
  setSignUpToggle(false)
  */

// .then((res) => {
//   if (res.status === 404) {
//     setIsLoggedIn(false);
//     setLoginError(true);
//   } else {
//     setIsLoggedIn(true);
//     setLoginError(false);
//   }
// })
// .then(() => {
//   console.log('isLoggedIn: ', isLoggedIn);
//   if (isLoggedIn) {
//     navigate('/homepage');
//   }
// })
// .catch((error) => {
//   console.log('incorrect username or password', error);
// });
