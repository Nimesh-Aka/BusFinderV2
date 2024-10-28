import React from 'react';
import './LoginPopup.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const LoginPopup = ({ isRegister, closeLoginPopup, setIsRegister }) => {
  const toggleForm = () => setIsRegister(!isRegister);

  return (
    <div className={`wrapper ${isRegister ? 'active' : ''}`}>
      <div className="form-box login">
        <form>
          <h1>Login</h1>
          <RxCross1 className="close" onClick={closeLoginPopup} />
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="register-link">
            <p>Don't have an account? <a href="#" onClick={toggleForm}>Register</a></p>
          </div>
        </form>
      </div>
      
      <div className="form-box register">
        <form>
          <h1>Registration</h1>
          <RxCross1 className="close" onClick={closeLoginPopup} />
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label><input type="checkbox" /> I agree to the terms & conditions</label>
          </div>
          <button type="submit">Register</button>
          <div className="register-link">
            <p>Already have an account? <a href="#" onClick={toggleForm}>Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
