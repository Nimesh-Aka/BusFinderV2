import React from 'react'
import { FaWifi } from 'react-icons/fa';
import { GiWaterBottle } from 'react-icons/gi';
import { GiCharging } from 'react-icons/gi';
import { IoTv } from 'react-icons/io5';
import { FaSearch } from 'react-icons/fa';


const TopSearchCard = ({ routeFrom, routeTo, timeDuration, price, date }) => {

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      
    return (
        <div className='w-full p-5 space-y-10 border-2 rounded-xl border-neutral-300'>
            <div className="w-full space-y-3.5">
                {/*Route*/}
                <div className="space-y-0">
                    <div className="flex items-center justify-between w-full">
                        <p className="text-xs font-normal text-neutral-400">From</p>
                        <p className="text-xs font-normal text-neutral-400">To</p>
                    </div>

                    <div className="flex items-center justify-between w-full gap-x-3">
                        {/*From*/}
                        <h1 className="text-xl font-semibold text-neutral-600">
                            {routeFrom}
                        </h1>

                        {/*time duration */}
                        <div className="relative flex-1 border border-dashed border-neutral-400">
                            <p className="absolute flex items-center justify-center h-6 px-3 text-sm font-normal -translate-x-1/2 -translate-y-1/2 border border-dashed rounded-full w-fit top-1/2 left-1/2 bg-neutral-50 text-neutral-500 border-neutral-400 ">
                                {timeDuration}
                            </p>
                        </div>

                        {/* to */}
                        <h1 className="text-xl font-semibold text-neutral-600">
                            {routeTo}
                        </h1>

                    </div>
                </div>

                {/*Facilities*/}
                <div className="flex flex-wrap items-center w-full gap-3">
                    {/* first one */}
                    <div className="flex items-center gap-x-1">
                        <FaWifi className="w-3 h-3 text-neutral-500" />
                        <p className="text-xs font-normal text-neutral-600">
                            internet
                        </p>
                    </div>

                    {/* second one */}
                    <div className="flex items-center gap-x-1">
                        <GiWaterBottle className="w-3 h-3 text-neutral-500" />
                        <p className="text-xs font-normal text-neutral-600">
                            Snaks
                        </p>
                    </div>
                    {/* third one */}
                    <div className="flex items-center gap-x-1">
                        <IoTv className="w-3 h-3 text-neutral-500" />
                        <p className="text-xs font-normal text-neutral-600">
                            TV
                        </p>
                    </div>

                    {/* fourth one */}
                    <div className="flex items-center gap-x-1">
                        <GiCharging className="w-3 h-3 text-neutral-500" />
                        <p className="text-xs font-normal text-neutral-600">
                            Mobile Charging
                        </p>
                    </div>

                </div>


            </div>

            <div className="w-full space-y-3.5">
                <p className="text-xs font-normal text-neutral-600">{formattedDate}</p>
            </div>

            <div className="flex items-center justify-between w-full">
                {/* price */}
                <h1 className="text-xl font-semibold text-neutral-700">
                    Rs. {price}
                </h1>

                <button className="flex items-center justify-center py-1.5 px-5 text-sm font-normal duration-300 ease-in-out border-2 w-fit bg-primary hover:bg-transparent border-primary hover:border-primary rounded-xl text-neutral-50 gap-x-2 hover:text-primary ">
                    <FaSearch />
                    Reserve Seat
                </button>
                
            </div>
        </div>
    )
}

export default TopSearchCard