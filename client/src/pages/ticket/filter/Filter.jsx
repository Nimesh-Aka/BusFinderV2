import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ className, setBuses, from, to, date }) => {
  // State for filters
  const [sortBy, setSortBy] = useState("priceAsc");
  const [filters, setFilters] = useState({
    busTypes: [],
    companies: [],
    amenities: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Effect to auto-fetch when sortBy changes
  useEffect(() => {
    if (from && to && date) {
      console.log("Sort changed, refetching with:", sortBy);
      fetchFilteredBuses();
    }
  }, [sortBy, from, to, date]);

  // Effect to fetch on initial load
  useEffect(() => {
    if (from && to && date) {
      console.log("Initial fetch for:", { from, to, date });
      fetchFilteredBuses();
    }
  }, [from, to, date]);

  const fetchFilteredBuses = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Match the exact field names expected by your backend
      const requestBody = {
        sortBy: sortBy,
        busType: filters.busTypes,           // Make sure field name matches backend
        busOwnership: filters.companies,     // Maps companies to busOwnership
        busAmenities: filters.amenities,     // Field name matches backend
        fromCity: from,                     // Field name matches backend
        toCity: to,                         // Field name matches backend
        busDepartureDate: date,             // Field name matches backend
      };

      console.log("Sending filter request:", requestBody);
      
      const response = await axios.post("/buses/filter", requestBody);
      
      console.log("Filter response:", response.data);
      
      // Handle the -1 response for no buses found
      if (response.data === -1) {
        setBuses([]);
        setError("No buses found matching your criteria");
      } else {
        setBuses(response.data);
        if (response.data.length === 0) {
          setError("No buses found matching your criteria");
        } else {
          setError(null);
        }
      }
    } catch (error) {
      console.error("Error fetching filtered buses:", error);
      setError("Failed to apply filters. Please try again.");
      setBuses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => (e) => {
    const newFilters = {...filters};
    
    if (e.target.checked) {
      // Add the value to the appropriate filter array
      newFilters[filterType] = [...newFilters[filterType], value];
    } else {
      // Remove the value from the appropriate filter array
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    }
    
    console.log(`Updated ${filterType} filters:`, newFilters[filterType]);
    setFilters(newFilters);
  };

  const handleSortChange = (e) => {
    console.log("Changing sort to:", e.target.value);
    setSortBy(e.target.value);
    // The useEffect will handle the fetch automatically
  };

  const handleApplyFilters = () => {
    console.log("Applying all filters:", filters);
    fetchFilteredBuses();
  };

  // Map UI filter names to backend field names
  const busTypes = ["AC Delux", "Tourist AC Delux", "Air Suspension", "Semi Luxury"];
  const companies = ["CTB", "Private"]; // These map to busOwnership in backend
  const amenities = ["Internet/Wifi", "Charging Ports", "Fan", "AC"];

  return (
    <div className={`w-full ${className}`}>
      <h1 className="text-xl font-semibold text-neutral-700">Apply Filters</h1>

      {/* Sorting */}
      <div className="w-full p-4 space-y-3 border border-neutral-300 rounded-xl">
        <h1 className="text-lg font-medium text-neutral-600">Sort By</h1>
        <select
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-400"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>
      </div>

      {/* Bus Type Filter */}
      <div className="w-full p-4 space-y-3 border border-neutral-300 rounded-xl">
        <h1 className="text-lg font-medium text-neutral-600">Bus Types</h1>
        {busTypes.map((type) => (
          <div key={type} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={type}
              onChange={handleFilterChange("busTypes", type)}
              checked={filters.busTypes.includes(type)}
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
        {companies.map((company) => (
          <div key={company} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={company}
              onChange={handleFilterChange("companies", company)}
              checked={filters.companies.includes(company)}
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
        {amenities.map((amenity) => (
          <div key={amenity} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={amenity}
              onChange={handleFilterChange("amenities", amenity)}
              checked={filters.amenities.includes(amenity)}
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
          onClick={handleApplyFilters}
          disabled={isLoading}
          className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Filtering...' : 'Apply All Filters'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Filter;