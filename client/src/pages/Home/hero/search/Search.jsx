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
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1); // Track highlighted item

  const navigate = useNavigate();

  // Function to fetch suggestions from backend
  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);

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
    }, 300);

    return () => clearTimeout(delay);
  }, [from, to, activeInput]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!from || !to) {
      alert("Please fill in both the 'From' and 'To' fields.");
      return;
    }
    
    // If date is empty, set today's date
    const searchDate = date?.trim() ? date : new Date().toISOString().split("T")[0];

    navigate("/buses", { state: { from, to, date: searchDate } });
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      setHighlightIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prevIndex) =>
        prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0) {
        if (activeInput === "from") setFrom(suggestions[highlightIndex]);
        if (activeInput === "to") setTo(suggestions[highlightIndex]);
        setSuggestions([]);
        setHighlightIndex(-1);
      }
    }
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
        <div className="w-[60%] flex items-center gap-5 relative">
          {/* From Input */}
          <div className="relative w-1/2">
            <div className="flex items-center px-5 text-base font-medium border rounded-lg h-14 border-neutral-300 bg-white/70 text-neutral-700 gap-x-1">
              <input
                type="text"
                placeholder="From..."
                className="flex-1 h-full bg-transparent border-none focus:outline-none"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                onFocus={() => {
                  setActiveInput("from");
                  fetchSuggestions(from);
                }}
                onKeyDown={handleKeyDown}
                onBlur={() => setTimeout(() => setSuggestions([]), 200)}
              />
              <div className="w-5 h-5 text-neutral-400">
                <FaMapMarkerAlt className="w-full h-full" />
              </div>
            </div>
            {/* Suggestions for From */}
            {activeInput === "from" && suggestions.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  zIndex: 10,
                  width: "100%",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "0.25rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  top: "3.5rem",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {suggestions.map((city, index) => (
                  <li
                    key={index}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor:
                        index === highlightIndex ? "#f0f0f0" : "white",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setHighlightIndex(index)}
                    onClick={() => {
                      setFrom(city);
                      setSuggestions([]);
                      setHighlightIndex(-1);
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* To Input */}
          <div className="relative w-1/2">
            <div className="flex items-center px-5 text-base font-medium border rounded-lg h-14 border-neutral-300 bg-white/70 text-neutral-700 gap-x-1">
              <input
                type="text"
                placeholder="To..."
                className="flex-1 h-full bg-transparent border-none focus:outline-none"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                onFocus={() => {
                  setActiveInput("to");
                  fetchSuggestions(to);
                }}
                onKeyDown={handleKeyDown}
                onBlur={() => setTimeout(() => setSuggestions([]), 200)}
              />
              <div className="w-5 h-5 text-neutral-400">
                <FaMapMarkerAlt className="w-full h-full" />
              </div>
            </div>
            {/* Suggestions for To */}
            {activeInput === "to" && suggestions.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  zIndex: 10,
                  width: "100%",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "0.25rem",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  top: "3.5rem",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {suggestions.map((city, index) => (
                  <li
                    key={index}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor:
                        index === highlightIndex ? "#f0f0f0" : "white",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setHighlightIndex(index)}
                    onClick={() => {
                      setTo(city);
                      setSuggestions([]);
                      setHighlightIndex(-1);
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Date and Search */}
        <div className="flex items-center flex-1 gap-5 h-14">
          <div className="flex items-center flex-1 h-full px-5 text-base font-medium border rounded-lg border-neutral-300 bg-white/70 text-neutral-700 gap-x-1">
            <input
              type="date"
              className="flex-1 h-full bg-transparent border-none focus:outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

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
