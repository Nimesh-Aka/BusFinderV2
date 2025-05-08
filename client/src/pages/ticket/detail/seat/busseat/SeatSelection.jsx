import React from "react";
import { Link } from "react-router-dom";

const SeatSelection = ({ 
  data, 
  selectedSeats, 
  totalCost, 
  id, 
  routeTo, 
  matchingCity,
  getTravelTime,
  getStopsCount 
}) => {
  return (
    <div className="w-full col-span-2 px-6 py-4 space-y-5 border shadow-sm bg-neutral-50 rounded-xl border-neutral-200">
      {/* Bus Information Banner */}
      <div className="w-full bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2">
        <div className="flex items-center mb-2">
          <h2 className="text-base font-semibold text-blue-800">
            {data.busName}
          </h2>
          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
            {data.busType}
          </span>
          <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 rounded-md text-xs font-medium">
            {data.busOwnership}
          </span>
        </div>
        <p className="text-xs text-blue-700 line-clamp-2 mb-1">
          {data.passengersMessage}
        </p>
        <div className="flex items-center text-xs text-blue-700">
          <span className="mr-2">Plate: {data.busPlateNo}</span>
          <span>
            Departure: {new Date(data.busDepartureDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Destination */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg font-medium text-neutral-600">
            Your Destination
          </h1>
        </div>

        <div className="space-y-0.5 w-full">
          <div className="flex items-center justify-between w-full gap-x-5">
            <p className="text-sm font-normal text-neutral-400 mb-2">
              From{" "}
              <span className="text-base font-semibold text-neutral-700">
                {data.busCitiesAndTimes[0].cityName}
              </span>
            </p>
            <p className="text-sm font-normal text-neutral-400">
              To{" "}
              <span className="text-base font-semibold text-neutral-700">
                {matchingCity.cityName}
              </span>
            </p>
          </div>

          <div className="flex items-center justify-between w-full gap-x-4">
            <div className="text-center">
              <h1 className="text-sm font-medium text-neutral-600">
                {data.busCitiesAndTimes[0].arrivalTime}
              </h1>
              <p className="text-xs text-neutral-500">
                {data.busCitiesAndTimes[0].cityName}
              </p>
            </div>

            <div className="flex-1 border border-dashed border-neutral-300 relative">
              <div className="absolute -top-2.5 left-0 h-5 w-5 bg-neutral-50 rounded-full border border-neutral-300"></div>
              <div className="absolute -top-2.5 right-0 h-5 w-5 bg-neutral-50 rounded-full border border-neutral-300"></div>
            </div>

            <div className="text-center">
              <h1 className="text-sm font-medium text-neutral-600">
                {matchingCity.arrivalTime}
              </h1>
              <p className="text-xs text-neutral-500">
                {matchingCity.cityName}
              </p>
            </div>
          </div>
        </div>

        {/* Travel time */}
        <div className="mt-2 pt-2 border-t border-dashed border-neutral-200">
          <p className="text-xs text-neutral-500 flex justify-between">
            <span>
              Trip Duration: ~
              {getTravelTime(
                data.busCitiesAndTimes[0].arrivalTime,
                matchingCity.arrivalTime
              )}{" "}
            </span>
            <span>
              {getStopsCount(
                data.busCitiesAndTimes,
                data.busCitiesAndTimes[0].cityName,
                matchingCity.cityName
              )}{" "}
              stops
            </span>
          </p>
        </div>
      </div>

      {/* Available Amenities */}
      <div className="w-full py-2 border-y border-neutral-200">
        <div className="flex justify-between items-center flex-wrap">
          {data.busAmenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center text-xs text-neutral-600 px-2 py-1"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
              {amenity}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Seats */}
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-lg font-medium text-neutral-600">
            Selected Seats
          </h1>

          <div className="px-1.5 py-0.5 text-xs font-normal uppercase rounded-lg bg-primary/20 text-neutral-600">
            Non-refundable
          </div>
        </div>

        {selectedSeats.length > 0 ? (
          <div className="flex items-center w-full gap-x-3 flex-wrap">
            {selectedSeats.map((seatId) => {
              return (
                <div
                  key={seatId}
                  className="flex items-center justify-center text-base font-semibold rounded-lg w-9 h-9 bg-neutral-200/80 text-neutral-700"
                >
                  {data.seats.find((seat) => seat._id === seatId).seatNumber}
                </div>
              );
            })}
            <span className="text-xs text-neutral-500 ml-2">
              {selectedSeats.length}{" "}
              {selectedSeats.length === 1 ? "seat" : "seats"} selected
            </span>
          </div>
        ) : (
          <div className="flex items-center w-full gap-x-3">
            <p className="text-sm font-normal text-neutral-500">
              No seat selected
            </p>
          </div>
        )}
      </div>

      {/* Fare Details */}
      <div className="w-full space-y-2">
        <h1 className="text-lg font-medium text-neutral-600">Fare Details</h1>

        <div className="flex items-center justify-between w-full border-dashed border-l-[1.5px] border-neutral-400 pl-2">
          <h3 className="text-sm font-medium text-neutral-500">
            Basic Fare:
          </h3>
          <p className="text-sm font-medium text-neutral-600">
            Rs {data.busTicketPrice} x {selectedSeats.length || 0}
          </p>
        </div>

        <div className="flex items-center justify-between gap-x-4">
          <div className="flex gap-y-0.5 flex-col">
            <h3 className="text-base font-medium text-neutral-500">
              Total Price:
            </h3>
            <span className="text-xs font-normal text-neutral-500">
              (Including all taxes)
            </span>
          </div>
          {/* Calculate the total price */}
          <p className="text-base font-semibold text-neutral-600">
            Rs {totalCost}
          </p>
        </div>
      </div>

      {/* Proceed to Checkout Button */}
      <div className="flex items-center justify-center w-full">
        {selectedSeats.length > 0 ? (
          <Link
            to={`/bus-tickets/checkout`}
            state={{
              selectedSeats,
              totalCost,
              id,
              routeTo,
              busName: data.busName,
              busType: data.busType,
              departureDate: data.busDepartureDate,
              departureTime: data.busCitiesAndTimes[0].arrivalTime,
              arrivalTime: matchingCity.arrivalTime,
              fromCity: data.busCitiesAndTimes[0].cityName,
            }}
            className="w-full text-sm font-normal bg-primary hover:bg-primary/90 text-neutral-50 py-2.5 flex items-center justify-center uppercase rounded-lg transition"
          >
            Proceed to Checkout
          </Link>
        ) : (
          <div className="w-full space-y-0.5">
            <button
              disabled
              className="w-full text-sm font-normal bg-primary/60 text-neutral-50 py-2.5 flex items-center justify-center uppercase rounded-lg transition cursor-not-allowed"
            >
              Proceed to Checkout
            </button>
            <small className="px-1 text-xs font-normal text-neutral-600">
              Please select at least one seat to proceed to checkout page.
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatSelection;