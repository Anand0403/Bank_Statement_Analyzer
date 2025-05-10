import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/Signup';
import Home   from './components/homepage/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => setIsAuthenticated(true);
  const handleSignUp = () => setIsAuthenticated(true);

  return (
    <Routes>
      {/* Redirect "/" → "/signin" */}
      <Route path="/" element={<Navigate to="/signin" replace />} />

      {/* Auth routes */}
      <Route
        path="/signin"
        element={<SignIn handleSignIn={handleSignIn} />}
      />
      <Route
        path="/signup"
        element={<SignUp handleSignUp={handleSignUp} />}
      />

      {/* Protected Home route */}
      <Route
        path="/home"
        element={
          isAuthenticated
            ? <Home />
            : <Navigate to="/signin" replace />
        }
      />

      {/* Fallback all other URLs to "/signin" */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

export default App;
