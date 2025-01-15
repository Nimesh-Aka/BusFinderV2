import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TbArrowsExchange } from 'react-icons/tb';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Search = ({ initialFrom = '', initialTo = '', initialDate = '' }) => {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState(initialDate); // Add state for date

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/buses', { state: { from, to, date } }); // Include date in the navigation state
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -800 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -800 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="w-full p-5 border-2 shadow-lg bg-neutral-50/20 border-neutral-300 rounded-xl"
    >
      <div className="flex items-center justify-between w-full gap-5">
        {/* from and to input section */}
        <div className="w-[60%] flex items-center gap-5 relative">
          {/* From */}
          <div className="flex items-center w-1/2 px-5 text-base font-medium border rounded-lg h-14 border-neutral-300 bg-white/70 text-neutral-700 gap-x-1">
            <input
              type="text"
              placeholder="From..."
              className="flex-1 h-full bg-transparent border-none focus:outline-none"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <div className="w-5 h-5 text-neutral-400">
              <FaMapMarkerAlt className="w-full h-full" />
            </div>
          </div>

          {/* To */}
          <div className="flex items-center w-1/2 px-5 text-base font-medium border rounded-lg h-14 border-neutral-300 bg-white/70 text-neutral-700 gap-x-1">
            <input
              type="text"
              placeholder="To..."
              className="flex-1 h-full bg-transparent border-none focus:outline-none"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <div className="w-5 h-5 text-neutral-400">
              <FaMapMarkerAlt className="w-full h-full" />
            </div>
          </div>

          {/* Exchange button */}
          <button className="absolute flex items-center justify-center h-6 -translate-x-1/2 -translate-y-1/2 rounded-full w-11 top-1/2 left-1/2 bg-primary">
            <TbArrowsExchange className="w-6 h-6 text-neutral-50" />
          </button>
        </div>

        {/* Date and button section */}
        <div className="flex items-center flex-1 gap-5 h-14">
          {/* Date */}
          <div className="flex items-center flex-1 h-full px-5 text-base font-medium border rounded-lg border-neutral-300 bg-white/70 text-neutral-700 gap-x-1">
            <input
              type="date"
              className="flex-1 h-full bg-transparent border-none focus:outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center h-full px-5 text-base font-medium duration-300 ease-in-out border-2 w-fit bg-primary hover:bg-transparent border-primary hover:border-primary rounded-xl text-neutral-50 gap-x-2 hover:text-primary"
          >
            <FaSearch />
            Search
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Search;
