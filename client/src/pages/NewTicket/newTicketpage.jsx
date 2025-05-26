import React, { useState, useEffect } from "react";
import axios from "axios";
import "./newTicketpage.css";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaClock,
  FaBus,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { HiOutlineTicket } from "react-icons/hi";
import { format } from "date-fns";

const NewTicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        // Get user ID (using hardcoded ID as fallback)
        const userId = "683475a04387ad9ae76c1c35";

        // Fetch bookings for the logged-in user
        const response = await axios.get(
          `http://localhost:8000/api/buses/bookings/user/${userId}`
        );
        console.log("Tickets data:", response.data);
        setTickets(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("Failed to load tickets. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserTickets();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "yyyy-MM-dd");
    } catch (error) {
      return "Invalid date";
    }
  };

  // Function to format time
  const formatTime = (timeString) => {
    if (!timeString) return "N/A";

    // If timeString is already in a good format, return it
    if (
      typeof timeString === "string" &&
      (timeString.includes("AM") || timeString.includes("PM"))
    ) {
      return timeString;
    }

    // Otherwise try to format it
    try {
      // If it's a date string
      if (typeof timeString === "string" && timeString.includes(":")) {
        const [hours, minutes] = timeString.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
      }
      return timeString;
    } catch (error) {
      return "N/A";
    }
  };

  // Function to handle clicking on a ticket to see details
  const handleViewDetails = (bookingId) => {
    navigate(`/ticket-details/${bookingId}`);
  };

  // Function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      case "refunded":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <FaCheckCircle className="text-green-600" />;
      case "pending":
        return <FaClock className="text-yellow-600" />;
      case "cancelled":
        return <IoCloseCircle className="text-red-600" />;
      case "refunded":
        return <IoCloseCircle className="text-purple-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-t-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-black font-medium">
          Loading your tickets...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <IoCloseCircle size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">Oops!</h2>
          <p className="text-black mb-6">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <HiOutlineTicket size={32} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">
            No Tickets Found
          </h2>
          <p className="text-black mb-6">
            You haven't purchased any tickets yet.
          </p>
          <button
            onClick={() => navigate("/bus-tickets")}
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Book a Ticket
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-black mb-10">
          My Travel Tickets
        </h1>

        <div className="space-y-6">
          {tickets.map((ticket) => {
            // Find departure city (first stop)
            const departureCity =
              ticket.busId?.busCitiesAndTimes?.[0]?.cityName || "N/A";

            // Find departure time
            const departureTime =
              ticket.busId?.busCitiesAndTimes?.[0]?.departureTime ||
              ticket.busId?.busCitiesAndTimes?.[0]?.arrivalTime ||
              "N/A";

            return (
              <div
                key={ticket._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-red-100 hover:shadow-md transition-shadow"
              >
                <div className="border-b border-red-100">
                  <div className="flex items-center justify-between bg-red-600 text-white px-6 py-4">
                    <div className="flex items-center gap-x-3">
                      <FaBus size={24} />
                      <div>
                        <h2 className="text-xl font-bold">
                          {ticket.busId?.busName || "Bus"}
                        </h2>
                        <p className="text-white">
                          {ticket.busId?.busPlateNo || "No plate number"}
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium uppercase whitespace-nowrap"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    >
                      {ticket.busId?.busType || "Standard"}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="flex flex-col">
                      <span className="text-black text-sm flex items-center gap-1 mb-1">
                        <FaMapMarkerAlt className="text-red-600" /> From - To
                      </span>
                      <span className="text-lg font-medium text-black">
                        {departureCity} → {ticket.routeTo}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-black text-sm flex items-center gap-1 mb-1">
                        <FaCalendarAlt className="text-red-600" /> Travel Date
                      </span>
                      <span className="text-lg font-medium text-black">
                        {formatDate(ticket.busId?.busDepartureDate)}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-black text-sm flex items-center gap-1 mb-1">
                        <FaClock className="text-red-600" /> Departure Time
                      </span>
                      <span className="text-lg font-medium text-black">
                        {formatTime(departureTime)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-red-100 pt-4">
                    <div className="flex flex-wrap gap-6 md:items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-black">
                            Ticket No:
                          </span>
                          <span className="text-sm text-black">
                            {ticket._id.substring(0, 8)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-black">
                            Seats:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {/* Static seat display for A4 with red styling */}
                            <div className="inline-block px-3 py-1.5 text-sm font-medium bg-red-600 text-white border border-red-700 rounded-md shadow-sm">
                              A4
                            </div>
                            {/* Static seat display for A5 with red styling */}
                            <div className="inline-block px-3 py-1.5 text-sm font-medium bg-red-600 text-white border border-red-700 rounded-md shadow-sm">
                              A5
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-black">
                            Booked On:
                          </span>
                          <span className="text-sm text-black">
                            {formatDate(ticket.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end">
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(
                              ticket.paymentStatus
                            )}`}
                          >
                            <div className="flex items-center gap-1">
                              {getStatusIcon(ticket.paymentStatus)}
                              <span>{ticket.paymentStatus.toUpperCase()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <span className="text-lg font-bold text-black">
                            LKR {ticket.totalCost.toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleViewDetails(ticket._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewTicketPage;