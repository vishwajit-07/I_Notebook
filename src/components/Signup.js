import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success === true) {
            //redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/login");
            props.showAlert("Account created successfully", "success");
        }
        else {
            props.showAlert("Invalid Creadentials", "denger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    // const [formData, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: ""
    // });

    // const [error, setError] = useState("");
    // let navigate = useNavigate();  // Initialize the useNavigate hook

    // const onChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // Check if passwords match
    //     if (formData.password !== formData.confirmPassword) {
    //         setError("Passwords do not match");
    //         return;
    //     }

    //     // Handle form submission logic here
    //     try {
    //         const response = await fetch('http://localhost:5000/api/auth/createuser', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 name: formData.name,
    //                 email: formData.email,
    //                 password: formData.password
    //             })
    //         });

    //         const json = await response.json();
    //         console.log(json);

    //         // If registration is successful, redirect to the login page
    //         if (json.success) {
    //             setError(json.error || "Registration failed. Please try again.");

    //         } else {
    //             alert("Registration successful!");
    //             setError("");  // Clear any previous errors
    //             navigate('/login');  // Redirect to login page
    //         }
    //     } catch (error) {
    //         setError("Error occurred during registration.");
    //     }
    // };

    return (
        <div>
            <form className='container shadow p-4' onSubmit={handleSubmit}>
            <h2 style={{ textAlign:"center" }}>Create an account to continue iNotebook</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        onChange={onChange}
                        placeholder='Enter your name'
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={onChange}
                        placeholder='Enter your email'
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder='Enter your password minimum 5 characters'
                        onChange={onChange}
                        required
                        minLength={5}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder='Enter your password minimum 5 characters'
                        onChange={onChange}
                        required
                        minLength={5}
                    />
                </div>

                {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default Signup;
