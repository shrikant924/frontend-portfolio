import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/css/Navbar.css';

const Navbar = ({ isUserLoggedIn, setIsUserLoggedIn, setIsAuthFormVisible, setAuthMode }) => {
  const [loginLabel, setLoginLabel] = useState('Login');

  useEffect(() => {
    setLoginLabel(isUserLoggedIn ? 'Logout' : 'Login');
  }, [isUserLoggedIn]);

  const handleLoginLogout = (e) => {
    e.preventDefault();
    if (isUserLoggedIn) {
      localStorage.removeItem('token');
      setIsUserLoggedIn(false);
    } else {
      setAuthMode('login');
      setIsAuthFormVisible(false); // show login form
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" id={"brand"} to="/dashboard">
          User Management Dashboard
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="nav-container d-flex justify-content-between w-100">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/edit_user">Edit User</Link>
              </li>
            </ul>

            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={handleLoginLogout}>
                  {loginLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
