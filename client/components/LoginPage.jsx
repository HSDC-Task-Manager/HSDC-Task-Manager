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
    userId,
    setUserId, //url
    boardId,
    setBoardId,
    boardData,
    setBoardData,
  } = useContext(UserContext);

  const navigate = useNavigate();

  // makes a POST request to the backend to begin auth process
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const loginData = { username, password };
      const result = await fetch("/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await result.json();
      console.log("boards received are: ", data.board);
      // TODO: fix this when the backend is ready & grab userId- CS & NN
      setBoardId(data.boardID);
      setBoardData(data.board);
      setUserId(data.id);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("incorrect username or password", error);
    }
  };

  // sends user to homepage if successfully logged in
  useEffect(() => {
    if (isLoggedIn) {
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
          <div>Don&apos;t have an Account? </div>
          <button type="button" onClick={routeToSignUp}>
            Sign up here!
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
