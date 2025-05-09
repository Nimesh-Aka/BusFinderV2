import React from "react";
import { FaLongArrowAltRight, FaBus, FaCalendarAlt, FaClock } from "react-icons/fa";
import { MdAirlineSeatReclineNormal, MdLocationOn } from "react-icons/md";
import useFetch from "../../../../Hooks/useFetch";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const BookingStatus = ({ 
  id, 
  routeTo, 
  selectedSeats, 
  totalCost,
  departureDate,
  departureTime,
  arrivalTime,
  fromCity,
  busName,
  busType
}) => {
  const { data, loading, error } = useFetch(`/buses/find/${id}`);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!data || !data.busCitiesAndTimes) return <p>No data available</p>;

  const busPlateNo = data.busPlateNo;
  const matchingCity = data.busCitiesAndTimes.find(
    (city) => city.cityName === routeTo
  );
  if (!matchingCity) return <p>Invalid destination</p>;

  // Calculate travel duration
  const getTravelDuration = () => {
    const [startHours, startMinutes] = departureTime.split(":").map(Number);
    const [endHours, endMinutes] = arrivalTime.split(":").map(Number);

    let hoursDiff = endHours - startHours;
    let minutesDiff = endMinutes - startMinutes;

    if (minutesDiff < 0) {
      hoursDiff--;
      minutesDiff += 60;
    }

    if (hoursDiff < 0) {
      hoursDiff += 24;
    }

    if (hoursDiff === 0) {
      return `${minutesDiff} min`;
    } else if (minutesDiff === 0) {
      return `${hoursDiff} ${hoursDiff === 1 ? 'hour' : 'hours'}`;
    } else {
      return `${hoursDiff} ${hoursDiff === 1 ? 'hour' : 'hours'} ${minutesDiff} min`;
    }
  };

  // Format date for better display
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  //payment function
  const makePayment = async () => {
    try {
      console.log("Initializing Stripe...");
      const stripe = await loadStripe(
        "pk_test_51QhB8bKL0PphUpNSPVajkCGGZQInLLXE8OiEvMqf82Rg740jFXP2Oxa1lxJbxedDPmH2cQOPVKri91dBff2cAkjV002RtaIZVH"
      );
      if (!stripe) throw new Error("Failed to load Stripe.js");

      const amountInCents = Math.round(Number(totalCost));
      if (isNaN(amountInCents) || amountInCents <= 0)
        throw new Error("Invalid totalCost");

      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const userId = parsedUser && parsedUser.user ? parsedUser.user.id : null;

      if (!userId) {
        alert("User ID not found. Please log in again.");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/buses/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            busId: id,
            selectedSeats,
            totalCost: amountInCents,
            routeTo,
            busName,
            busPlateNo,
          }),
        }
      );
      
      const data = await response.json();
      if (response.status !== 200)
        throw new Error(data.message || "Payment failed");

      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) throw new Error(error.message);
    } catch (err) {
      console.error("Payment Error:", err.message);
      alert(err.message);
    }
  };

  return (
    <div className="w-full col-span-2 sticky top-20 space-y-5">
      <div className="w-full bg-white rounded-lg py-5 px-6 border border-neutral-200 shadow-md space-y-4">
        {/* Header - more compact */}
        <div className="relative pb-3 mb-1">
          <h1 className="text-lg text-neutral-800 font-bold text-center">
            Your Ticket Summary
          </h1>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
  
        {/* Bus Information - reduced vertical and horizontal padding */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <FaBus className="text-blue-600 mr-1.5 text-lg" />
              <h2 className="text-base font-semibold text-blue-800">
                {busName}
              </h2>
            </div>
            <span className="px-2 py-0.5 bg-blue-200 text-blue-800 rounded-full text-xs font-medium">
              {busType}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-blue-700">
              <FaCalendarAlt className="mr-1" />
              <span className="font-medium">{formatDate(departureDate)}</span>
            </div>
            <div className="flex items-center text-xs bg-blue-700 text-white px-2 py-0.5 rounded">
              <span className="font-medium">Bus No: {busPlateNo}</span>
            </div>
          </div>
        </div>
  
        <div className="space-y-3">
          {/* Journey Details - reduced padding and margins */}
          <div className="space-y-2 w-full">
            <h1 className="text-sm text-neutral-700 font-medium flex items-center">
              <MdLocationOn className="mr-1" /> Trip Details
            </h1>
            
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="flex items-start justify-between w-full">
                <div className="space-y-1 text-center">
                  <p className="text-xs text-neutral-500">FROM</p>
                  <p className="text-xs font-semibold text-neutral-700">{fromCity}</p>
                  <div className="mt-0.5 px-2 py-0.5 bg-primary/10 rounded">
                    <span className="text-xs font-bold text-primary">{departureTime}</span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center mx-2 relative">
                  <div className="border-t border-dashed border-primary w-full my-1"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 bg-white px-2 py-0.5 rounded-full border border-primary/30 shadow-sm">
                    <span className="text-xs font-semibold text-primary">{getTravelDuration()}</span>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-0.5 h-0.5 rounded-full bg-primary"></div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-1 text-center">
                  <p className="text-xs text-neutral-500">TO</p>
                  <p className="text-xs font-semibold text-neutral-700">{routeTo}</p>
                  <div className="mt-0.5 px-2 py-0.5 bg-primary/10 rounded">
                    <span className="text-xs font-bold text-primary">{arrivalTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Seat Details - more compact layout */}
          <div className="space-y-2 w-full">
            <h1 className="text-sm text-neutral-700 font-medium flex items-center">
              <MdAirlineSeatReclineNormal className="mr-1" /> Your Seats
            </h1>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="flex flex-wrap items-center justify-center w-full gap-1.5">
                {selectedSeats.length > 0 ? (
                  <>
                    {selectedSeats.map((seat) => (
                      <div
                        key={seat}
                        className="flex items-center justify-center text-xs font-semibold rounded w-8 h-8 bg-white border border-primary/30 text-primary shadow-sm"
                      >
                        {data.seats.find((s) => s._id === seat)?.seatNumber ||
                          "N/A"}
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-xs text-neutral-500">No seats selected</p>
                )}
              </div>
              {selectedSeats.length > 0 && (
                <div className="mt-2 text-center">
                  <span className="text-xs text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full">
                    {selectedSeats.length} {selectedSeats.length === 1 ? "seat" : "seats"} selected
                  </span>
                </div>
              )}
            </div>
          </div>
  
          {/* Fare Details - reduced padding */}
          <div className="space-y-2 w-full">
            <h1 className="text-sm text-neutral-700 font-medium">Fare Summary</h1>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="flex items-center justify-between w-full text-xs">
                <span className="text-neutral-600">Base Fare</span>
                <span className="text-neutral-700">Rs {data.busTicketPrice} × {selectedSeats.length}</span>
              </div>
              
              <div className="border-t border-dashed border-neutral-300 my-2"></div>
              
              <div className="flex items-center justify-between w-full bg-primary/5 p-2 rounded">
                <div>
                  <span className="text-xs font-medium text-neutral-700">Total Amount</span>
                  <p className="text-xs text-neutral-500">(incl. all taxes)</p>
                </div>
                <span className="text-base font-bold text-primary">Rs {totalCost}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full">
        <button
          onClick={makePayment}
          className="w-full text-sm font-medium bg-primary hover:bg-primary/90 text-white py-2.5 flex items-center justify-center uppercase rounded-lg transition-all shadow-md shadow-primary/20 hover:shadow-primary/30"
        >
          <span>Proceed to Payment</span>
          <FaLongArrowAltRight className="ml-2" />
        </button>
        <p className="text-xs text-center text-neutral-500 mt-2 flex items-center justify-center">
          <span className="w-1 h-1 bg-green-500 rounded-full mr-1"></span>
          Your payment will be processed securely via Stripe
        </p>
      </div>
    </div>
  );
};

export default BookingStatus;