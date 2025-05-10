import React, { useState, useEffect } from "react";
import useFetch from "../../../../../Hooks/useFetch";
import SeatLayout from "./SeatLayout";
import SeatSelection from "./SeatSelection";

const BusSeat = ({ id, routeTo }) => {
  const { data, loading, error } = useFetch(`/buses/find/${id}`);

  //Track seat selection
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showError, setShowError] = useState(false);

  //Hide the error message after 10 seconds
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [showError]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  if (!data || !data.busCitiesAndTimes) {
    return <p>No data available</p>;
  }

  const matchingCity = data.busCitiesAndTimes.find(
    (city) => city.cityName === routeTo
  );

  // Toggle seat selection
  const handleSeatClick = (seatId) => {
    // Find the seat by its ID
    const selectedSeat = data.seats.find((seat) => seat._id === seatId);

    // If the seat is booked or under maintenance, ignore the click
    if (
      selectedSeat.availability === "booked" ||
      selectedSeat.availability === "maintenance"
    ) {
      return; // Do nothing
    }

    // If the seat is available, select it
    setSelectedSeats((prevSelectedSeats) => {
      // Check if the seat is already selected
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId); // Deselect the seat
      } else {
        // Show the error if more than 10 seats are selected
        if (prevSelectedSeats.length >= 10) {
          setShowError(true);
          return prevSelectedSeats; // Do not select more than 10 seats
        } else {
          return [...prevSelectedSeats, seatId];
        }
      }
    });
  };

  // Function to determine seat class or seat name based on status
  const getSeatName = (seat) => {
    if (seat.availability === "booked") {
      return "text-primary cursor-not-allowed"; // Booked seat - unavailable
    }
    if (seat.availability === "maintenance") {
      return "text-brown-500 cursor-not-allowed"; // Maintenance seat - unavailable
    }
    if (selectedSeats.includes(seat._id)) {
      return "text-yellow-600 cursor-pointer"; // Selected seat
    }
    return "text-neutral-500 cursor-pointer"; // Available seat
  };

  //Calculate the total cost of selected seats
  const totalCost = selectedSeats.reduce((total, seatId) => {
    const seat = data.seats.find((busSeat) => busSeat._id === seatId);
    return total + (seat ? data.busTicketPrice : 0);
  }, 0);

  // Helper function to calculate travel time
// Helper function to calculate travel time
const getTravelTime = (startTime, endTime) => {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  let hoursDiff = endHours - startHours;
  let minutesDiff = endMinutes - startMinutes;

  if (minutesDiff < 0) {
    hoursDiff--;
    minutesDiff += 60;
  }

  if (hoursDiff < 0) {
    hoursDiff += 24; // Assuming it's within the same day or crosses to next day
  }

  // Format as "X hours Y min"
  if (hoursDiff === 0) {
    return `${minutesDiff} min`;
  } else if (minutesDiff === 0) {
    return `${hoursDiff} ${hoursDiff === 1 ? 'hour' : 'hours'}`;
  } else {
    return `${hoursDiff} ${hoursDiff === 1 ? 'hour' : 'hours'} ${minutesDiff} min`;
  }
};
  // Helper function to count stops between cities
  const getStopsCount = (citiesAndTimes, fromCity, toCity) => {
    const fromIndex = citiesAndTimes.findIndex(
      (city) => city.cityName === fromCity
    );
    const toIndex = citiesAndTimes.findIndex(
      (city) => city.cityName === toCity
    );

    if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
      return 0;
    }

    return toIndex - fromIndex - 1; // Subtracting 1 because we don't count the destination as a stop
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-6">
      {/* Seat Layout Component - takes full width on mobile, 60% on desktop */}
      <div className="w-full lg:w-3/5">
        <SeatLayout 
          data={data} 
          selectedSeats={selectedSeats} 
          handleSeatClick={handleSeatClick} 
          getSeatName={getSeatName} 
        />
      </div>
  
      {/* Seat Selection Component - takes full width on mobile, 40% on desktop */}
      <div className="w-full lg:w-2/5 self-start sticky top-20">
        <SeatSelection 
          data={data}
          selectedSeats={selectedSeats}
          totalCost={totalCost}
          id={id}
          routeTo={routeTo}
          matchingCity={matchingCity}
          getTravelTime={getTravelTime}
          getStopsCount={getStopsCount}
        />
      </div>
      
      {showError && (
        <div className="fixed bottom-5 right-5 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md flex items-center">
          <span className="mr-2">⚠️</span>
          <span>You cannot select more than 10 seats.</span>
        </div>
      )}
    </div>
  );
};

export default BusSeat;