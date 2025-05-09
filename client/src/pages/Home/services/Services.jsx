import React from 'react'
import RootLayout from '../../../layout/RootLayout'
import ServiceCard from '../../../components/service/ServiceCard'
import { RiSecurePaymentLine, RiRefund2Line, RiBusLine, RiMapPin2Line, RiCustomerService2Line } from 'react-icons/ri';
import { PiHeadsetFill, PiLightningBold } from 'react-icons/pi';
import { MdLocalOffer, MdOutlineAirlineSeatReclineNormal, MdOutlineLocationOn } from 'react-icons/md';
import { FaRegClock, FaRoute, FaMapMarkedAlt, FaPercent, FaBusAlt, FaMapSigns } from 'react-icons/fa';
import { IoLocation } from 'react-icons/io5';

const Services = () => {
  // Hardcoded data for the top destinations
  const topDestinationsData = [
    { city: "Colombo", count: 135, color: "bg-primary" },
    { city: "Matara", count: 87, color: "bg-neutral-900" },
    { city: "Kandy", count: 64, color: "bg-primary/80" }
  ];

  return (
    <RootLayout className="space-y-16 py-12">
      {/* Hero Section - Using Red and Black Gradient */}
      <div className="relative bg-gradient-to-r from-primary to-neutral-900 rounded-3xl p-12 text-white overflow-hidden">
        {/* Decorative pattern using CSS */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-extrabold mb-6">
            Services That Make Your Journey Seamless
          </h1>
          <p className="text-xl opacity-90 mb-8">
            BusFinder provides comprehensive services to enhance your bus travel experience
            throughout Sri Lanka. Discover how we're revolutionizing bus travel.
          </p>
          <button className="px-8 py-3 bg-white text-primary font-bold text-lg rounded-lg hover:bg-neutral-100 transition-colors">
            Explore Our Network
          </button>
        </div>
      </div>

      {/* Top Destinations - Cards with Solid Colors Instead of Colorful Gradients */}
      <div className="pb-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-neutral-800">Top Destinations</h2>
          <a href="#" className="text-primary font-medium hover:underline">View all destinations →</a>
        </div>
        
        <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-8">
          {topDestinationsData.map((item, index) => (
            <div key={index} className="relative overflow-hidden group rounded-2xl h-64 bg-neutral-100">
              {/* Solid background instead of colorful gradient */}
              <div className={`absolute inset-0 ${item.color} transition-transform duration-500 group-hover:scale-105`}></div>
              <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <h3 className="text-2xl font-bold mb-1">{item.city}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-white/90">{item.count} buses daily</p>
                  <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <IoLocation className="text-white" size={16} />
                  </span>
                </div>
              </div>
              {/* Decorative dots pattern */}
              <div className="absolute top-4 right-4 opacity-30">
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Services with Premium Commercial Design */}
<div className="pb-20">
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-3xl font-bold text-neutral-800">Core Services</h2>
    <div className="h-1 w-24 bg-primary rounded-full"></div>
  </div>
  
  <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-8">
    <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl border border-neutral-100 transition-all duration-300">
      <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <RiBusLine className="text-white w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-neutral-800 mb-3">Online Booking</h3>
      <p className="text-neutral-600 mb-6">Book bus tickets online with real-time seat selection and instant confirmations</p>
      <a href="#" className="inline-flex items-center font-semibold text-primary group-hover:translate-x-2 transition-transform">
        Learn more <span className="ml-2">→</span>
      </a>
    </div>
    
    <div className="group bg-neutral-900 p-8 rounded-xl shadow-sm hover:shadow-xl border border-neutral-800 transition-all duration-300">
      <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <FaRoute className="text-white w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">Route Planning</h3>
      <p className="text-neutral-300 mb-6">Find the most convenient routes with our comprehensive network coverage</p>
      <a href="#" className="inline-flex items-center font-semibold text-primary group-hover:translate-x-2 transition-transform">
        Learn more <span className="ml-2">→</span>
      </a>
    </div>
    
    <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl border border-neutral-100 transition-all duration-300">
      <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <PiLightningBold className="text-white w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-neutral-800 mb-3">Fast Checkout</h3>
      <p className="text-neutral-600 mb-6">Complete your booking in less than 2 minutes with our streamlined process</p>
      <a href="#" className="inline-flex items-center font-semibold text-primary group-hover:translate-x-2 transition-transform">
        Learn more <span className="ml-2">→</span>
      </a>
    </div>
  </div>
</div>

{/* Customer Guarantees with Commercial Aesthetic */}
<div className="pb-20 relative overflow-hidden">
  <div className="absolute -right-32 -top-32 w-64 h-64 bg-primary/5 rounded-full"></div>
  <div className="absolute -left-32 -bottom-32 w-64 h-64 bg-primary/5 rounded-full"></div>
  
  <div className="flex flex-col items-center text-center mb-12 relative z-10">
    <h2 className="text-3xl font-bold text-neutral-800 mb-4">Customer Guarantees</h2>
    <div className="h-1 w-24 bg-primary rounded-full"></div>
    <p className="max-w-xl mt-4 text-neutral-600">We're committed to providing you with a reliable and trustworthy service for all your travel needs.</p>
  </div>
  
  <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
    <div className="bg-white rounded-2xl p-8 relative group hover:-translate-y-2 transition-transform duration-300 shadow-lg">
      <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
        <RiSecurePaymentLine className="text-white w-6 h-6" />
      </div>
      <div className="pt-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-3">Secure Payments</h3>
        <p className="text-neutral-600">Multiple secure payment options with encrypted transaction processing</p>
      </div>
      <div className="w-full h-1 bg-gradient-to-r from-primary to-primary/50 absolute bottom-0 left-0 rounded-b-2xl"></div>
    </div>
    
    <div className="bg-white rounded-2xl p-8 relative group hover:-translate-y-2 transition-transform duration-300 shadow-lg">
      <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center shadow-lg">
        <RiRefund2Line className="text-white w-6 h-6" />
      </div>
      <div className="pt-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-3">Easy Refunds</h3>
        <p className="text-neutral-600">Hassle-free cancellation and refund processes when plans change</p>
      </div>
      <div className="w-full h-1 bg-gradient-to-r from-neutral-900 to-neutral-700 absolute bottom-0 left-0 rounded-b-2xl"></div>
    </div>
    
    <div className="bg-white rounded-2xl p-8 relative group hover:-translate-y-2 transition-transform duration-300 shadow-lg">
      <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
        <PiHeadsetFill className="text-white w-6 h-6" />
      </div>
      <div className="pt-6">
        <h3 className="text-xl font-bold text-neutral-900 mb-3">24/7 Support</h3>
        <p className="text-neutral-600">Round-the-clock customer service to assist with all your travel needs</p>
      </div>
      <div className="w-full h-1 bg-gradient-to-r from-primary to-primary/50 absolute bottom-0 left-0 rounded-b-2xl"></div>
    </div>
  </div>
</div>

      {/* Premium Benefits with Black Background Instead of Blue/Indigo */}
      <div className="rounded-2xl overflow-hidden">
        <div className="relative bg-neutral-900 py-16 px-8">
          {/* Decorative pattern using CSS */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 2px)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Premium Benefits</h2>
            
            <div className="grid w-full grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  icon: MdOutlineAirlineSeatReclineNormal,
                  title: "Priority Seating",
                  desc: "Access to premium seat selection for comfortable travel"
                },
                {
                  icon: FaPercent,
                  title: "Seasonal Offers",
                  desc: "Exclusive discounts and special offers for frequent travelers"
                },
                {
                  icon: MdOutlineLocationOn,
                  title: "Door Pickup",
                  desc: "Optional door-to-door pickup service in select cities"
                },
                {
                  icon: RiCustomerService2Line,
                  title: "VIP Support",
                  desc: "Dedicated support line for premium customers"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/15 transition-colors border border-white/20">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-4">
                    <item.icon className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service Stats - Cleaner with Black/Red */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
        {[
          { value: "15+", label: "Cities Covered", icon: FaMapSigns },
          { value: "300+", label: "Daily Bus Routes", icon: FaBusAlt },
          { value: "5000+", label: "Happy Travelers", icon: FaPercent },
          { value: "99%", label: "On-time Departures", icon: FaRegClock }
        ].map((stat, index) => (
          <div key={index} className="text-center p-6 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <stat.icon className="text-primary w-5 h-5" />
            </div>
            <h3 className="text-4xl font-bold text-neutral-900 mb-2">{stat.value}</h3>
            <p className="text-neutral-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Service Request CTA - Pure Red */}
      <div className="bg-primary p-10 rounded-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Service?</h2>
            <p className="max-w-lg">
              For group bookings, corporate travel arrangements, or special assistance requests, 
              our team is ready to help customize your experience.
            </p>
          </div>
          <button className="px-8 py-4 bg-white text-primary font-bold text-lg rounded-lg hover:bg-neutral-100 transition-colors shadow-lg">
            Contact Our Team
          </button>
        </div>
      </div>
    </RootLayout>
  )
}

export default Services