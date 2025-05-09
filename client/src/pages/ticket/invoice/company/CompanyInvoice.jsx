import React from 'react';
import { FaPhone } from "react-icons/fa";
import { format } from 'date-fns';

const CompanyInvoice = ({ bookingData }) => {
  if (!bookingData) {
    return (
      <div className='w-full col-span-1 border-dashed border-1-2 border-neutral-400 relative p-5 flex justify-center items-center'>
        <p>Loading data...</p>
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

  // Debug - log the actual structure of the bus cities and times
  console.log("Cities and times data:", bus.busCitiesAndTimes);
  
   // Get the actual seat numbers from the bus seats using the IDs
   const seatNumbers = selectedSeats.map(seatId => {
    const seat = bus.seats.find(s => s._id === seatId);
    return seat ? seat.seatNumber : "Unknown";
  });


  // Get departure city (first city in the array)
  const departureCity = bus.busCitiesAndTimes[0]?.cityName || "N/A";
  
  // Format dates
  const formattedDepartureDate = format(new Date(bus.busDepartureDate), 'yyyy-MM-dd');
  
  // Extract departure time with extensive logging and robust fallbacks
  let departureTime = "N/A";
  
  if (bus.busCitiesAndTimes && bus.busCitiesAndTimes.length > 0) {
    const firstCity = bus.busCitiesAndTimes[0];
    console.log("First city data:", firstCity);
    
    // Try different possible property names for departure time
    const possibleTimeProperties = ['departureTime', 'arrivalTime', 'time'];
    
    for (const prop of possibleTimeProperties) {
      if (firstCity[prop]) {
        departureTime = firstCity[prop];
        console.log(`Found time in ${prop}:`, departureTime);
        break;
      }
    }
    
    // If still N/A, check if we can extract from other properties
    if (departureTime === "N/A" && firstCity.departingTime) {
      departureTime = firstCity.departingTime;
    }
  }
  
  // Get a user display name with fallback to email
  const userDisplayName = user?.userName || (user?.email ? user.email.split('@')[0] : 'Guest');

  return (
    <div className='w-full col-span-1 border-dashed border-1-2 
    border-neutral-400 relative '>
      <div className="w-full bg-primary px-4 py-5 rounded-tr-3xl">
        <h1 className="text-2xl text-neutral-50 font-extrabold 
        text-center">
            Bus Ticket
        </h1>
      </div>

      <div className="w-full px-4 py-7 space-y-1">
        <p className="text-sm text-neutral-600 font-normal">
            <span className="font-medium">Bill No.:</span> {_id.substring(0, 6)}
        </p>
        <p className="text-sm text-neutral-600 font-normal">
            <span className="font-medium">Date:</span> {formattedDepartureDate}
        </p>
        <p className="text-sm text-neutral-600 font-normal">
            <span className="font-medium">Name:</span> {user.userName}
        </p>
        <p className="text-sm text-neutral-600 font-normal">
            <span className="font-medium">From</span> {departureCity} <span className="text-xs">(Stand)</span>
        </p>
        <p className="text-sm text-neutral-600 font-normal">
            <span className="font-medium">To</span> {routeTo} <span className="text-xs">(Stand)</span>
        </p>
        <p className="text-sm text-neutral-600 font-normal">
            <span className="font-medium">Dept. Time:</span> {departureTime}
        </p>
        <p className="text-sm text-neutral-600 font-normal">
            <span className="font-medium">Seat No:</span> {seatNumbers.join(', ')}
        </p>
        <p className="text-sm text-neutral-600 font-normal">
            <span className="font-medium">Total Passenger:</span> {selectedSeats.length} Only
        </p>
        <p className="text-sm text-neutral-600 font-semibold">
            <span className="font-bold">Total Price:</span> Rs. {totalCost}
        </p>
      </div>

      {/* right bottom section */}
      <div className="w-full bg-primary absolute bottom-0 right-0 
              rounded-br-3xl flex item-center justify-center px-5 py-1.2 ">
                
        <div className="flex items-center gap-x-2">
          <FaPhone className="w-3 h-3 text-neutral-100" />
          <p className="text-xm text-neutral-100 font-light">
          077-6697324
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInvoice;