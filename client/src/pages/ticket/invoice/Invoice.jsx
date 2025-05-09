import React, { useRef, useState, useEffect } from 'react'
import RootLayout from '../../../layout/RootLayout'
import TopLayout from '../../../layout/toppage/TopLayout'
import PassengerInvoice from './passengerinvoice/PassengerInvoice';
import CompanyInvoice from './company/CompanyInvoice';
import Download from 'downloadjs';
import { toPng } from 'html-to-image';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Invoice = () => {
    const invoiceRef = useRef(null);
    const location = useLocation();
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch booking data when component mounts
    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                // Extract session ID from URL query parameters
                const searchParams = new URLSearchParams(location.search);
                const sessionId = searchParams.get('session_id');
                
                if (!sessionId) {
                    throw new Error('Session ID not found in URL');
                }
                
                console.log("Fetching booking with session ID:", sessionId);
                
                // Make API call to get booking data with full URL
                const response = await axios.get(`http://localhost:8000/api/buses/booking/${sessionId}`);
                console.log("Booking data received:", response.data);
                setBookingData(response.data);
            } catch (err) {
                console.error('Error fetching booking details:', err);
                // Show more detailed error information
                if (err.response) {
                    console.error("Error status:", err.response.status);
                    console.error("Error data:", err.response.data);
                    setError(`${err.message} - Server says: ${JSON.stringify(err.response.data)}`);
                } else {
                    setError(err.message || 'Failed to load booking information');
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchBookingData();
    }, [location]);

    const handleDownload = async () => {
        if (invoiceRef.current == null) return; 

        try {
            //convert the invoice card to an image
            const dataUrl = await toPng(invoiceRef.current);

            //download the image
            Download(dataUrl, "g-tech-invoice-report.png");
        } catch(error) {
            console.error("Error while downloading the invoice", error);
        }
    }

    return (
        <div className='w-full space-y-12 pb-16'>
            {/* Top Layout */}
            <TopLayout
                bgImg={"https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"}
                title={"Collect Your Invoice"}
            />

            <RootLayout className="w-full pb-16 space-y-12">
                {loading ? (
                    // Loading state
                    <div className="w-full flex items-center justify-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    // Error state
                    <div className="w-full flex items-center justify-center py-16">
                        <div className="text-red-500 text-center">
                            <p className="text-xl font-bold mb-2">Error</p>
                            <p>{error}</p>
                        </div>
                    </div>
                ) : (
                    // Content when data is loaded
                    <div className="w-full flex items-center justify-center">
                        {/* invoice card */}
                        <div 
                            ref={invoiceRef} //refer to the invoice card
                            className="w-[90%] grid grid-cols-5 bg-white 
                            rounded-3xl border border-neutral-200 shadow-sm 
                            relative"
                        >
                            {/* Left side (for passenger) */}
                            <PassengerInvoice bookingData={bookingData} />

                            {/* Right side (for company) */}
                            <CompanyInvoice bookingData={bookingData} />

                            {/* cut circle */}
                            <div className="absolute -top-3 right-[18.8%] h-6 w-6
                            rounded-full bg-neutral-50 border border-neutral-50" />

                            <div className="absolute -bottom-3 right-[18.8%] h-6 w-6
                            rounded-full bg-neutral-50 border border-neutral-50" />
                        </div>
                    </div>
                )}

                {/* download invoice card button - only show when data is loaded */}
                {!loading && !error && bookingData && (
                    <div className="w-full flex justify-center items-center">
                        <button 
                            onClick={handleDownload} 
                            className='w-fit px-8 h-14 bg-primary text-neutral-50
                            font-bold text-lg rounded-lg'
                        >
                            Download Invoice
                        </button>
                    </div>
                )}
            </RootLayout>
        </div>
    )
}

export default Invoice