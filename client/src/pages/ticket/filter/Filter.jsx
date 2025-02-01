import React, { useState, useEffect } from "react";
import axios from "axios";
import PriceRangeSlider from "../../../components/pricerange/PriceRangeSlider";

const Filter = ({ className, setBuses, from, to, date }) => {
  const [rangeValues, setRangeValues] = useState({ min: 0, max: 10000 });
  const [sortBy, setSortBy] = useState("priceAsc");
  const [filters, setFilters] = useState({
    busTypes: [],
    companies: [],
    amenities: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFilteredBuses = async () => {
    try {
      const response = await axios.post("/buses/filter", {
        sortBy,
        busType: filters.busTypes,
        busOwnership: filters.companies,
        busAmenities: filters.amenities,
        fromCity: from,
        toCity: to,
        busDepartureDate: date,
      });
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching filtered buses:", error);
      setError("Failed to apply filters. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleFilterChange = (filterType, value) => (e) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: e.target.checked
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value)
    }));
  };

  return (
    <div className={`w-full ${className}`}>
      <h1 className="text-xl font-semibold text-neutral-700">Apply Filters</h1>

      {/* Sorting */}
      <div className="w-full p-4 space-y-3 border border-neutral-300 rounded-xl">
       
        <h1 className="text-lg font-medium text-neutral-600">Sort By</h1>
        <select
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>
    
      {/* Price Filter 
      <div className="w-full p-4 space-y-3 border border-neutral-300 rounded-xl">
        <h1 className="text-lg font-medium text-neutral-600">Price Range</h1>
        <PriceRangeSlider
          min={0}
          max={10000}
          onChange={(min, max) => setRangeValues({ min, max })}
        />
      </div>
      */}

      {/* Bus Type Filter */}
      <div className="w-full p-4 space-y-3 border border-neutral-300 rounded-xl">
        <h1 className="text-lg font-medium text-neutral-600">Bus Types</h1>
        {["AC Deluxe", "Tourist AC Deluxe", "Air Suspension", "Semi Luxury"].map((type) => (
          <div key={type} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={type}
              onChange={handleFilterChange("busTypes", type)}
              className="w-3.5 h-3.5 border cursor-pointer"
            />
            <label htmlFor={type} className="text-sm cursor-pointer">
              {type}
            </label>
          </div>
        ))}
      </div>

      {/* Company Filter */}
      <div className="w-full p-4 space-y-3 border border-neutral-300 rounded-xl">
        <h1 className="text-lg font-medium text-neutral-600">Companies</h1>
        {["CTB", "Private"].map((company) => (
          <div key={company} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={company}
              onChange={handleFilterChange("companies", company)}
              className="w-3.5 h-3.5 border cursor-pointer"
            />
            <label htmlFor={company} className="text-sm cursor-pointer">
              {company}
            </label>
          </div>
        ))}
      </div>

      {/* Amenities Filter */}
      <div className="w-full p-4 space-y-3 border border-neutral-300 rounded-xl">
        <h1 className="text-lg font-medium text-neutral-600">Amenities</h1>
        {["Internet/Wifi", "Charging Ports", "Fan", "AC"].map((amenity) => (
          <div key={amenity} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={amenity}
              onChange={handleFilterChange("amenities", amenity)}
              className="w-3.5 h-3.5 border cursor-pointer"
            />
            <label htmlFor={amenity} className="text-sm cursor-pointer">
              {amenity}
            </label>
          </div>
        ))}
      </div>
       {/* Search Button */}
       <div className="w-full p-4 space-y-3 border border-neutral-300 rounded-xl">
        <button
          onClick={fetchFilteredBuses}
          disabled={isLoading}
          className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Searching...' : 'Search Buses'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Filter;