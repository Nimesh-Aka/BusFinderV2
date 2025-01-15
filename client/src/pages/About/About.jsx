import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./About.css";
import Footer from "../../components/Footer/Footer";

const About = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="about">
          <h1>About Us</h1>
          <p>
            Welcome to Bus Finder, your one-stop solution for seamless bus seat
            reservations. Our platform connects travelers with a wide network of
            bus services across various routes, making it easier to find and
            reserve seats online.
          </p>
          <p>
            Whether you are planning a long trip or a daily commute, Bus Finder
            provides you with up-to-date schedules, seat availability, and easy
            payment options to simplify your travel experience.
          </p>
          <p>
            Our mission is to make travel more convenient and accessible for
            everyone. Thank you for choosing us!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
