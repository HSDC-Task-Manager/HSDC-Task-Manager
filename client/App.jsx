import React, { useState, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserContext from './UserContext';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const contextValue = useMemo(
    () => ({
      username,
      setUsername,
      password,
      setPassword,
      isLoggedIn,
      setIsLoggedIn,
    }),
    [username, password, isLoggedIn],
  );

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
