import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Booking from "./pages/Booking/Booking";
import { BrowserRouter } from "react-router-dom";
import Buses from "./pages/Buses/Buses";
import { SearchContextProvider } from "./Context/SearchContext";
import SignUp from "./pages/SignUP/Signup";
import SignIn from "./pages/SignIN/Signin";


function App() {
  return (
    <SearchContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buses" element={<Buses />} />
          <Route path="/buses/:id" element={<Booking />} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/sign-in" element={<SignIn/>} />
        </Routes>
      </BrowserRouter>
    </SearchContextProvider>
  );
}

export default App;
