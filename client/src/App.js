import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Booking from "./pages/Booking/Booking";
import { BrowserRouter } from "react-router-dom";
import { SearchContextProvider } from "./Context/SearchContext";
import SignUp from "./pages/SignUP/Signup";
import SignIn from "./pages/SignIN/Signin";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Ticket from "./pages/ticket/Ticket";


function App() {
  return (
    <SearchContextProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buses" element={<Ticket />} />
          <Route path="/buses/:id" element={<Booking />} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </SearchContextProvider>
  );
}

export default App;
