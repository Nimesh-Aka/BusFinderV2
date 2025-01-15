import React from 'react'
import RootLayout from '../../../layout/RootLayout'
import WarningAlert from '../../../components/alertmessage/WarningAlert'
import { Link, useLocation } from 'react-router-dom'
import TopLayout from '../../../layout/toppage/TopLayout'
import BusSeat from './seat/busseat/BusSeat'
import ToggleBtn from '../../../components/togglebtn/ToggleBtn'
import Amenities from './amenities/Amenities'
import ReservationPolicy from './reservationpolicy/ReservationPolicy'
import BusImage from './busimage/BusImage'

const Detail = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2];
    const {routeTo} = location.state || {};
    console.log("Detail page location: ", id);
    console.log("Detail passenger location: ", routeTo);

    // show the warning message box
    const message = (
    <>
        One individual only can book 10 seats. If you want to book more than 10 seats, 
        please <Link to={"/support-team"} className='font-medium text-yellow-700'>Contact our support team.</Link>
    </>
    );
    

  return (
    <div className='w-full pb-16 space-y-12'>
    {/* Top Layout */}

    <TopLayout
        bgImg={"https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"}
        title={"Bus Details"}
    />

    <RootLayout className="w-full pb-16 space-y-12">

        {/* Seat layout and selection action detail*/}
        <div className="w-full space-y-8">

            {/* Warning message */}
            <WarningAlert message={message} />

            {/* Seat layout */}
            <BusSeat id={id} routeTo={routeTo}/>

        </div>

        {/* Bus details */}
        <div className="flex flex-col items-center justify-center w-full gap-8 text-center">
        {/* short description about the bus  */}
        <p className="text-base text-neutral-500 font-normal text-justify">
            The bus offers a comfortable and convenient travel experience with modern facilities such as air conditioning, 
            reclining seats, and ample legroom. 
            Additional amenities may include onboard Wi-Fi, USB charging ports, entertainment screens, and luggage storage compartments. 
            Some buses also provide refreshments, reading lights, and clean restrooms for long journeys, ensuring a pleasant and relaxing ride.
             <span className="text-lg text-neutral-600 font-medium ml-2">
                Want to see more about the bus?
            </span>   
            </p>

            {/* Button */}
            <div className="w-full flex items-center justify-center gap-6 flex-col">

                <ToggleBtn
                    buttonText={"See Bus Details"}
                    buttonTextHidden={"Hide Bus Details"}
                >
                    <div className="w-full space-y-10">

                        {/* reservation policy and amenities */}
                        <div className="w-full grid grid-cols-7 gap-20">

                            {/* Amenities */}
                            <Amenities/>

                            {/* Reservation policy */}
                            <ReservationPolicy/>

                        </div>
                        {/* bus images */}
                        <BusImage /> 
                    </div>

                </ToggleBtn>
                    
            </div>

        </div>

    </RootLayout>
      
    </div>
  )
}

export default Detail
