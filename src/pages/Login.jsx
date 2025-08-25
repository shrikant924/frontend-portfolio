import { useEffect, useRef, useState } from 'react';
import '../pages/css/Login.css';
import axios from 'axios';

const Login = ({ setIsUserLoggedIn, setIsAuthFormVisible, setAuthMode }) => {
  const formRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [inputData, setInputData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      inputData.email=inputData.email.toLowerCase();
      const res = await axios.post('http://localhost:5000/api/posts/getlogin', inputData);
      const msg = res.data.message;

      if (msg === "User email id not found!!" || msg === "password is incorrect!!") {
        setErrorMessage(msg);
      } else {
        if (!res.data.Token) {
          localStorage.setItem('token', res.data.token)
          // login success
          setErrorMessage('');
          setIsUserLoggedIn(true);
          setIsAuthFormVisible(true); // hide form after login
        }
      }

    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const getInputDetails = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setIsAuthFormVisible(true); // hide the login form
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="modal-overlay">
      <form ref={formRef}>
        <div className="form-container">
          <div className="cross-button">
            <button className="btn btn-danger" onClick={() => setIsAuthFormVisible(true)}>x</button>
          </div>

          <div className="form-items">
            <label>Username:</label>
            <input
              type="text"
              name="email"
              onChange={getInputDetails}
              value={inputData.email}
              placeholder="Enter your username/email"
            />
          </div>

          <div className="form-items">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={getInputDetails}
              value={inputData.password}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-items">
            <button className="btn btn-success" onClick={handleLogin}>Login</button>
          </div>

          {errorMessage && <h5 style={{ color: "red" }}>{errorMessage}</h5>}

          <div className="form-items">
            <button
              className="btn btn-outline-info"
              onClick={(e) => {
                e.preventDefault();
                setAuthMode('register');
              }}
            >
              Don't have an account? Register here
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
