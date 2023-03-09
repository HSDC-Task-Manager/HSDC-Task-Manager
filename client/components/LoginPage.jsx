import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

function LoginPage() {
  // useContext is used to access the contextValue from App.jsx
  const {
    username,
    setUsername,
    password,
    setPassword,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(UserContext);

  const navigate = useNavigate();

  // makes a POST request to the backend to begin auth process
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("SIGN IN BUTTON FIRED IN LOGIN PAGE");
      const loginData = { username, password };
      const result = await fetch("/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      console.log("RESULT FROM LOGIN REQUEST: ", result);
      // TODO: fix this when the backend is ready - CS & NN
      setIsLoggedIn(true);
    } catch (error) {
      console.log("incorrect username or password", error);
    }
  };

  // sends user to homepage if successfully logged in
  useEffect(() => {
    if (isLoggedIn) {
      console.log("GOING TO HOMEPAGE FROM LOGIN PAGE");
      navigate("/homepage");
    }
  }, [isLoggedIn]);

  // sends user to signup if signup button is clicked
  const routeToSignUp = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="loginCont">
      <div className="user-login-box">
        <h1 className="login-header">Welcome! Sign in here! </h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="formLine">
            <label className="login-text" htmlFor="username">
              Username/Email
              <input
                id="username"
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
            Login
          </button>
        </form>
        <div className="login-footer">
          Don&apos;t have an Account?{" "}
          <button type="button" onClick={routeToSignUp}>
            Sign up here!
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
