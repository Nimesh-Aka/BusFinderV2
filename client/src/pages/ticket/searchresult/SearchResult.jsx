import React from 'react'
import TicketCard from '../../../components/ticket/TicketCard'
import { FaBus } from 'react-icons/fa6'


const SearchResult = ({item, from, to}) => {



  // Find the matching cityName in busCitiesAndTimes array
  const matchingCityFrom = item.busCitiesAndTimes.find(
    city => city.cityName.toLowerCase() === from.toLowerCase()
  );
  const matchingCityTo = item.busCitiesAndTimes.find(
    city => city.cityName.toLowerCase() === to.toLowerCase()
  );
  

  //Seat Count
  const seatCount = item.seats.length;
  const availableSeats = item.seats.filter(seat => seat.availability === "available").length;
  
  /*console.log("matchingCityFrom", matchingCityFrom)
  console.log("matchingCityTo", matchingCityTo)
  console.log("item.busName",item.busName)
  console.log("item.busDepartureDate",item.busDepartureDate)
  console.log("matchingCityFrom.cityName",matchingCityFrom.cityName)
  console.log("matchingCityTo.cityName",matchingCityTo.cityName)*/

  return (
    <div className='w-full col-span-3 space-y-10 pt-11'>

      <div className="space-y-6">
      
        {matchingCityFrom && matchingCityTo && (
          <TicketCard 
          icon={FaBus} 
          busName={item.busName} 
          date={item.busDepartureDate} 
          routeFrom={matchingCityFrom.cityName} 
          routeTo={matchingCityTo.cityName} 
          departureTimeFrom={matchingCityFrom.arrivalTime}  // Better name
          arrivalTimeTo={matchingCityTo.arrivalTime}        // Better name
          price={item.busTicketPrice} 
          busType={item.busType}  
          busOwnership={item.busOwnership}
          availableSeats={availableSeats} 
          id={item._id}
          item={item}
        />
        )}
        
      </div>

      

    </div>
  )
}

export default SearchResult