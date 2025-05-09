import React, { useEffect } from 'react'
import TopLayout from '../../../layout/toppage/TopLayout'
import RootLayout from '../../../layout/RootLayout'
import PassengerData from './passengerdata/PassengerData'
import BookingStatus from './bookingstatus/BookingStatus'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../../Hooks/useFetch'

const Checkout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Destructure all necessary data with fallback values to match what's passed from seat selection
  const { 
    selectedSeats = [], 
    totalCost = 0, 
    id = "", 
    routeTo = "",
    busName = "",
    busType = "",
    departureDate = "",
    departureTime = "",
    arrivalTime = "",
    fromCity = ""
  } = location.state || {}

  const { data, loading, error } = useFetch(`/buses/find/${id}`);
  console.log("Data fetched in Checkout:", data)
  
  // Redirect if no valid data is available
  useEffect(() => {
    if (!location.state || !id || selectedSeats.length === 0) {
      navigate('/bus-tickets', { replace: true })
    }
  }, [location.state, id, selectedSeats, navigate])

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Top Layout */}
      <TopLayout
        bgImg={
          "https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"
        }
        title={"Complete Your Booking"}
        subtitle={"Just a few more details to confirm your journey"}
      />

      <RootLayout className="w-full flex-grow py-12">
        <div className="container mx-auto">
          
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Left column - Passenger form with info message below */}
            <div className="w-full lg:w-1/2 space-y-4">
              <PassengerData 
                selectedSeats={selectedSeats}
                busName={busName}
                busType={busType}
                departureDate={departureDate}
                departureTime={departureTime}
                fromCity={fromCity}
                routeTo={routeTo}
              />
              
              {/* Important information box below PassengerData */}
              <div className="w-full p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-700 text-sm">
                <h3 className="font-medium mb-1">Important Information:</h3>
                <p>
                  Please arrive at your boarding point 10 minutes early. If you
                  have any problems, please contact us at 074-0654555.
                </p>
              </div>
            </div>

            {/* Right column - Booking status */}
            <div className="w-full lg:w-1/2">
              <BookingStatus
                id={id}
                routeTo={routeTo}
                selectedSeats={selectedSeats}
                totalCost={totalCost}
                busName={busName}
                busType={busType}
                fromCity={fromCity}
                departureDate={departureDate}
                departureTime={departureTime}
                arrivalTime={arrivalTime}
              />
            </div>
          </div>
        </div>
      </RootLayout>
    </div>
  );
}

export default Checkout