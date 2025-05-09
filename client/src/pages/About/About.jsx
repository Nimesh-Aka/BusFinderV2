import React from "react";
import RootLayout from "../../layout/RootLayout";
import {
  FaRoute,
  FaShieldAlt,
  FaUsers,
  FaHistory,
  FaBus,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      name: "David Chen",
      position: "CTO",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      name: "Amal Perera",
      position: "Head of Operations",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
    },
    {
      name: "Priya Sharma",
      position: "Customer Experience Lead",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <RootLayout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-neutral-900 rounded-2xl p-10 md:p-16 text-white overflow-hidden mb-12">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Revolutionizing Bus Travel Across Sri Lanka
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-0">
            BusFinder connects travelers with the largest network of bus
            services, making your journey seamless from booking to arrival.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <div className="mb-16">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Our Mission
            </h2>
            <div className="h-1 w-24 bg-primary rounded-full mb-6"></div>
            <p className="text-neutral-600 mb-4">
              At BusFinder, we're committed to transforming how people travel by
              bus across Sri Lanka. We believe that bus travel should be
              convenient, reliable, and accessible to everyone.
            </p>
            <p className="text-neutral-600 mb-6">
              Our platform combines cutting-edge technology with deep industry
              knowledge to create a seamless booking experience that empowers
              travelers and transport providers alike.
            </p>
            <div className="space-y-3">
              {[
                "Making travel convenient for over 50,000 monthly users",
                "Supporting local transport providers and communities",
                "Reducing travel stress with reliable, real-time information",
                "Creating a sustainable transportation ecosystem",
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <IoMdCheckmarkCircleOutline
                    className="text-primary mr-2 flex-shrink-0"
                    size={20}
                  />
                  <span className="text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 bg-neutral-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Impact Since 2023</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white/10 rounded-xl">
                <div className="text-3xl font-bold text-primary mb-1">
                  150,000+
                </div>
                <div className="text-sm text-white/80">Seats Booked</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl">
                <div className="text-3xl font-bold text-primary mb-1">45+</div>
                <div className="text-sm text-white/80">Transport Partners</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl">
                <div className="text-3xl font-bold text-primary mb-1">25+</div>
                <div className="text-sm text-white/80">Cities Connected</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl">
                <div className="text-3xl font-bold text-primary mb-1">98%</div>
                <div className="text-sm text-white/80">
                  Customer Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story - Redesigned with modern timeline approach */}
      <div className="mb-12 bg-neutral-900 -mx-4 p-10 rounded-xl text-white">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Story</h2>
        <div className="h-1 w-24 bg-primary rounded-full mx-auto mb-8"></div>

        <div className="max-w-3xl mx-auto mb-10">
          <p className="text-white/90 mb-4">
            BusFinder was born from a simple yet significant problem faced by
            our founder while trying to travel from Colombo to Kandy during a
            holiday season. After spending hours in lines and dealing with
            uncertainty, the idea for a digital solution became clear.
          </p>
          <p className="text-white/90">
            Today, BusFinder is Sri Lanka's fastest-growing bus reservation
            platform, offering not just tickets but peace of mind for travelers
            across the country.
          </p>
        </div>

        {/* Timeline design */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary/30"></div>

          {/* Timeline elements */}
          <div className="space-y-8 relative">
            {/* 2023 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-primary">2023</h3>
                <p className="text-white/80">
                  BusFinder launched with coverage of major routes between
                  Colombo and 5 major cities
                </p>
              </div>
              <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center z-10 mx-auto md:mx-0">
                <FaHistory className="text-white" size={18} />
              </div>
              <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
            </div>

            {/* 2024 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
              <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center z-10 mx-auto md:mx-0">
                <FaBus className="text-white" size={18} />
              </div>
              <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0 md:text-left">
                <h3 className="text-2xl font-bold text-primary">2024</h3>
                <p className="text-white/80">
                  Expanded to 25+ cities and partnered with 45+ bus operators
                  across Sri Lanka
                </p>
              </div>
            </div>

            {/* 2025 */}
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-primary">2025</h3>
                <p className="text-white/80">
                  Introducing real-time tracking and expanding to international
                  routes to neighboring countries
                </p>
              </div>
              <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center z-10 mx-auto md:mx-0">
                <FaMapMarkerAlt className="text-white" size={18} />
              </div>
              <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Core Values - Redesigned with more commercial look */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-neutral-800">
            Our Core Values
          </h2>
          <div className="h-1 w-24 bg-primary rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-t-primary">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                <FaUsers className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold text-neutral-800">
                Customer First
              </h3>
            </div>
            <p className="text-neutral-600 text-sm">
              Every decision we make begins and ends with our customers' needs.
              We prioritize convenience, transparency, and reliability in all
              our services.
            </p>
          </div>

          <div className="group bg-neutral-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-t-primary">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                <FaRoute className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Innovation</h3>
            </div>
            <p className="text-neutral-300 text-sm">
              We continuously strive to improve our platform with new features
              and solutions that enhance the bus travel experience across Sri
              Lanka.
            </p>
          </div>

          <div className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-t-primary">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                <FaShieldAlt className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold text-neutral-800">
                Reliability
              </h3>
            </div>
            <p className="text-neutral-600 text-sm">
              We believe in providing accurate information and dependable
              service that our customers can trust every time they travel with
              our partner services.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Team - Modern Professional Design */}
      <div className="mb-20 relative">
        {/* Background decorative elements */}
        <div className="absolute right-0 top-20 w-64 h-64 bg-primary/5 rounded-full -z-10 blur-xl"></div>
        <div className="absolute left-0 bottom-20 w-64 h-64 bg-neutral-900/5 rounded-full -z-10 blur-xl"></div>

        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-800 mb-4">
            Leadership Team
          </h2>
          <div className="h-1 w-32 bg-primary rounded-full mb-6"></div>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            Our leadership brings together expertise from technology,
            transportation, and customer experience to revolutionize how Sri
            Lanka travels.
          </p>
        </div>

        {/* CEO Section - Centered with subtle arrow indicators */}
        <div className="mb-16 flex justify-center">
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-10 rounded-2xl shadow-xl relative overflow-hidden max-w-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 bg-primary text-white rounded-xl font-bold text-3xl flex items-center justify-center shadow-lg mb-6">
                SB
              </div>

              <div>
                <div className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium mb-4">
                  Chief Executive Officer
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">
                  Saranga Bandara
                </h3>
                <p className="text-white/80">
                  Driving BusFinder's vision and strategic growth with over 15
                  years of experience in transportation and technology
                  innovation. Under his leadership, BusFinder has revolutionized
                  bus travel across Sri Lanka.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Triangle indicators pointing down */}
        <div className="hidden md:flex justify-center mb-8">
          <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-t-primary border-r-[10px] border-r-transparent"></div>
        </div>

        {/* Executive Team - Grid Layout with themed backgrounds */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Team Member 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-primary relative group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="mb-6 flex items-center justify-between relative z-10">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-lg font-bold flex items-center justify-center mr-3 text-lg">
                  NA
                </div>
                <div className="h-10 w-[1px] bg-neutral-200 mr-3"></div>
                <div className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-700">
                  Management
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-neutral-800 mb-2">
              Nimesh Akarshana
            </h3>
            <p className="text-primary font-medium text-sm mb-4">
              Project Manager
            </p>

            <p className="text-neutral-600 text-sm">
              Coordinates all project activities and ensures timely delivery of
              features. Expert in agile methodologies and team leadership.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-primary relative group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="mb-6 flex items-center justify-between relative z-10">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-lg font-bold flex items-center justify-center mr-3 text-lg">
                  RR
                </div>
                <div className="h-10 w-[1px] bg-neutral-200 mr-3"></div>
                <div className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-700">
                  Development
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-neutral-800 mb-2">
              Rithik Roshen
            </h3>
            <p className="text-primary font-medium text-sm mb-4">
              Full Stack Developer
            </p>

            <p className="text-neutral-600 text-sm">
              Architects and develops core platform features with expertise in
              modern web technologies and scalable systems.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-primary relative group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="mb-6 flex items-center justify-between relative z-10">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-lg font-bold flex items-center justify-center mr-3 text-lg">
                  HK
                </div>
                <div className="h-10 w-[1px] bg-neutral-200 mr-3"></div>
                <div className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-700">
                  Development
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-neutral-800 mb-2">
              Hirusha Kularathana
            </h3>
            <p className="text-primary font-medium text-sm mb-4">
              Full Stack Developer
            </p>

            <p className="text-neutral-600 text-sm">
              Creates seamless user experiences with front-end mastery and
              robust backend solutions for the platform.
            </p>
          </div>

          {/* Team Member 4 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-primary relative group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="mb-6 flex items-center justify-between relative z-10">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary text-white rounded-lg font-bold flex items-center justify-center mr-3 text-lg">
                  NH
                </div>
                <div className="h-10 w-[1px] bg-neutral-200 mr-3"></div>
                <div className="px-3 py-1 bg-neutral-100 rounded-full text-xs font-medium text-neutral-700">
                  Mobile
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-neutral-800 mb-2">
              Navindu Hasalanka
            </h3>
            <p className="text-primary font-medium text-sm mb-4">
              Mobile Developer
            </p>

            <p className="text-neutral-600 text-sm">
              Designs and develops our mobile applications, ensuring smooth
              performance and intuitive interfaces for travelers.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA - Improved design */}
      <div className="bg-gradient-to-r from-primary to-neutral-900 p-8 rounded-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Have Questions?</h2>
            <p className="max-w-md text-white/90">
              We'd love to hear from you. Our team is always ready to assist
              with any questions about our service.
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-3 bg-white text-primary font-bold text-base rounded-lg hover:bg-neutral-100 transition-colors shadow flex items-center">
              <RiCustomerService2Fill className="mr-2" />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default About;
