import React from 'react'
import TicketCard from '../../../components/ticket/TicketCard'
import { FaBus } from 'react-icons/fa6'
import {GrRefresh} from "react-icons/gr";

const SearchResult = ({item}) => {
  return (
    <div className='w-full col-span-3 space-y-10 pt-11'>

      <div className="space-y-6">

        <TicketCard icon={FaBus} busName={item.busName} routeFrom={item.busCitiesAndTimes[0].cityName} routeTo={item.busCitiesAndTimes[item.busCitiesAndTimes.length - 1].cityName} 
        arrivalTime={item.busCitiesAndTimes[0].arrivalTime} departureTime={item.busCitiesAndTimes[item.busCitiesAndTimes.length - 1].arrivalTime} price={item.busTicketPrice} availableSeats={"15"} />
        
      </div>

      <div className="flex items-center justify-center w-full">
        <button className="flex items-center justify-center px-8 py-3 text-base font-normal duration-300 ease-in-out border-2 w-fit bg-primary hover:bg-transparent border-primary hover:border-primary rounded-xl text-neutral-50 gap-x-2 hover:text-primary ">
          <GrRefresh/>
          Load More
        </button>
      </div>

    </div>
  )
}

export default SearchResult