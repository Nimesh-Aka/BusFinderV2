import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ openLoginPopup }) => {
  const [menu, setMenu] = useState("Main");

  return (
    <div className="navbar">
      <div className="navbar__logo">BUS FINDER</div>
      <ul className="navbar_menu">
        <li onClick={() => setMenu("Main")} className={menu === "Main" ? "navbar_active" : ""}>Main</li>
        <li onClick={() => setMenu("About")} className={menu === "About" ? "navbar_active" : ""}>About Us</li>
        <li onClick={() => setMenu("Contact")} className={menu === "Contact" ? "navbar_active" : ""}>Contact</li>
        <li onClick={() => setMenu("Help")} className={menu === "Help" ? "navbar_active" : ""}>Help</li>
        <li className="navbar_login" onClick={() => openLoginPopup(false)}>Login</li>
        <li className="navbar_signup" onClick={() => openLoginPopup(true)}>Join Now</li>
      </ul>
    </div>
  );
};

export default Navbar;
