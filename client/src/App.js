import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { BrowserRouter } from "react-router-dom";
import Buses from "./pages/Buses/Buses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buses" element={<Buses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
