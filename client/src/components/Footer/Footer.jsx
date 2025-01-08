import React from 'react'
import RootLayout from '../../layout/RootLayout'//importing the RootLayout component    
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import MasterCardImg from "../../assets/mastercard.png"
import PaypalImg from "../../assets/paypal.png"
import CreditCardImg from "../../assets/creditcard.png"
const Footer = () => {
  return (
    <div className='w-full h-auto py-12 bg-neutral-950'>   
      <RootLayout className="space-y-10"> {/* RootLayout component is used here */}
        
        {/* Footer other content */}
        <div className="grid w-full grid-cols-5 gap-8">
           <div className="col-span-2 pr-0 space-y-8 md:pr-10">
            <div className="space-y-3">
            {/* Logo */}
            <Link to="/" className='text-6xl font-bold text-primary'>
            BusFinder
            </Link>
           

           {/* some description */ }
           <p className="text-sm font-normal text-neutral-500">
           BusFinder is your reliable companion for seamless bus travel across Sri Lanka. Our platform connects passengers and bus operators, enabling convenient seat reservations, route exploration, and secure online payments. Designed for efficiency and simplicity, BusFinder ensures a stress-free travel planning experience for everyone.
           </p>
           </div>

                {/* social links */}
                <div className="flex items-center w-full gap-x-5">

                    <div className="flex items-center justify-center duration-500 ease-in-out cursor-pointer w-11 h-11 rounded-xl bg-neutral-800/40 hover:bg-primary">
                    <FaInstagram className='w-5 h-5 text-neutral-50'/>
                    </div>

                    <div className="flex items-center justify-center duration-500 ease-in-out cursor-pointer w-11 h-11 rounded-xl bg-neutral-800/40 hover:bg-primary">
                    <FaFacebook className='w-5 h-5 text-neutral-50'/>
                    </div>

                    <div className="flex items-center justify-center duration-500 ease-in-out cursor-pointer w-11 h-11 rounded-xl bg-neutral-800/40 hover:bg-primary">
                    <FaYoutube className='w-5 h-5 text-neutral-50'/>
                    </div>

                    <div className="flex items-center justify-center duration-500 ease-in-out cursor-pointer w-11 h-11 rounded-xl bg-neutral-800/40 hover:bg-primary">
                    <FaXTwitter className='w-5 h-5 text-neutral-50'/>
                    </div>

                </div>
           </div>
           <div className="col-span-1 space-y-5">
            <h1 className="text-lg font-semibold text-neutral-100">
                Quick Links
            </h1>

            <div className="space-y-2">
                <Link to="/" className='block text-base font-normal duration-300 ease-in-out text-neutral-500 hover:text-neutral-300'>
                About Us
                </Link>

                <Link to="/" className='block text-base font-normal duration-300 ease-in-out text-neutral-500 hover:text-neutral-300'>
                My Account
                </Link>

                <Link to="/" className='block text-base font-normal duration-300 ease-in-out text-neutral-500 hover:text-neutral-300'>
                Reserve your ticket
                </Link>

                <Link to="/" className='block text-base font-normal duration-300 ease-in-out text-neutral-500 hover:text-neutral-300'>
                Create your account
                </Link>
            </div>
           </div>

           <div className="col-span-1 space-y-5">
           <h1 className="text-lg font-semibold text-neutral-100">
                Top Reserved Routes
            </h1>

            <div className="space-y-2">
                <Link to="/" className='block text-base font-normal duration-300 ease-in-out text-neutral-500 hover:text-neutral-300'>
                Matara - Galle
                </Link>

                <Link to="/" className='block text-base font-normal duration-300 ease-in-out text-neutral-500 hover:text-neutral-300'>
                Matara - Colombo
                </Link>

                <Link to="/" className='block text-base font-normal duration-300 ease-in-out text-neutral-500 hover:text-neutral-300'>
                Colombo - Kandy
                </Link>

                <Link to="/" className='block text-base font-normal duration-300 ease-in-out text-neutral-500 hover:text-neutral-300'>
                Colombo - Jaffna
                </Link>
            </div>
           </div>

           <div className="col-span-1 space-y-5">
            <h1 className="text-lg font-semibold text-neutral-100">
                Support Links
            </h1>

            <div className="space-y-2">
                <Link to="/" className='block text-base font-normal duration-300 ease-in-out text-neutral-500 hover:text-neutral-300'>
                Privacy Policy
                </Link>

                <Link to="/" className='block text-base font-normal duration-300 ease-in-out text-neutral-500 hover:text-neutral-300'>
                Terms &Conditions
                </Link>

                <Link to="/" className='block text-base font-normal duration-300 ease-in-out text-neutral-500 hover:text-neutral-300'>
                Help & support Center
                </Link>

                <Link to="/" className='block text-base font-normal duration-300 ease-in-out text-neutral-500 hover:text-neutral-300'>
                FaQs
                </Link>
            </div>
           </div>
        </div>

        {/* Seperator */}
        <div className="w-full h-px bg-neutral-800/50"  />

        {/* Copyright */}
        <div className="flex items-center justify-between w-full">
            <p className="text-sm font-normal text-neutral-600">
                Coppyright & Coppy; 2025. All rights reserved.
            </p>
            <div className="flex item-center gap-x-2">
                <div className="">
                    <img src={MasterCardImg} alt="" className="object-contain object-center w-fit h-9" />
                </div>
                <div className="">
                    <img src={PaypalImg} alt="" className="object-contain object-center w-fit h-9" />
                </div>
                <div className="">
                    <img src={CreditCardImg} alt="" className="object-contain object-center w-fit h-9" />
                </div>
            </div>
        </div>

      </RootLayout>
    </div>
  )
}






export default Footer
