import React from "react";
import "./Search.css"; // Import the CSS file for styles

const Search = () => {
  return (
    <div className="search-container">
      <div className="search-box">
        <div className="grid">
          <div className="input-group">
            <label htmlFor="from" className="label">
              From
            </label>
            <select name="from" id="from" className="select">
              <option value="">Select Location</option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              <option value="location3">Location 3</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="to" className="label">
              To
            </label>
            <select name="to" id="to" className="select">
              <option value="">Select Location</option>
              <option value="location4">Location 4</option>
              <option value="location5">Location 5</option>
              <option value="location6">Location 6</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="date" className="label">
              Choose Date
            </label>
            <input type="date" id="date" name="date" className="input" />
          </div>
          
          <div className="input-group">
            <button className="submit-button">
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
