import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { BrowserRouter } from "react-router-dom";
import Services from "./pages/Home/services/Services";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Ticket from "./pages/ticket/Ticket";
import Checkout from "./pages/ticket/checkout/Checkout"
import Detail from "./pages/ticket/detail/Detail"
import LoginPopup from "./components/loginpopup/LoginPopup"
import { AuthContextProvider } from "./Context/AuthContext";
import Invoice from "./pages/ticket/invoice/Invoice"
import PaymentSuccess from "./pages/ticket/checkout/passengerdata/payment/PaymentSuccess";

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
          <Route path="/services" element={<div className="my-10 pt-10"><Services /></div>} />
          <Route path="/buses/:id" element={<Detail />} />
          <Route path="/about" element={<div className="my-10 pt-10"><About /> </div>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bus-tickets/checkout" element={<Checkout />} />
          <Route path="/bus-tickets/payment" element={<Invoice/>} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/bus-tickets" element={<div className="my-10 pt-10"><Ticket /></div>} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
