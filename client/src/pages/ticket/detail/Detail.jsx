import React from 'react'
import RootLayout from '../../../layout/RootLayout'
import WarningAlert from '../../../components/alertmessage/WarningAlert'
import { Link, useLocation } from 'react-router-dom'
import TopLayout from '../../../layout/toppage/TopLayout'
import BusSeat from './seat/busseat/BusSeat'

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
        <div className="flex flex-col items-center justify-center w-full gap-8 text-center"></div>

    </RootLayout>
      
    </div>
  )
}

export default Detail
