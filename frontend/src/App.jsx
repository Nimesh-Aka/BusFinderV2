import React, { useEffect, useState } from 'react';
import Background from './Components/Background/Background';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import Footer from './Components/Footer/Footer';
import Main from './Pages/Main/Main';
import {  Routes, Route } from 'react-router-dom';




const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  

  let heroDAta = [
    { text1: "Find your seat", text2: "and enjoy the journey" },
    { text1: "Convenience for", text2: "owners and travelers" },
    { text1: "Book with ease", text2: "ride with comfort" },
  ];

  const [heroCount, setHeroCount] = useState(2);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((count) => (count === 2 ? 0 : count + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  

  const openLoginPopup = (register = false) => {
    setIsRegister(register);
    setShowLogin(true);
  };

  const closeLoginPopup = () => {
    setShowLogin(false);
  };

  return (
    <>
    
    <div>
     
      <Background playStatus={playStatus} heroCount={heroCount} />
      <Navbar openLoginPopup={openLoginPopup} />
      <Main />
      
      <Hero 
        setPlayStatus={setPlayStatus}
        heroDAta={heroDAta[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        playStatus={playStatus}
      />
      
      {showLogin && (
        <LoginPopup 
          isRegister={isRegister} 
          closeLoginPopup={closeLoginPopup} 
          setIsRegister={setIsRegister} 
        />
      )}
      
    </div>

    <Footer />
    </>
  );
};

export default App;
