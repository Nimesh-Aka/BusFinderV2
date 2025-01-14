import React, { useState, useEffect, useContext } from 'react';
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [credentials, setCredentials] = useState({
    userName: undefined,
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();
  const { user, loading, error, dispatch } = useContext(AuthContext);

  // Handle input changes
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle login or register click
  const handleClick = async (e) => {
    e.preventDefault();
    if (currState === "Login") {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("/auth/login", {
          userName: credentials.userName,
          password: credentials.password,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        setShowLogin(false);
        navigate("/");
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      }
    } else {
      // Registration logic
      try {
        await axios.post("/auth/register", {
          userName: credentials.userName,
          email: credentials.email,
          password: credentials.password,
        });
        alert("Registration successful! Please log in.");
        setCurrState("Login");
      } catch (err) {
        console.error("Registration error:", err);
        alert("Registration failed. Please try again.");
      }
    }
  };

  // Prevent scrolling when the popup is active
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="absolute z-10 grid w-full h-full bg-black/60">
      <form className="place-self-center max-w-[23vw] sm:max-w-[330px] text-gray-500 bg-white flex flex-col gap-6 p-8 rounded-lg text-sm animate-fadeIn">
        <div className="flex items-center justify-between text-black">
          <h1 className="text-xl font-bold">{currState}</h1>
          <RxCross2
            onClick={() => setShowLogin(false)}
            className="cursor-pointer w-7 h-7"
          />
        </div>
        <div className="flex flex-col gap-4">
          {/* Username */}
          <input
            type="text"
            placeholder="Your username"
            className="p-4 border border-gray-300 rounded-md outline-none"
            id="userName"
            onChange={handleChange}
            required
          />
          {currState === "Sign Up" && (
            // Email (only for registration)
            <input
              type="email"
              placeholder="Your email"
              className="p-4 border border-gray-300 rounded-md outline-none"
              id="email"
              onChange={handleChange}
              required
            />
          )}
          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="p-4 border border-gray-300 rounded-md outline-none"
            required
          />
        </div>

        <button
          disabled={loading}
          onClick={handleClick}
          className="flex items-center justify-center w-full text-base font-medium duration-300 ease-in-out border-2 rounded-md h-[38px] bg-primary hover:bg-transparent border-primary hover:border-primary text-neutral-50 gap-x-2 hover:text-primary"
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="flex items-baseline gap-2">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="px-1 font-medium cursor-pointer text-primary"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="px-1 font-medium cursor-pointer text-primary"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
