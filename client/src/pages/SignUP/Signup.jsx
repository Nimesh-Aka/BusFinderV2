import React, { useState } from 'react';
import './Signup.css';
import Navbar from '../../components/Navbar/Navbar';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Name:", name, "Email:", email, "Password:", password);
    };

    return (
        <div>
            <Navbar/>
            <div className="signup-container">
                <div className="signup-card">
                    <h2 className="signup-title">Register</h2>
                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="signup-field">
                            <label className="signup-label">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="signup-input"
                                required
                            />
                        </div>
                        <div className="signup-field">
                            <label className="signup-label">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="signup-input"
                                required
                            />
                        </div>
                        <div className="signup-field">
                            <label className="signup-label">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="signup-input"
                                required
                            />
                        </div>
                        <button type="submit" className="signup-button">
                            Register
                        </button>
                    </form>
                    <p className="signup-footer">
                        Already have an account? <a href="/login" className="signup-link">Login</a>
                    </p>
                </div>
            </div>
        </div>

    );
};

export default SignUp;
