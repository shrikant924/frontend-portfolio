import '../pages/css/Login.css';
import { useState, useRef , useEffect } from 'react';
import axios from 'axios';

const Register = ({ setIsUserLoggedIn, setIsAuthFormVisible, setAuthMode }) => {
  const formRef = useRef();
  const [inputData, setInputData] = useState({
    fullname: '',
    email: '',
    password: ''
  });

  const setInputDetails = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // 1. Insert email and get user_id
      const emailResponse = await axios.post('http://localhost:5000/api/posts/registerUser', {
        email: inputData.email,
        password: inputData.password,
        fullname: inputData.fullname
      }).then(response => {
        alert(response.data.message);
      });

      // 4. Hide form only after all succeeded
      setIsAuthFormVisible(true);
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
    }
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
      <div className="form-container">
        <form ref={formRef}>
          <div className="cross-button">
            <button
              type="button"
              className="btn btn-danger"
              onClick={(e) => {
                e.preventDefault();
                setIsAuthFormVisible(true);
              }}
            >
              x
            </button>
          </div>

          <div className="form-items">
            <label>Full name:</label>
            <input
              type="text"
              name="fullname"
              onChange={setInputDetails}
              value={inputData.fullname}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-items">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={setInputDetails}
              value={inputData.email}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-items">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={setInputDetails}
              value={inputData.password}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-items">
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>

          <div className="form-items">
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={(e) => {
                e.preventDefault();
                setAuthMode("login");
              }}
            >
              Already have an account? Login here
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default Register;
