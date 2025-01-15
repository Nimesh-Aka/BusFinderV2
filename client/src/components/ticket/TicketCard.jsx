import React from 'react'
import { FaBus, FaStar } from 'react-icons/fa6';
import {MdOutlineChair} from 'react-icons/md';
import {RiVipFill} from 'react-icons/ri';
import {TbAirConditioning} from 'react-icons/tb';
import { Link } from 'react-router-dom'; 


const TicketCard = ({ icon: Icon, date, busName, routeFrom, routeTo, arrivalTime, departureTime, price, availableSeats, id}) => {
  
    // Format the provided date to YYYY-MM-DD
  const formattedDate = new Date(date).toISOString().split("T")[0];

  return (
    <div className="w-full p-5 space-y-5 border-2 rounded-xl border-neutral-300">
      {/* bus info, routes */}
      <div className="w-full pb-4 space-y-5 border-b border-neutral-300/60">
        {/*Route*/}
        <div className="space-y-5">
          {/* Bus Info */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-x-2">
              <FaBus className="w-5 h-5 text-primary" />
              <p className="text-lg font-semibold text-neutral-700">
                {busName}
              </p>
              <p className="text-xl font-bold text-red-600">{formattedDate}</p>
            </div>

            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-1.5 py-0.5 ">
                <TbAirConditioning className="w-4 h-4 text-primary" />
                <p className="text-xs font-normal text-neutral-600">AC</p>
              </div>

              <div className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-1.5 py-0.5 ">
                <FaStar className="w-4 h-4 text-yellow-600" />
                <p className="text-xs font-normal text-yellow-600 pt-0.5">
                  4.5
                </p>
              </div>

              <div className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-1.5 py-0.5 ">
                <RiVipFill className="w-4 h-4 text-primary" />
                <p className="text-xs font-normal text-neutral-600">Sofa</p>
              </div>

              <div className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-1.5 py-0.5 ">
                <MdOutlineChair className="w-4 h-4 -rotate-90 text-primary" />
                <p className="text-xs font-normal text-neutral-600">35 Seats</p>
              </div>
            </div>
          </div>

          {/* Route */}
          <div className="space-y-0.5">
            <div className="w-full flex items-center justify-between gap-x-2.5">
              <h1 className="text-2xl font-semibold text-neutral-600">
                {arrivalTime}
              </h1>

              <div className="relative flex-1 border border-dashed border-neutral-300">
                <p className="absolute w-14 h-14 p-0.5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-50 border-dashed border border-neutral-400 rounded-full flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </p>
              </div>

              <h1 className="text-2xl font-semibold text-neutral-600">
                {departureTime}
              </h1>
            </div>

            <div className="flex items-center justify-between w-full gap-x-5">
              <p className="text-base font-normal text-neutral-500">
                {routeFrom}
              </p>
              <p className="text-base font-normal text-neutral-500">
                {routeTo}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* price, available seats, and reserve button */}
      <div className="flex items-center justify-between w-full">
        {/* price */}
        <h1 className="text-xl font-semibold text-neutral-700">
          Rs. {price}{" "}
          <span className="text-sm font-normal text-neutral-500">
            /per seat
          </span>
        </h1>

        <h1 className="flex items-center justify-center text-sm font-normal text-neutral-600 gap-x-1.5">
          <span className="pt-0.5 text-lg font-bold text-green-700">
            {availableSeats}
          </span>{" "}
          seats available
        </h1>

        <Link
          to={`/buses/${id}`} state={{routeTo}}
          className="flex items-center justify-center py-1.5 px-5 text-sm font-normal duration-300 ease-in-out border-2 w-fit bg-primary hover:bg-transparent border-primary hover:border-primary rounded-xl text-neutral-50 gap-x-2 hover:text-primary "
        >
          Reserve Seat
        </Link>
      </div>
    </div>
  );
}

export default TicketCard