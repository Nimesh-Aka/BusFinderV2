import React, { useRef } from 'react'
import RootLayout from '../../../layout/RootLayout'
import TopLayout from '../../../layout/toppage/TopLayout'
import PassengerInvoice from './passengerinvoice/PassengerInvoice';
import CompanyInvoice from './company/CompanyInvoice';
import Download from 'downloadjs';
import { toPng } from 'html-to-image';



const Invoice = () => {

    const invoiceRef = useRef(null);


    const handleDownload = async () => {
        if (invoiceRef.current == null) return; 

        // To download the invoice card to a png, You need to install this library npm install html-to-image downloadjs
        try{
            //convert the  invoice car to an image
            const dataUrl = await toPng(invoiceRef.current);

            //download the image
            Download(dataUrl, "g-tech-invoice-report.png");
    }catch(error){
        console.error("Error while downloading the invoice", error);
    }

 }
  return (
    <div className='w-full space-y-12 pb-16'>
      {/* Top Layout */}

      <TopLayout
        bgImg={"https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"}
        title={"colect your invoice"}
      />

      <RootLayout className="w-full pb-16 space-y-12">
        <div className="w-full flex items-center justify-center ">
          
            {/* invoice card */}
            <div 
            ref={invoiceRef} //refer to the invoice card
            className="w-[90%] grid grid-cols-5 bg-white 
            rounded-3xl border border-neutral-200 shadow-sm 
            relative"
            >

                {/* Left side (for passenger) */}
                <PassengerInvoice />

                {/* Right side (for company) */}
                <CompanyInvoice />

                {/* cut circle */}
                <div className="absolute -top-3 right-[18.8%] h-6 w-6
                rounded-full bg-neutral-50 border border-neutral-50" />

            <div className="absolute -bottom-3 right-[18.8%] h-6 w-6
                rounded-full bg-neutral-50 border border-neutral-50" />

            </div>

            

        </div>
        {/* download invoice card button */}
        <div className="w-full flex justify-center items-center">
                <button onClick={handleDownload} className='w-fit px-8 h-14 bg-primary text-neutral-50
                font-bold text-lg rounded-lg'>
                    Download Invoice
                </button>
            </div>
      </RootLayout>

    </div>
  )
}

export default Invoice
