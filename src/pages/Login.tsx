import { useState } from 'react';
import './css/Login.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface LoginForm {
    email: string,
    password: string
}

const Login = () => {

    const [inputData, setInputData] = useState<LoginForm>(
        {
            email: "",
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

    const doLogin = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/login", inputData, { withCredentials: true });
            alert(res.data);
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
                        <form action="">
                            <h2>Login</h2>
                            <div className="input-group">
                                <input type="text" onInput={handleChange} name='email' value={inputData.email} required />
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

                            <button type="submit" onClick={doLogin}>Log in</button>

                            <div className="signUp-link">
                                <p>Don't have an acoount? <Link to={'/register'} className='signUpBtn-link'>Sign Up</Link> </p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            {/* <div className='login-container'>
                <div className='login-form'>

                    <div className="mb-3 input-field">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={inputData.email}
                            onInput={handleChange}
                            id="email"
                            aria-describedby="emailHelpId"
                            placeholder="abc@mail.com"
                        />
                    </div>

                    <div className="mb-3 input-field">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onInput={handleChange}
                            value={inputData.password}
                            id="password"
                            placeholder=""
                        />
                    </div>

                    <div>
                        <input
                            name=""
                            id=""
                            className="btn btn-success"
                            onClick={doLogin}
                            type="button"
                            value="Login"
                        />
                    </div>

                </div>
            </div> */}
        </>
    )
}
export default Login;