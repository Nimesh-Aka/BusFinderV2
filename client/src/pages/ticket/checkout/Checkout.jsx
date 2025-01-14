import React from 'react'
import TopLayout from '../../../layout/toppage/TopLayout'
import RootLayout from '../../../layout/RootLayout'
import PassengerData from './passengerdata/PassengerData'
import BookingStatus from './bookingstatus/BookingStatus';
import { useLocation } from 'react-router-dom';


const Checkout = () => {
  const location = useLocation();
  const { selectedSeats, totalCost, id, routeTo} = location.state || {selectedSeats: [], totalCost: 0, id: "", routeTo: ""};


  return (
    <div className='w-full space-y-12 pb-16'>
      {/* Top Layout */}

      <TopLayout
        bgImg={"https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"}
        title={"Checkout"}
      />

      <RootLayout className="w-full pb-16 space-y-12">
        <div className="w-full grid grid-cols-4 items-start gap-44 relative">
          {/* Passenger Detail */}
          <PassengerData />
          {/* Ticket Report Status */}
          <BookingStatus id={id} routeTo={routeTo} selectedSeats={selectedSeats} totalCost={totalCost} />

        </div>
      </RootLayout>

    </div>
  )
}

export default Checkout
