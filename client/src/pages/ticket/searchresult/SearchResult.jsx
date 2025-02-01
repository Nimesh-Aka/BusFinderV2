import React from 'react'
import TicketCard from '../../../components/ticket/TicketCard'
import { FaBus } from 'react-icons/fa6'


const SearchResult = ({item, from, to}) => {


  // Find the matching cityName in busCitiesAndTimes array
  const matchingCityFrom = item.busCitiesAndTimes.find(city => city.cityName === from);
  const matchingCityTo = item.busCitiesAndTimes.find(city => city.cityName === to);

  //Seat Count
  const seatCount = item.seats.length;
  

  return (
    <div className='w-full col-span-3 space-y-10 pt-11'>

      <div className="space-y-6">

      
        {matchingCityFrom && matchingCityTo && (
          <TicketCard icon={FaBus} busName={item.busName} date={item.busDepartureDate} routeFrom={matchingCityFrom.cityName} routeTo={matchingCityTo.cityName} 
          arrivalTime={matchingCityFrom.arrivalTime} departureTime={matchingCityTo.arrivalTime} price={item.busTicketPrice} availableSeats={seatCount} id={item._id}
          item={item}/>
        )}
        
      </div>

      

    </div>
  )
}

export default SearchResult