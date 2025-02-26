import React, { useState } from 'react';
import { GiSteeringWheel } from 'react-icons/gi';
import { MdOutlineChair } from 'react-icons/md';

const BusSeat = ({ data }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showError, setShowError] = useState(false);

  // Toggle seat selection
  const handleSeatClick = (seatId) => {
    const selectedSeat = data.seats.find((seat) => seat._id === seatId);
    if (selectedSeat.availability === 'booked') {
      return; // Do nothing if the seat is already booked
    }

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter((seat) => seat !== seatId); // Deselect seat
      } else {
        if (prevSelectedSeats.length >= 10) {
          setShowError(true);
          return prevSelectedSeats; // Do not select more than 10 seats
        } else {
          return [...prevSelectedSeats, seatId];
        }
      }
    });
  };

  const getSeatClass = (seat) => {
    if (seat.availability === 'booked') {
      return 'text-red-500';
    } else if (selectedSeats.includes(seat._id)) {
      return 'text-green-500';
    } else {
      return 'text-neutral-500';
    }
  };

  const renderSeats = (start, end) => {
    return data.seats
      .filter((seat) => {
        const seatNumber = parseInt(seat.seatNumber.slice(1), 10);
        return seatNumber >= start && seatNumber <= end;
      })
      .map((seat) => (
        <div
          key={seat._id}
          className="flex items-center gap-x-0"
          onClick={() => handleSeatClick(seat._id)}
        >
          <h6 className="text-base font-bold text-neutral-600">
            {seat.seatNumber}
          </h6>
          <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatClass(seat)}`} />
        </div>
      ));
  };

  return (
    <div className="w-full flex items-stretch gap-x-1.5">
      <div className="w-10 h-fit">
        <GiSteeringWheel className="text-3xl -rotate-90 mt-7 text-primary" />
      </div>

      {/* Seat rows */}
      <div className="flex flex-col items-center border-l-2 border-dashed border-neutral-300 pl-7">
        <div className="flex-1 space-y-5">
          {/* Seat Layout */}
          <div className="grid grid-cols-9 gap-x-5 gap-y-3 w-full">
            {/* First row: P1 to P9 */}
            {renderSeats(1, 9)}
          </div>
          <div className="grid grid-cols-9 gap-x-5 gap-y-3 w-full">
            {/* Second row: P10 to P18 */}
            {renderSeats(10, 18)}
          </div>
          <div className="grid grid-cols-9 gap-x-5 gap-y-3 w-full">
            {/* Third row: P19 */}
            {renderSeats(19, 19)}
          </div>
          <div className="grid grid-cols-9 gap-x-5 gap-y-3 w-full">
            {/* Fourth row: P20 to P28 */}
            {renderSeats(20, 28)}
          </div>
          <div className="grid grid-cols-9 gap-x-5 gap-y-3 w-full">
            {/* Fifth row: P29 to P37 */}
            {renderSeats(29, 37)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusSeat;