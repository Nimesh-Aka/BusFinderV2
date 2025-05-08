import React from 'react';
import BusImg from "../../../../assets/bus.png"; 
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import QrImg from "../../../../assets/qrcode.jpg";
import { format } from 'date-fns';

const PassengerInvoice = ({ bookingData }) => {
  if (!bookingData) {
    return (
      <div className="w-full col-span-4 flex justify-center items-center p-10">
        <p>Loading booking details...</p>
      </div>
    );
  }

  const { 
    _id,
    selectedSeats, 
    totalCost, 
    routeTo, 
    paymentStatus, 
    createdAt,
    busId: bus,
    userId: user
  } = bookingData;

  // Get the actual seat numbers from the bus seats using the IDs
  const seatNumbers = selectedSeats.map(seatId => {
    const seat = bus.seats.find(s => s._id === seatId);
    return seat ? seat.seatNumber : "Unknown";
  });

  // Get user's name
  const userName = user?.userName || (user?.email ? user.email.split('@')[0] : 'Guest');

  // Get departure city (first city in the array)
  const departureCity = bus.busCitiesAndTimes[0].cityName;
  
  // Find destination city details
  const destinationCity = bus.busCitiesAndTimes.find(
    city => city.cityName.toLowerCase() === routeTo.toLowerCase()
  );
  
  // Format dates
  const formattedBookingDate = format(new Date(createdAt), 'yyyy-MM-dd');
  const formattedDepartureDate = format(new Date(bus.busDepartureDate), 'yyyy-MM-dd');
  


  // Replace your existing departure time extraction code with this enhanced version:

let departureTime = "N/A";

if (bus.busCitiesAndTimes && bus.busCitiesAndTimes.length > 0) {
  const firstCity = bus.busCitiesAndTimes[0];
  console.log("First city data:", firstCity);
  
  // Try different possible property names for departure time
  const possibleTimeProperties = ['departureTime', 'arrivalTime', 'time', 'departingTime'];
  
  for (const prop of possibleTimeProperties) {
    if (firstCity[prop]) {
      // Get the raw time
      let rawTime = firstCity[prop];
      console.log(`Found time in ${prop}:`, rawTime);
      
      // Check if time already has AM/PM
      if (!rawTime.includes('AM') && !rawTime.includes('PM')) {
        // Try to parse the time assuming it's in 24-hour format (HH:MM)
        const timeMatch = rawTime.match(/^(\d{1,2}):(\d{2})$/);
        if (timeMatch) {
          const hours = parseInt(timeMatch[1], 10);
          const minutes = timeMatch[2];
          const period = hours >= 12 ? 'PM' : 'AM';
          const hours12 = hours % 12 || 12; // Convert 0 to 12
          rawTime = `${hours12}:${minutes} ${period}`;
        }
      }
      
      departureTime = rawTime;
      break;
    }
  }
}

// Log the final formatted departure time
console.log("Final formatted departure time:", departureTime);
  
  // Calculate per seat cost
  const perSeatCost = Math.round(totalCost / selectedSeats.length);

  return (
    <div className="w-full col-span-4 rounded-3xl relative">
      {/* Top bus detail */}
      <div className="w-full flex items-center justify-between bg-primary px-6 py-3 rounded-tl-3xl">
        <div className="flex items-center gap-x-3">
          <img src={BusImg} alt="bus img" className="w-auto h-12 object-cover object-center" />
          <h1 className="text-xl text-neutral-50 font-bold uppercase tracking-wider pt-1">
            {bus.busName}
          </h1>
        </div>

        <div className="flex items-center gap-x-2">
          <p className="text-xl text-neutral-50 font-bold">
            <span className="text-lg">({bus.busType})</span> {bus.busPlateNo}
          </p>
        </div>
      </div>

      <div className="w-full grid grid-cols-5 gap-8 items-center px-5 py-6 mb-7">
        <div className="col-span-4 space-y-3.5">
          {/* Bill no, per seat, and date */}
          <div className="w-full flex items-center justify-between border-dashed border-b-2 border-neutral-200 pb-3">
            <p className="text-base text-neutral-500 font-normal">Bill No: {_id.substring(0, 6)}</p>
            <p className="text-base text-neutral-500 font-normal">LKR {perSeatCost} <span className="text-xs">/seat</span></p>
            <p className="text-base text-neutral-500 font-normal">Date: {formattedDepartureDate}</p>
          </div>

          {/* Passenger detail */}
          <div className="w-full flex items-center justify-between">
            <div className="space-y-1.5">
              <p className="text-base text-neutral-500 font-normal">
                Name of Passenger: <span className="font-medium">{userName}</span>
              </p>
              <p className="text-base text-neutral-500 font-normal">
                Total Seat No.: <span className="font-medium">{seatNumbers.join(', ')}</span>
              </p>
              <p className="text-base text-neutral-500 font-normal">
                Pickup Stand: <span className="font-medium">{departureCity}</span>
              </p>
              <p className="text-base text-neutral-500 font-normal">
                Total No. of Passenger: <span className="font-medium">{selectedSeats.length} Only</span>
              </p>
              
            </div>

            <div className="space-y-4 flex items-center justify-center flex-col">
              <div className="space-y-1 text-center">
                <p className="text-base text-neutral-600 font-normal">Total Price:</p>
                <h1 className="text-xl text-neutral-600 font-bold">Rs. {totalCost}</h1>
              </div>
              
              {paymentStatus === "confirmed" ? (
                <div className="w-full px-3 rounded-full bg-green-500/5 border border-green-600 text-green-600 text-sm font-medium flex items-center justify-center gap-2">
                  <FaCheckCircle size={16} />
                  <span>Bill Paid</span>
                </div>
              ) : (
                <div className="w-fit px-3 rounded-full bg-primary/5 border border-primary text-primary text-sm font-medium flex items-center justify-center gap-2">
                  <IoCloseCircle size={16} />
                  <span>Pending</span>
                </div>
              )}
            </div>
          </div>

          {/* Route detail */}
          <div className="w-full flex items-center justify-between 
          border-dashed border-t-2 border-neutral-200 pt-3">
            <p className="text-base text-neutral-600 font-normal">
              {departureCity}
              <span className="text-neutral-400 px-2">-----</span>
              {routeTo}
            </p>
            <p className="text-base text-neutral-600 font-normal">
            Departure at: <span className="font-medium">{departureTime}</span>
            
            </p>
            <div className="px-3 py-1 bg-yellow-50 border border-yellow-300 rounded-md">
              <p className="text-xs text-yellow-700 font-medium">
                Please arrive 10 minutes before departure time
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 border border-neutral-200 rounded-xl shadow-sm p-1">
          <img src={QrImg} alt="Qr Img" className="w-full aspect-square
          object-cover object-center rounded-xl" />
        </div>
      </div>

      {/* Bottom primary bar */}
      <div className="w-full bg-primary absolute bottom-0 left-0 
      rounded-bl-3xl flex item-center justify-between px-5 py-1,5 ">
        <p className="text-xs text-neutral-100 font-light">
          Note: 40% charge for cancellation price 24 hours of 
          programme.
        </p>
        <div className="flex items-center gap-x-2">
          <FaPhone className="w-3 h-3 text-neutral-100" />
          <p className="text-xm text-neutral-100 font-light">
          077-6697324, 041-2223524
          </p>
        </div>
      </div>
    </div>
  );
};

export default PassengerInvoice;