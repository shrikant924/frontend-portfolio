import { useState } from "react";
import axios from "axios";
import './css/RegistrationFrom.css'
import { Link } from "react-router-dom";
const RegistrationFrom = () => {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // simple validation
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/register",
                formData
            );

            console.log("Response:", response.data);
            alert("Registration successful");

        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    const handleReset = () => {
        setFormData({
            fullName: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: ""
        });
    };

    return (
        <>
            <div className="login-page">
                <div className="wrapper">
                    <form action="">
                        <h2>Sign Up</h2>

                        <div className="input-group">
                            <input type="text" onChange={handleChange} name='fullName' value={formData.fullName} required />
                            <label htmlFor="">Name</label>
                        </div>

                        <div className="input-group">
                            <input type="text" onChange={handleChange} name='email' value={formData.email} required />
                            <label htmlFor="">Email</label>
                        </div>

                        <div className="input-group">
                            <input type="text" onChange={handleChange} name='username' value={formData.username} required />
                            <label htmlFor="">Username</label>
                        </div>

                        <div className="input-group">
                            <input type="password" onChange={handleChange} name='password' value={formData.password} required />
                            <label htmlFor="">Password</label>
                        </div>

                        <div className="input-group">
                            <input type="password" onChange={handleChange} name='confirmPassword' value={formData.confirmPassword} required />
                            <label htmlFor="">Confirm Password</label>
                        </div>

                        <div className="btns">
                            <button className="btn btn-success" type="submit" onClick={handleSubmit}>Register</button>

                            <button className={"btn btn-info"} type="reset" onClick={handleReset}>Reset</button>

                        </div>
                        <div className="signUp-link">
                            <p>Don't have an acoount? <Link to={'/login'} className='signUpBtn-link'>Log in </Link> </p>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default RegistrationFrom;
