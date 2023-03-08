import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import HomePage from './components/HomePage.jsx';

function App() {
  // SIGN-UP / SIGN-IN TOGGLE
  // const toggle = () => {
  //   setSignUpToggle(!signUpToggle);
  // };

  // useEffect(() => {
  //   if (loginError === true) alert('Incorrect username or password. Please try again');
  // }, [loginError]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
  // THIS IS THE OLD RETURN STATEMENT FROM IMPORT - CS & NN
  // return (
  //   <>
  //     {isLoggedIn ? (
  //       <HomePage user={user} isLoggedIn={isLoggedIn} setLogin={setLogin} />
  //     ) : signUpToggle ? (
  //       <SignUpPage
  //         user={user}
  //         setUser={setUser}
  //         password={password}
  //         setPassword={setPassword}
  //         toggle={toggle}
  //         isLoggedIn={isLoggedIn}
  //         setLogin={setLogin}
  //       />
  //     ) : (
  //       <LoginPage
  //         user={user}
  //         setUser={setUser}
  //         password={password}
  //         setPassword={setPassword}
  //         toggle={toggle}
  //         isLoggedIn={isLoggedIn}
  //         setLogin={setLogin}
  //         setLoginError={setLoginError}
  //       />
  //     )}
  //     {/* {loginError ? (<div>Incorrect username or password. Please try again</div>) : <></>} */}
  //   </>
  // );
}

export default App;

/* notes on the routing:
//the first Route has a path of "/" (which maybe should change?)
// and it renders the Login Page
//the next Routes are nested in that first Route

// do we need to add a catchall for undefined URLs, like <Route path="*" element={<NoPage />} />
// & then import a NoPage & have an error msg?
*/

/*
Routing:
<SignUpPage />
<LoginPage />
<HomePage />

<Router>
  <Routes>
    <Route
      path="/login"
      element={
        <LoginPage
          user={user}
          setUser={setUser}
          password={password}
          setPassword={setPassword}
          toggle={toggle}
          isLoggedIn={isLoggedIn}
          setLogin={setLogin}
        />
      }
    />
    <Route
      path="/signup"
      element={
        <SignUpPage
          user={user}
          setUser={setUser}
          password={password}
          setPassword={setPassword}
          toggle={toggle}
          isLoggedIn={isLoggedIn}
          setLogin={setLogin}
        />
      }
    />
    <Route
      path='/home'
      element={
        <HomePage
        />} />
  </Routes>
</Router>

*/

/* tried useContext()
  const [signUpToggle, setSignUpToggle]= useContext(UserProvider)
  console.log('SIGNUPTOGGLE from app: ',signUpToggle)
  console.log('UserProvider from APP.jsx', UserProvider)
*/
