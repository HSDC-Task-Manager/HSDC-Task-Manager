import React, { useState, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./UserContext";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import HomePage from "./components/HomePage";

function App() {
  // state is stored here and passed down to components
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [boardData, setBoardData] = useState([]);
  const [boardId, setBoardId] = useState("");

  // useMemo is used to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      username,
      setUsername,
      password,
      setPassword,
      isLoggedIn,
      setIsLoggedIn,
      userId,
      setUserId,
      boardData,
      setBoardData,
      boardId,
      setBoardId,
    }),
    [username, password, isLoggedIn, userId, boardId]
  );

  // contextValue is passed down to all components and can be accessed with useContext
  return (
    <UserContext.Provider value={contextValue}>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
