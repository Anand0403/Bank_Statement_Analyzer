import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Footer from './Homepage/Footer';
import HomeBody from './Homepage/HomeBody';
import SimpleAppBar from './Homepage/SimpleAppBar';
import SignIn from './Homepage/signin';
import SignUp from './Homepage/signup';
import DataDisplay from './Homepage/DataDisplay';

function LayoutWrapper({ children }) {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const location = useLocation();

  // List of paths where AppBar and Footer should be hidden
  const hideLayoutPaths = ['/signin', '/signup', '/datadisplay'];

  const hideLayout = hideLayoutPaths.includes(location.pathname.toLowerCase());

  return (
    <>
      {!hideLayout && <SimpleAppBar />}
      {React.cloneElement(children, { isUserSignedIn, setIsUserSignedIn })}
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<HomeBody />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/datadisplay" element={<DataDisplay />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
