import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Booking from "./pages/Booking/Booking";
import { BrowserRouter } from "react-router-dom";
import Buses from "./pages/Buses/Buses";
import { SearchContextProvider } from "./Context/SearchContext";

function App() {
  return (
    <SearchContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buses" element={<Buses />} />
          <Route path="/buses/:id" element={<Booking />} />
        </Routes>
      </BrowserRouter>
    </SearchContextProvider>
  );
}

export default App;
