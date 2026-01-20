import { useState, type HTMLInputTypeAttribute, type ReactHTMLElement } from 'react'
import '../pages/css/Login.css'
import axios from 'axios';

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

    const doLogin = async() => {
        try {
            const res = await axios.post("http://localhost:8080/api/login", inputData);
            alert(res.data);
        } catch (error) {
            alert(error.response?.data || "Login failed")
        }

    }

    // console.log(inputData);

    return (
        <>
            <div className='container'>
                <div className='login-form'>

                    <div className="mb-3 input-field">
                        <label htmlFor="" className="form-label">Email</label>
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
                        <label htmlFor="" className="form-label">Password</label>
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
                            className="btn btn-primary"
                            onClick={doLogin}
                            type="button"
                            value="Login"
                        />
                    </div>

                </div>
            </div>
        </>
    )
}
export default Login;