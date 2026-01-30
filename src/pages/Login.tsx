import { useState } from 'react';
import './css/Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LoginForm {
    username: string,
    password: string
}

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate();
    const [inputData, setInputData] = useState<LoginForm>(
        {
            username: "",
            password: ""
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setInputData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const doLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/login", inputData, { withCredentials: true });
            login(res?.data.token);
            alert("Logged in successfully");
            navigate("/");


        } catch (error: any) {
            alert(error.response?.data || "Login failed")
        }

    }

    // console.log(inputData);

    return (
        <>
            <div className='login-page'>
                <div className="wrapper">
                    <div className="from-wrapper sign-in">
                        <form onSubmit={doLogin}>
                            <h2>Login</h2>
                            <div className="input-group">
                                <input type="text" onInput={handleChange} name='username' value={inputData.username} required />
                                <label htmlFor="">Username</label>
                            </div>

                            <div className="input-group">
                                <input type="password" onInput={handleChange} name='password' value={inputData.password} required />
                                <label htmlFor="">Password</label>
                            </div>

                            <div className="remember">
                                <label htmlFor="">
                                    <input type="checkbox" name="" id="" />     Remember me
                                </label>
                            </div>

                            <button type="submit">Log in</button>

                            <div className="signUp-link">
                                <p>Don't have an acoount? <Link to={'/register'} className='signUpBtn-link'>Sign Up</Link> </p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;
