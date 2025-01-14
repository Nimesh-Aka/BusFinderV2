import React, { useState, useEffect } from 'react'
import { GiSteeringWheel } from 'react-icons/gi';
import busSeatData from '../../../../../constants/busseat/BusSeatData';
import { MdOutlineChair } from 'react-icons/md';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import useFetch from '../../../../../Hooks/useFetch';



const BusSeat = ({id, routeTo}) => {

    const {data, loading, error} = useFetch(`/buses/find/${id}`);

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
    console.log("BusSeat data: ", data); //object
    console.log("BusSeat routeTo: ", routeTo); //Matara

    const matchingCity = data.busCitiesAndTimes.find(city => city.cityName === routeTo);
    console.log("To", matchingCity.cityName); //Galle


    

    //Toggle seat selection
    const handleSeatClick = (seatId) => {
        //If the seat is already booked, ignore the click or disable it 
        const selectedSeat = data.seats.find((seat) => seat._id === seatId);
        if (selectedSeat.availability === 'booked') {
            return; //do nothing
        };

        //If the seat is available, select it
        setSelectedSeats((prevSelectedSeats) => {
            //check if the seat is already selected
            if (prevSelectedSeats.includes(seatId)) {
                return prevSelectedSeats.filter((seat) => seat !== seatId); // vice versa or deselect
            } else {
                // Show the error if more than 10 seats are selected
                if (prevSelectedSeats.length >= 10) {
                    setShowError(true);
                    return prevSelectedSeats; // Do not select the seat more than 10
                } else {
                    return [...prevSelectedSeats, seatId];
                }
            }
        })
    };

    

    //function to determine seat class or seat name on status
    const getSeatName = (seat) => {
        if (seat.availability === 'booked') {
            return 'text-primary cursor-not-allowed' // bookes seat unavailable
        } if (selectedSeats.includes(seat._id)) {
            return 'text-yellow-600 cursor-pointer' // selected seat
        }
        return 'text-neutral-500 cursor-pointer' // available seat
    };

    //Calculate the total cost of selected seats
    const totalCost = selectedSeats.reduce((total, seatId) => {
      const seat = data.seats.find((busSeat) => busSeat._id === seatId);
      return total + (seat ? data.busTicketPrice : 0);
    }, 0);

    return (
      <div className="grid w-full grid-cols-5 gap-10">
        {/* Seat Layout */}
        <div className="flex items-center justify-center w-full col-span-3 p-4 border shadow-sm rounded-xl border-neutral-200">
          <div className="w-full space-y-7">
            <p className="text-base font-medium text-center text-neutral-600">
              Click on available seats to reserve your seat.
            </p>

            {/* Seat layout */}
            <div className="w-full flex items-stretch gap-x-1.5">
              <div className="w-10 h-fit">
                <GiSteeringWheel className="text-3xl -rotate-90 mt-7 text-primary" />
              </div>

              {/* Seat rows */}
              <div className="flex flex-col items-center border-l-2 border-dashed border-neutral-300 pl-7">
                <div className="flex-1 space-y-5">
                  {/* First row */}
                  <div className="grid justify-end w-full h-auto grid-cols-9 gap-x-5">
                    {data.seats.map((seat) => (
                      <div
                        key={seat._id}
                        className="flex items-center gap-x-0"
                        onClick={() => handleSeatClick(seat._id)}
                      >
                        <h6 className="text-base font-bold text-neutral-600">
                          {seat.seatNumber}
                        </h6>
                        <MdOutlineChair
                          className={`text-3xl -rotate-90 ${getSeatName(seat)}`} // Template literals for dynamic class names
                        />
                      </div>
                    ))}
                  </div>

                  {/* Second row */}
                  <div className="grid justify-end w-full h-auto grid-cols-9 gap-x-5">
                    {busSeatData.slice(9, 18).map((seat) => (
                      <div
                        key={seat.id}
                        className="flex items-center gap-x-0"
                        onClick={() => handleSeatClick(seat.id)}
                      >
                        <h6 className="text-base font-bold text-neutral-600">
                          {seat.id}
                        </h6>
                        <MdOutlineChair
                          className={`text-3xl -rotate-90 ${getSeatName(seat)}`} // Template literals for dynamic class names
                        />
                      </div>
                    ))}
                  </div>

                  {/* Third row */}
                  <div className="grid justify-end w-full h-auto grid-cols-10 gap-x-5">
                    <div className="col-span-9"></div>
                    {busSeatData.slice(18, 19).map((seat) => (
                      <div
                        key={seat.id}
                        className="flex items-center gap-x-0"
                        onClick={() => handleSeatClick(seat.id)}
                      >
                        <h6 className="text-base font-bold text-neutral-600">
                          {seat.id}
                        </h6>
                        <MdOutlineChair
                          className={`text-3xl -rotate-90 ${getSeatName(seat)}`} // Template literals for dynamic class names
                        />
                      </div>
                    ))}
                  </div>

                  {/* Fourth row */}
                  <div className="grid justify-end w-full h-auto grid-cols-9 gap-x-5">
                    {busSeatData.slice(19, 28).map((seat) => (
                      <div
                        key={seat.id}
                        className="flex items-center gap-x-0"
                        onClick={() => handleSeatClick(seat.id)}
                      >
                        <h6 className="text-base font-bold text-neutral-600">
                          {seat.id}
                        </h6>
                        <MdOutlineChair
                          className={`text-3xl -rotate-90 ${getSeatName(seat)}`} // Template literals for dynamic class names
                        />
                      </div>
                    ))}
                  </div>

                  {/* Fifth row */}
                  <div className="grid justify-end w-full h-auto grid-cols-9 gap-x-5">
                    {busSeatData.slice(28, 37).map((seat) => (
                      <div
                        key={seat.id}
                        className="flex items-center gap-x-0"
                        onClick={() => handleSeatClick(seat.id)}
                      >
                        <h6 className="text-base font-bold text-neutral-600">
                          {seat.id}
                        </h6>
                        <MdOutlineChair
                          className={`text-3xl -rotate-90 ${getSeatName(seat)}`} // Template literals for dynamic class names
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* reservation info */}
            <div className="flex items-center justify-center w-full gap-6 pt-5 border-t border-neutral-200">
              <div className="flex items-center gap-x-2">
                <MdOutlineChair className="text-xl -rotate-90 text-neutral-500" />
                <p className="text-sm font-medium text-neutral-500">
                  Available
                </p>
              </div>

              <div className="flex items-center gap-x-2">
                <MdOutlineChair className="text-xl -rotate-90 text-primary" />
                <p className="text-sm font-medium text-neutral-500">Booked</p>
              </div>

              <div className="flex items-center gap-x-2">
                <MdOutlineChair className="text-xl text-yellow-600 -rotate-90" />
                <p className="text-sm font-medium text-neutral-500">Selected</p>
              </div>

              <div className="flex items-center gap-x-2">
                <RiMoneyRupeeCircleLine className="text-xl text-neutral-500" />
                <p className="text-sm font-medium text-neutral-500">{data.busTicketPrice}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seat selection action */}
        <div className="w-full col-span-2 px-6 py-4 space-y-5 border shadow-sm bg-neutral-50 rounded-xl border-neutral-200">
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-lg font-medium text-neutral-600">
                Your Destination
              </h1>
              <Link
                to={"/bus-tickets"}
                className="text-sm font-normal text-primary"
              >
                Change route
              </Link>
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
                <h1 className="text-sm font-normal text-neutral-600">
                {data.busCitiesAndTimes[0].cityName} <span className="font-medium">{data.busCitiesAndTimes[0].arrivalTime}</span>
                </h1>

                <div className="flex-1 border border-dashed border-neutral-300" />

                <h1 className="text-sm font-normal text-neutral-600">
                {matchingCity.cityName} <span className="text-sm font-medium">{matchingCity.arrivalTime}</span>
                </h1>
              </div>
            </div>
          </div>

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
              <div className="flex items-center w-full gap-x-3">
                {selectedSeats.map((seatId) => {
                  return (
                    <div
                      key={seatId}
                      className="flex items-center justify-center text-base font-semibold rounded-lg w-9 h-9 bg-neutral-200/80 text-neutral-700 "
                    >
                      {data.seats.find(seat => seat._id === seatId).seatNumber}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center w-full gap-x-3">
                <p className="text-sm font-normal text-neutral-500">
                  No seat selected
                </p>
              </div>
            )}
          </div>

          <div className="w-full space-y-2">
            <h1 className="text-lg font-medium text-neutral-600">
              Fare Details
            </h1>

            <div className="flex items-center justify-between w-full border-dashed border-l-[1.5px] border-neutral-400 pl-2">
              <h3 className="text-sm font-medium text-neutral-500">
                Basic Fare:
              </h3>
              <p className="text-sm font-medium text-neutral-600"></p>
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
                Rs{" "}
                
                {totalCost}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            {selectedSeats.length > 0 ? (
              <Link
              to={`/bus-tickets/checkout`} state={{selectedSeats, totalCost, id, routeTo}}
                className="w-full text-sm font-normal bg-primary hover:bg-primary/90 text-neutral-50 py-2.5 flex items-center justify-center uppercase rounded-lg transition"
              >
                Processed to CheckOut
              </Link>
            ) : (
              <div className="w-full space-y-0.5">
                <button
                  disabled
                  className="w-full text-sm font-normal bg-primary hover:bg-primary/90 text-neutral-50 py-2.5 flex items-center justify-center uppercase rounded-lg transition cursor-not-allowed"
                >
                  Processed to CheckOut
                </button>
                <small className="px-1 text-xs font-normal text-neutral-600">
                  Please select at least one seat to proceed to checkout page.
                </small>
              </div>
            )}
          </div>
        </div>
        {/* Show the error message if more than 10 seats are selected */}
      </div>
    );
}

export default BusSeat