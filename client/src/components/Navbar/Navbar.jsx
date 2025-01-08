import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa';
import { FaX } from "react-icons/fa6";


const Navbar = ({setShowLogin}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);

  //Navbar items
  const navItems = [
    { label: "Home", link: "/" },
    { label: "Services", link: "/services" },
    { label: "Tickets", link: "/bus-tickets" },
    { label: "About", link: "/about" }
  ]

  //handle click open
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // to make the navbar sticky and the hide when scrolling up and showing when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollState = window.scrollY;

      //determent visibility of the navbar based on scroll position
      if (currentScrollState > scrollPosition && currentScrollState > 50) {
        setIsVisible(false); //hide the navbar when scrolling up
      } else {
        setIsVisible(true); //show the navbar when scrolling up and at the top
      }
      setScrollPosition(currentScrollState);
    };
     
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  }, [scrollPosition]);

  return (
    <nav
      className={`w-full h-[8ch] fixed top-0 left-0 lg:px-24 md:px-16 sm:px-7 px-4 backdrop-blur-lg transition-transform duration-300 z-50 
      ${isVisible ? "translate-y-0" : "-translate-y-full"}  
      ${scrollPosition > 50 ? "bg-violet-200" : "bg-neutral-100/10"}`}
    >
      <div className="flex items-center justify-between w-full h-full">
        {/*Logo section*/}
        <Link to="/" className='text-4xl font-bold text-primary'>
          BusFinder
        </Link>

        {/* Hamburger menu*/}
        <div className="flex flex-col items-center justify-center gap-1 cursor-pointer w-fit md:hidden text-neutral-700" onClick={handleOpen}>
          {
            open
              ?
              <FaX className='w-5 h-5' />
              :
              <FaBars className='w-5 h-5' />
          }
        </div>


        {/* Nav links and button*/}
        <div className={`${open ? "flex absolute top-20 left-0 w-full h-auto md:relative" : "hidden"} flex-1 md:flex flex-col md:flex-row md:gap-14 gap-8 md:items-center items-start md:p-0 sm:p-4 p-4 justify-end md:bg-transparent bg-neutral-50 border md:border-transparent border-neutral-200 md:shadow-none sm:shadow-md shadow-md rounded-xl`}>
          {/* Nav Links */}
          <ul className="flex flex-col flex-wrap items-start gap-4 text-lg font-normal list-none md:items-center md:flex-row md:gap-8 text-neutral-500 ">

            {navItems.map((item, ind) => (
              <li key={ind}>
                <Link to={item.link} className='duration-100 ease-in-out hover:text-primary'>
                  {item.label}
                </Link>
              </li>
            ))}

          </ul>

          {/* Button */}
          <div className='flex items-center justify-center'>
            <button className="w-full px-6 py-2.5 btn md:w-fit md:px-4 md:py-1 bg-primary hover:bg-transparent border border-primary hover:border-primary md:rounded-full rounded-xl text-base font-normal text-neutral-50 hover:text-primary ease-in-out duration-300 " onClick={() => setShowLogin(true)}>
              Sign in
            </button>
          </div>
        </div>


      </div>
    </nav>
  )
}

export default Navbar