import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUP/Signup";
import SignIn from "./pages/SignIN/Signin";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Ticket from "./pages/ticket/Ticket";
import Checkout from "./pages/ticket/checkout/Checkout"
import Detail from "./pages/ticket/detail/Detail"
import LoginPopup from "./components/loginpopup/LoginPopup"
import { AuthContextProvider } from "./Context/AuthContext";

function App() {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <BrowserRouter>
      <AuthContextProvider>
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buses" element={<Ticket />} />
          <Route path="/buses/:id" element={<Detail />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bus-tickets/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
