// src/components/BusCard/BusCard.jsx

import React from "react";

const BusCard = ({ bus }) => {
  const bookBus = (busId) => {
    // Implement booking logic here, such as redirecting to a booking page or showing a booking modal
    console.log(`Booking bus with ID: ${busId}`);
  };

  return (
    <div className="busCard">
      <h3>{bus.name}</h3>
      <p>{`Departure: ${bus.departureTime}`}</p>
      <p>{`Arrival: ${bus.arrivalTime}`}</p>
      <p>{`Price: ${bus.price}`}</p>
      <button onClick={() => bookBus(bus.id)}>Book Now</button>
    </div>
  );
};

export default BusCard;
