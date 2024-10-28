import React from 'react'
import './Footer.css'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
     <div className="footer-content">
        <div className="footer-content-left">
            <h1>BUS FINDER</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book.</p>
           
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>

        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>077-2958177</li>
                <li>contact@mango.com</li>
            </ul>
        </div>
     </div>
     <hr/> 
     <p className="footer-copyright">Coppyright 2024 @ Mango.com-all right reserved</p>  
    </div>
  )
}

export default Footer
