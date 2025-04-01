import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import useFetch from "../../../../Hooks/useFetch";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const BookingStatus = ({ id, routeTo, selectedSeats, totalCost }) => {
  const { data, loading, error } = useFetch(`/buses/find/${id}`);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;
  if (!data || !data.busCitiesAndTimes) return <p>No data available</p>;

  console.log("BusSeat data:", data);
  console.log("BusSeat routeTo:", routeTo);
  console.log("Selected Seats:", selectedSeats);

  const busName = data.busName;
  const busPlateNo = data.busPlateNo;

  const matchingCity = data.busCitiesAndTimes.find(
    (city) => city.cityName === routeTo
  );
  if (!matchingCity) return <p>Invalid destination</p>;

  console.log("Destination:", matchingCity.cityName);

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

      console.log("Sending request to backend...");

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

      console.log("Redirecting to Stripe checkout...");
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
      if (error) throw new Error(error.message);
    } catch (err) {
      console.error("Payment Error:", err.message);
      alert(err.message);
    }
  };
  //payment function end

  return (
    <div className="w-full col-span-2 sticky top-20 space-y-7">
      <div className="w-full bg-neutral-50 rounded-xl py-6 px-8 border border-neutral-200 shadow-sm space-y-5">
        <h1 className="text-lg text-neutral-700 font-bold text-center border-b border-neutral-200 pb-4">
          Your Ticket Report Status
        </h1>

        <div className="space-y-5">
          <div className="space-y-2 w-full">
            <h1 className="text-base text-neutral-700 font-medium">
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
            </div>
          </div>

          <div className="space-y-2 w-full">
            <h1 className="text-base text-neutral-700 font-medium">
              Your Seats
            </h1>
            <div className="flex items-center w-full gap-x-3">
              {selectedSeats.length > 0 ? (
                selectedSeats.map((seat) => (
                  <div
                    key={seat}
                    className="flex items-center justify-center text-base font-semibold rounded-lg w-9 h-9 bg-neutral-200/80 text-neutral-700"
                  >
                    {data.seats.find((s) => s._id === seat)?.seatNumber ||
                      "N/A"}
                  </div>
                ))
              ) : (
                <p>No seats selected</p>
              )}
            </div>
          </div>

          <div className="space-y-2 w-full">
            <h1 className="text-base text-neutral-700 font-medium">
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
              <p className="text-base font-semibold text-neutral-600">
                Rs {totalCost}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-1.5">
        <button
          onClick={makePayment}
          className="w-full text-sm font-normal bg-primary hover:bg-primary/90 text-neutral-50 py-2.5 flex items-center justify-center uppercase rounded-lg transition"
        >
          Proceed to Pay <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
};

export default BookingStatus;
