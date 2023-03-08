import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import HomePage from './components/HomePage.jsx';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={(
              <LoginPage
                user={username}
                setUser={setUsername}
                password={password}
                setPassword={setPassword}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          />
          <Route
            path="/signup"
            element={(
              <SignUpPage
                user={username}
                setUser={setUsername}
                password={password}
                setPassword={setPassword}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          />
          <Route
            path="/homepage"
            element={
              <HomePage user={username} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
