import React from 'react'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight } from 'react-icons/fa';
import useFetch from '../../../../Hooks/useFetch';




const BookingStatus = ({id, routeTo, selectedSeats, totalCost}) => {

    const {data, loading, error} = useFetch(`/buses/find/${id}`);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    if (!data || !data.busCitiesAndTimes) {
    return <p>No data available</p>;
  }
    console.log("BusSeat data: ", data); //object
    console.log("BusSeat routeTo: ", routeTo); //Matara

    const matchingCity = data.busCitiesAndTimes.find(city => city.cityName === routeTo);
    console.log("To", matchingCity.cityName); //Galle

  return (
    <div className="w-full col-span-2 sticky top-20 space-y-7">
      <div className="w-full bg-neutral-50 rounded-xl py-6 px-8 border border-neutral-200 shadow-sm space-y-5">
        <h1
          className="text-lg text-neutral-700 font-bold text-center 
            border-b border-neutral-200 pb-4"
        >
          Your Ticket Report Status
        </h1>

        <div className="space-y-5">
          <div className="space-y-2 w-full">
            <h1
              className="text-base text-neutral-700 
                    font-medium"
            >
              Your Destination
            </h1>

            <div className="space-y-0.5 w-full">
              <div className="flex items-center justify-between w-full gap-x-5">
                <p className="text-sm font-normal text-neutral-400">
                  From{" "}
                  <span className="text-xs">
                    {data.busCitiesAndTimes[0].cityName}
                  </span>
                </p>
                <p className="text-sm font-normal text-neutral-400">
                  To <span className="text-xs">{matchingCity.cityName}</span>
                </p>
              </div>

              <div className="flex items-center justify-between w-full gap-x-4">
                <h1 className="text-sm font-normal text-neutral-600">
                  {data.busCitiesAndTimes[0].cityName}{" "}
                  <span className="font-medium">
                    {data.busCitiesAndTimes[0].arrivalTime}
                  </span>
                </h1>

                <div className="flex-1 border border-dashed border-neutral-300" />

                <h1 className="text-sm font-normal text-neutral-600">
                  {matchingCity.cityName}{" "}
                  <span className="text-sm font-medium">
                    {matchingCity.arrivalTime}
                  </span>
                </h1>
              </div>

              <div
                className="w-full flex items-center 
                        justify-between gap-x-4 !mt-1.5"
              >
                <h1
                  className="text-sm text-neutral-600 
                            font-normal"
                >
                  Bus No:
                </h1>

                <h1
                  className="text-base text-neutral-700 
                            font-medium"
                >
                  {data.busPlateNo}
                </h1>
              </div>
            </div>
          </div>

          <div className="space-y-2 w-full">
            <h1
              className="text-base text-neutral-700 
                    font-medium"
            >
              Your Seats
            </h1>
            <div className="flex items-center w-full gap-x-3">
              {selectedSeats && selectedSeats.length > 0 ? (
                selectedSeats.map((seat) => (
                  <div
                    key={seat}
                    className="flex items-center justify-center text-base font-semibold rounded-lg w-9 h-9 bg-neutral-200/80 text-neutral-700"
                  >
                    {data.seats.find(s => s._id === seat).seatNumber}
                  </div>
                ))
              ) : (
                <p>No seats selected</p>
              )}
            </div>
          </div>

          <div className="space-y-2 w-full">
            <h1
              className="text-base text-neutral-700 
                    font-medium"
            >
              Total Fare Price
            </h1>

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
        </div>
      </div>

      <div className="w-full px-1.5">
        <Link
          to="/bus-tickets/payment"
          className="w-full text-sm font-normal bg-primary hover:bg-primary/90 text-neutral-50 py-2.5 flex items-center justify-center uppercase rounded-lg transition"
        >
          Processed to Pay
          <FaLongArrowAltRight />
        </Link>
      </div>
    </div>
  );
}

export default BookingStatus
