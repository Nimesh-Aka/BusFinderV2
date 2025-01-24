import React, { useState, useEffect, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [credentials, setCredentials] = useState({
    userName: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [passwordStrength, setPasswordStrength] = useState({
    level: "",
    color: "",
  });

  const navigate = useNavigate();
  const { user, loading, error, dispatch } = useContext(AuthContext);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));

    // Reset the specific error for the input field being edited
  setErrors((prev) => ({ ...prev, [id]: "" }));

    if (id === "password") {
      updatePasswordStrength(value);
    }

    // Validate other fields dynamically
    switch (id) {
      case "email":
        if (!validateEmail(value)) {
          setErrors((prev) => ({
            ...prev,
            email: "Please enter a valid email address.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, email: "" }));
        }
        break;
      case "mobile":
        if (!validateMobile(value)) {
          setErrors((prev) => ({
            ...prev,
            mobile: "Please enter a valid mobile number.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, mobile: "" }));
        }
        break;
      default:
        break;
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validate mobile number format (Sri Lanka example)
  const validateMobile = (mobile) => {
    const regex = /^(?:\+94|0)?[7-9]\d{8}$/;
    return regex.test(mobile);
  };

  // Update password strength dynamically
  const updatePasswordStrength = (password) => {
    const lengthCriteria = password.length >= 8;
    const upperCaseCriteria = /[A-Z]/.test(password);
    const lowerCaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /\d/.test(password);
    const specialCharCriteria = /[@$!%*?&]/.test(password);

    const fulfilledCriteria =
      lengthCriteria +
      upperCaseCriteria +
      lowerCaseCriteria +
      numberCriteria +
      specialCharCriteria;

    if (fulfilledCriteria <= 2) {
      setPasswordStrength({ level: "Weak", color: "red" });
    } else if (fulfilledCriteria === 3) {
      setPasswordStrength({ level: "Medium", color: "orange" });
    } else if (fulfilledCriteria >= 4) {
      setPasswordStrength({ level: "Strong", color: "green" });
    } else {
      setPasswordStrength({ level: "", color: "" });
    }
  };

  // Handle login or register click
  const handleClick = async (e) => {
    e.preventDefault();
  
    if (currState === "Sign Up") {
      // Validate required fields for registration
      if (
        !credentials.userName ||
        !credentials.email ||
        !credentials.mobile ||
        !credentials.password
      ) {
        alert("Please fill in all the fields.");
        return; // Exit the function
      }
  
      // Check for terms of use agreement
      const termsCheckbox = document.querySelector('input[type="checkbox"]');
      if (!termsCheckbox.checked) {
        alert("Please agree to the terms of use & privacy policy.");
        return;
      }
  
      // Check if the password is strong enough
      if (passwordStrength.level === "Weak") {
        alert("Please choose a stronger password.");
        return;
      }
  
      try {
        // API call to check uniqueness of fields
        const uniqueRes = await axios.post("/auth/check-uniqueness", {
          userName: credentials.userName,
          email: credentials.email,
          mobile: credentials.mobile,
        });

        console.log("Response from server:", uniqueRes.data);
  
        // If there are uniqueness errors from the server, set them in the state
        if (uniqueRes.data.errors) {
          setErrors((prev) => ({
            ...prev,
            userName: uniqueRes.data.errors.userName || "",
            email: uniqueRes.data.errors.email || "",
            mobile: uniqueRes.data.errors.mobile || "",
          }));
          return; // Don't proceed with registration if any field is not unique
        }
  
        // Proceed with registration if fields are unique
        await axios.post("/auth/register", {
          userName: credentials.userName,
          email: credentials.email,
          mobile: credentials.mobile,
          password: credentials.password,
        });
  
        alert("Registration successful! Please log in.");
        setCurrState("Login");
      } catch (err) {
        if (err.response && err.response.status === 409) {
          // Handle uniqueness errors
          const { errors } = err.response.data;
          setErrors((prev) => ({
            ...prev,
            userName: errors.userName || "",
            email: errors.email || "",
            mobile: errors.mobile || "",
          }));
        } else {
          console.error("Registration error:", err);
          alert("Registration failed. Please try again.");
        }
      }
    } else if (currState === "Login") {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post("/auth/login", {
          userName: credentials.userName,
          password: credentials.password,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        alert("Login successful!");
        setShowLogin(false);
        navigate("/");
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
        
        // Handle specific error messages
        if (err.response?.status === 401) {
          // Unauthorized: invalid credentials
          const errorMessage = err.response.data?.message || "Invalid credentials.";
          if (errorMessage.includes("username")) {
            setErrors((prev) => ({ ...prev, userName: "Invalid username." }));
          } else if (errorMessage.includes("password")) {
            setErrors((prev) => ({ ...prev, password: "Incorrect password." }));
          } else {
            setErrors((prev) => ({ ...prev, userName: "", password: errorMessage }));
          }
        } else {
          console.error("Login error:", err);
          alert("Something went wrong. Please try again later.");
        }
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
      <ToastContainer />
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
          {errors.userName && <p className="text-red-500">{errors.userName}</p>}

          {/* Email (only for registration) */}
          {currState === "Sign Up" && (
            <>
              <input
                type="email"
                placeholder="Your email"
                className="p-4 border border-gray-300 rounded-md outline-none"
                id="email"
                onChange={handleChange}
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              {/* Mobile Number (only for registration) */}
              <input
                type="tel"
                placeholder="Your mobile number"
                className="p-4 border border-gray-300 rounded-md outline-none"
                id="mobile"
                onChange={handleChange}
                required
              />
              {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
            </>
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
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          {currState === "Sign Up" && credentials.password && (
            <p style={{ color: passwordStrength.color }}>
              Password Strength: {passwordStrength.level}
            </p>
          )}
        </div>

        <button
          disabled={loading}
          onClick={handleClick}
          className="flex items-center justify-center w-full text-base font-medium duration-300 ease-in-out border-2 rounded-md h-[38px] bg-primary hover:bg-transparent border-primary hover:border-primary text-neutral-50 gap-x-2 hover:text-primary"
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        {currState === "Sign Up" && (
          <div className="flex items-baseline gap-2">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}

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
