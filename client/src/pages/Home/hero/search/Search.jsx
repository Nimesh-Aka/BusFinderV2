import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TbArrowsExchange } from "react-icons/tb";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Search = ({ initialFrom = "", initialTo = "", initialDate = "" }) => {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState(initialDate);
  const [suggestions, setSuggestions] = useState([]); // Store city suggestions
  const [activeInput, setActiveInput] = useState(""); // Track which input is active

  const navigate = useNavigate();

  // Function to fetch suggestions from backend
  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]); // Clear suggestions if query is empty

    try {
      const { data } = await axios.get(`/buses/stationsList?search=${query}`);
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  // Debounced function for typing
  useEffect(() => {
    const delay = setTimeout(() => {
      if (activeInput === "from") fetchSuggestions(from);
      if (activeInput === "to") fetchSuggestions(to);
    }, 300); // Delay for 300ms

    return () => clearTimeout(delay);
  }, [from, to, activeInput]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/buses", { state: { from, to, date } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -800 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -800 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="w-full p-5 border-2 shadow-lg bg-neutral-50/20 border-neutral-300 rounded-xl"
    >
      <div className="flex items-center justify-between w-full gap-5">
        {/* From and To Input Section */}
        <div className="w-[60%] flex items-center gap-5 relative">
          {/* From */}
          <div className="relative w-1/2">
            <div className="flex items-center px-5 text-base font-medium border rounded-lg h-14 border-neutral-300 bg-white/70 text-neutral-700 gap-x-1">
              <input
                type="text"
                placeholder="From..."
                className="flex-1 h-full bg-transparent border-none focus:outline-none"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                onFocus={() => setActiveInput("from")}
                onBlur={() => setTimeout(() => setSuggestions([]), 200)} // Delay to allow click
              />
              <div className="w-5 h-5 text-neutral-400">
                <FaMapMarkerAlt className="w-full h-full" />
              </div>
            </div>
            {/* Suggestions for From */}
            {activeInput === "from" && suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded shadow-lg top-14">
                {suggestions.map((city, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setFrom(city);
                      setSuggestions([]);
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* To */}
          <div className="relative w-1/2">
            <div className="flex items-center px-5 text-base font-medium border rounded-lg h-14 border-neutral-300 bg-white/70 text-neutral-700 gap-x-1">
              <input
                type="text"
                placeholder="To..."
                className="flex-1 h-full bg-transparent border-none focus:outline-none"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                onFocus={() => setActiveInput("to")}
                onBlur={() => setTimeout(() => setSuggestions([]), 200)} // Delay to allow click
              />
              <div className="w-5 h-5 text-neutral-400">
                <FaMapMarkerAlt className="w-full h-full" />
              </div>
            </div>
            {/* Suggestions for To */}
            {activeInput === "to" && suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded shadow-lg top-14">
                {suggestions.map((city, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setTo(city);
                      setSuggestions([]);
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Exchange Button */}
          <button className="absolute flex items-center justify-center h-6 -translate-x-1/2 -translate-y-1/2 rounded-full w-11 top-1/2 left-1/2 bg-primary">
            <TbArrowsExchange className="w-6 h-6 text-neutral-50" />
          </button>
        </div>

        {/* Date and Button Section */}
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
