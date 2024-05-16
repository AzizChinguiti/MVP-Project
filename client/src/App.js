import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Profile from "./pages/Profile";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "../src/style.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [signupData, setSignupData] = useState(null);

  const handleSignup = (data) => {
    setSignupData(data);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Profile logout={logout} /> : <Navigate to="/login" />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={signupData ? <Navigate to="/login" /> : <Signup onSignup={handleSignup} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
