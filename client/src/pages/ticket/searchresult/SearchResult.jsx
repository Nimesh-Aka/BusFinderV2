import React from 'react'
import TicketCard from '../../../components/ticket/TicketCard'
import { FaBus } from 'react-icons/fa6'


const SearchResult = ({item, to}) => {

  // Find the matching cityName in busCitiesAndTimes array
  const matchingCity = item.busCitiesAndTimes.find(city => city.cityName === to);

  return (
    <div className='w-full col-span-3 space-y-10 pt-11'>

      <div className="space-y-6">

      
        <TicketCard icon={FaBus} busName={item.busName} date={item.busDepartureDate} routeFrom={item.busCitiesAndTimes[0].cityName} routeTo={matchingCity.cityName} 
        arrivalTime={item.busCitiesAndTimes[0].arrivalTime} departureTime={matchingCity.arrivalTime} price={item.busTicketPrice} availableSeats={"15"} id={item._id}/>
        
      </div>

      

    </div>
  )
}

export default SearchResult