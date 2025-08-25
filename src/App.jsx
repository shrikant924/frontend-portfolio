import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EditUser from './pages/EditUser';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAuthFormVisible, setIsAuthFormVisible] = useState(true); // true = hide forms
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  return (
    <Router>
      <Navbar
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
        setIsAuthFormVisible={setIsAuthFormVisible}
        setAuthMode={setAuthMode}
      />

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit_user" element={<EditUser />} />
      </Routes>

      {!isAuthFormVisible && authMode === 'login' && (
        <Login
          setIsUserLoggedIn={setIsUserLoggedIn}
          setIsAuthFormVisible={setIsAuthFormVisible}
          setAuthMode={setAuthMode}
        />
      )}

      {!isAuthFormVisible && authMode === 'register' && (
        <Register
          setIsUserLoggedIn={setIsUserLoggedIn}
          setIsAuthFormVisible={setIsAuthFormVisible}
          setAuthMode={setAuthMode}
        />
      )}
    </Router>

  );
}

export default App;
