import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const { selectedSeats, busId, sessionId } = location.state || {};

  useEffect(() => {
    if (!selectedSeats || !busId || !sessionId) {
      console.error("Missing booking details!");
      return;
    }

    // Extract seat numbers instead of _id
    const seatNumbers = selectedSeats.map(seat => seat.seatNumber); 

    console.log("Sending Seat Numbers to Backend:", seatNumbers);

    const confirmBooking = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/buses/confirmbooking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            busId,
            selectedSeats: seatNumbers, // Send seat numbers, not _id
            sessionId
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Booking Confirmed:", data);
        } else {
          console.error("Booking Failed:", data.error);
        }
      } catch (error) {
        console.error("Error confirming booking:", error);
      }
    };

    confirmBooking();
  }, [selectedSeats, busId, sessionId]);

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Your booking has been confirmed!</p>
    </div>
  );
};

export default PaymentSuccess;
