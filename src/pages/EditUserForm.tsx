import '../pages/css/RegistrationFrom.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from "react";
import axios from "axios";

const EditUserFrom = () => {
    const id: number = 2;

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/get/${id}`);
                console.log(res.data);
                setFormData({
                    fullName: res.data.fullName ?? "",
                    email: res.data.email ?? "",
                    username: res.data.username ?? "",
                    password: res.data.password ?? "",
                    confirmPassword: res.data.confirmPassword ?? ""
                });
            } catch (error) {
                console.error("Failed to fetch student:", error);
            }
        };
        fetchStudent();
    }, [id]);

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
            const response = await axios.put(
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
        <div className="card">
            <div className="gradient-bar"></div>

            <form className="form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

                <label>Full Name</label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Name"
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />

                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="User"
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="******"
                />

                <label>Repeat Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="******"
                />

                <div className="btn-div">
                    <button type="submit" className="btn btn-success">Submit</button>
                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>

            </form>
        </div>
    );
};

export default EditUserFrom;

