import React from "react";
import { GiSteeringWheel } from "react-icons/gi";
import { MdOutlineChair, MdInfoOutline } from "react-icons/md";

const SeatLayout = ({ data, selectedSeats, handleSeatClick, getSeatName }) => {
  return (
    <div className="flex flex-col w-full col-span-3 border shadow-md rounded-xl border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="bg-blue-50 p-4 border-b border-blue-100">
        <h2 className="text-lg font-semibold text-blue-800 text-center">
          Bus Seat Selection
        </h2>
        <p className="text-sm text-blue-700 text-center mt-1">
          Click on available seats to reserve your journey
        </p>
      </div>

      <div className="w-full p-5 space-y-6">
        {/* Seat layout container with better spacing */}
        <div className="relative w-full flex items-stretch border rounded-lg p-5 bg-white shadow-sm">
          {/* Driver section with better positioning */}
          <div className="relative w-16 h-fit">
            <div className="absolute top-6 left-0 w-14 h-14 flex items-center justify-center bg-neutral-100 rounded-full border border-neutral-300">
              <GiSteeringWheel className="text-4xl text-primary" />
            </div>
            <div className="mt-24 text-xs text-center text-neutral-500">Driver</div>
          </div>

          {/* Seat rows with improved spacing */}
          <div className="flex-1 flex flex-col items-center border-l-2 border-dashed border-neutral-300 pl-6 ml-2">
            <div className="flex-1 space-y-4 w-full">
              {/* First row */}
              <div className="grid justify-end w-full h-auto grid-cols-9 gap-x-3">
                {data.seats.slice(0, 9).map((seat) => (
                  <div
                    key={seat._id}
                    className={`flex flex-col items-center ${
                      seat.availability === "booked" || seat.availability === "maintenance"
                        ? "cursor-not-allowed"
                        : "cursor-pointer hover:scale-105 transition-transform"
                    }`}
                    onClick={() => handleSeatClick(seat._id)}
                  >
                    <MdOutlineChair
                      className={`text-3xl -rotate-90 ${getSeatName(seat)}`}
                    />
                    <h6 className="text-xs font-medium text-neutral-700 mt-0.5">
                      {seat.seatNumber}
                    </h6>
                  </div>
                ))}
              </div>

              {/* Second row */}
              <div className="grid justify-end w-full h-auto grid-cols-9 gap-x-3">
                {data.seats.slice(9, 18).map((seat) => (
                  <div
                    key={seat._id}
                    className={`flex flex-col items-center ${
                      seat.availability === "booked" || seat.availability === "maintenance"
                        ? "cursor-not-allowed"
                        : "cursor-pointer hover:scale-105 transition-transform"
                    }`}
                    onClick={() => handleSeatClick(seat._id)}
                  >
                    <MdOutlineChair
                      className={`text-3xl -rotate-90 ${getSeatName(seat)}`}
                    />
                    <h6 className="text-xs font-medium text-neutral-700 mt-0.5">
                      {seat.seatNumber}
                    </h6>
                  </div>
                ))}
              </div>

              {/* Third row */}
              <div className="grid justify-end w-full h-auto grid-cols-10 gap-x-3">
                <div className="col-span-9"></div>
                {data.seats.slice(18, 19).map((seat) => (
                  <div
                    key={seat._id}
                    className={`flex flex-col items-center ${
                      seat.availability === "booked" || seat.availability === "maintenance"
                        ? "cursor-not-allowed"
                        : "cursor-pointer hover:scale-105 transition-transform"
                    }`}
                    onClick={() => handleSeatClick(seat._id)}
                  >
                    <MdOutlineChair
                      className={`text-3xl -rotate-90 ${getSeatName(seat)}`}
                    />
                    <h6 className="text-xs font-medium text-neutral-700 mt-0.5">
                      {seat.seatNumber}
                    </h6>
                  </div>
                ))}
              </div>

              {/* Fourth row */}
              <div className="grid justify-end w-full h-auto grid-cols-9 gap-x-3">
                {data.seats.slice(19, 28).map((seat) => (
                  <div
                    key={seat._id}
                    className={`flex flex-col items-center ${
                      seat.availability === "booked" || seat.availability === "maintenance"
                        ? "cursor-not-allowed"
                        : "cursor-pointer hover:scale-105 transition-transform"
                    }`}
                    onClick={() => handleSeatClick(seat._id)}
                  >
                    <MdOutlineChair
                      className={`text-3xl -rotate-90 ${getSeatName(seat)}`}
                    />
                    <h6 className="text-xs font-medium text-neutral-700 mt-0.5">
                      {seat.seatNumber}
                    </h6>
                  </div>
                ))}
              </div>

              {/* Fifth row */}
              <div className="grid justify-end w-full h-auto grid-cols-9 gap-x-3">
                {data.seats.slice(28, 37).map((seat) => (
                  <div
                    key={seat._id}
                    className={`flex flex-col items-center ${
                      seat.availability === "booked" || seat.availability === "maintenance"
                        ? "cursor-not-allowed"
                        : "cursor-pointer hover:scale-105 transition-transform"
                    }`}
                    onClick={() => handleSeatClick(seat._id)}
                  >
                    <MdOutlineChair
                      className={`text-3xl -rotate-90 ${getSeatName(seat)}`}
                    />
                    <h6 className="text-xs font-medium text-neutral-700 mt-0.5">
                      {seat.seatNumber}
                    </h6>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Seat Legend with improved design */}
        <div className="w-full px-6 py-4 border rounded-lg bg-neutral-50 border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-200">
            <h3 className="text-base font-semibold text-neutral-700 flex items-center">
              <span className="mr-2">Seat Legend</span>
              <MdInfoOutline className="text-blue-500" />
            </h3>
            <div className="bg-blue-100 text-blue-800 font-semibold rounded-full px-4 py-1 text-sm">
              Rs. {data.busTicketPrice} per seat
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-neutral-200 shadow-sm">
                <MdOutlineChair className="text-2xl -rotate-90 text-neutral-500" />
              </div>
              <p className="ml-3 text-sm font-medium text-neutral-700">Available</p>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-neutral-200 shadow-sm">
                <MdOutlineChair className="text-2xl -rotate-90 text-primary" />
              </div>
              <p className="ml-3 text-sm font-medium text-neutral-700">Booked</p>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-neutral-200 shadow-sm">
                <MdOutlineChair className="text-2xl -rotate-90 text-brown-600" />
              </div>
              <p className="ml-3 text-sm font-medium text-neutral-700">Maintenance</p>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-neutral-200 shadow-sm">
                <MdOutlineChair className="text-2xl -rotate-90 text-yellow-600" />
              </div>
              <p className="ml-3 text-sm font-medium text-neutral-700">Selected</p>
            </div>
          </div>
          
          <div className="mt-4 pt-2 border-t border-neutral-200 bg-blue-50 p-3 rounded-md">
            <div className="flex items-start">
              <div className="text-blue-700 mr-2 mt-0.5">
                <MdInfoOutline className="text-xl" />
              </div>
              <p className="text-sm text-blue-800">
                You can select up to <span className="font-bold">10 seats</span> per booking. 
                Click on an available seat to select it and click again to deselect.
                {selectedSeats.length > 0 && (
                  <span className="block mt-1 font-medium">
                    Currently selected: {selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;