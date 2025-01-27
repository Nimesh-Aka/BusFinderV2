import React from "react";
import { FaBus, FaStar } from "react-icons/fa6";
import { MdOutlineChair } from "react-icons/md";
import { RiVipFill } from "react-icons/ri";
import { TbAirConditioning } from "react-icons/tb";
import { Link } from "react-router-dom";

const TicketCard = ({
  icon: Icon,
  date,
  busName,
  routeFrom,
  routeTo,
  arrivalTime,
  departureTime,
  price,
  availableSeats,
  id,
  item,
}) => {
  // Format the provided date to YYYY-MM-DD
  const formattedDate = new Date(date).toISOString().split("T")[0];

  // Get today's and tomorrow's dates in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  // Determine display date text and apply styles
  let displayDate = formattedDate;
  let dateStyle = "text-neutral-700";

  if (formattedDate === today) {
    displayDate = "Today";
    dateStyle = "text-green-700 font-bold";
  } else if (formattedDate === tomorrow) {
    displayDate = "Tomorrow";
    dateStyle = "text-blue-600 font-bold";
  }

  // Function to format time to AM/PM
  const formatTime = (time) => {
    const date = new Date(`1970-01-01T${time}Z`);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

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
              <p className={`text-xl ${dateStyle}`}>{displayDate}</p>
            </div>

            <div className="flex items-center gap-x-4">
              {/* Map through the busAmenities array */}
              {item.busAmenities.map((amenity, index) => {
                // Render the corresponding icon and label for each amenity
                switch (amenity) {
                  case "Internet/Wifi":
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-1.5 py-0.5"
                      >
                        <FaStar className="w-4 h-4 text-blue-600" />{" "}
                        {/* Replace with a WiFi icon */}
                        <p className="text-xs font-normal text-neutral-600">
                          Wifi
                        </p>
                      </div>
                    );

                  case "AC":
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-1.5 py-0.5"
                      >
                        <TbAirConditioning className="w-4 h-4 text-primary" />
                        <p className="text-xs font-normal text-neutral-600">
                          AC
                        </p>
                      </div>
                    );
                  case "Charging Ports":
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-1.5 py-0.5"
                      >
                        <FaStar className="w-4 h-4 text-yellow-600" />{" "}
                        {/* Replace with a charging icon */}
                        <p className="text-xs font-normal text-neutral-600">
                          Charging
                        </p>
                      </div>
                    );

                  case "Fan":
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-x-1 bg-neutral-200/65 w-fit rounded-full px-1.5 py-0.5"
                      >
                        <FaStar className="w-4 h-4 text-teal-500" />{" "}
                        {/* Replace with a fan icon */}
                        <p className="text-xs font-normal text-neutral-600">
                          Fan
                        </p>
                      </div>
                    );

                  default:
                    return null; // Return null for unrecognized amenities
                }
              })}
            </div>
          </div>

          {/* Route */}
          <div className="space-y-0.5">
            <div className="w-full flex items-center justify-between gap-x-2.5">
              <h1 className="text-2xl font-semibold text-neutral-600">
                {formatTime(arrivalTime)}
              </h1>

              <div className="relative flex-1 border border-dashed border-neutral-300">
                <p className="absolute w-14 h-14 p-0.5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-50 border-dashed border border-neutral-400 rounded-full flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </p>
              </div>

              <h1 className="text-2xl font-semibold text-neutral-600">
                {formatTime(departureTime)}
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
          to={`/buses/${id}`}
          state={{ routeTo }}
          className="flex items-center justify-center py-1.5 px-5 text-sm font-normal duration-300 ease-in-out border-2 w-fit bg-primary hover:bg-transparent border-primary hover:border-primary rounded-xl text-neutral-50 gap-x-2 hover:text-primary "
        >
          Reserve Seat
        </Link>
      </div>
    </div>
  );
};

export default TicketCard;
