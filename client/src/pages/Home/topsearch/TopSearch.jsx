import React from 'react'
import RootLayout from '../../../layout/RootLayout'
import TopSearchCard from '../../../components/topsearch/TopSearchCard'
import useFetch from '../../../Hooks/useFetch'

const TopSearch = () => {

    const { data, loading, error } = useFetch('/buses?busTicketPrice=1600&limit=6')

    if (loading) {
        return (
            <RootLayout className="space-y-12">
                <div className="flex items-center justify-center w-full text-center">
                    <h1 className="text-3xl font-bold text-neutral-800">
                        Loading Top Search <span className='text-primary'>Routes...</span>
                    </h1>
                </div>
            </RootLayout>
        )
    }

    if (error) {
        return (
            <RootLayout className="space-y-12">
                <div className="flex items-center justify-center w-full text-center">
                    <h1 className="text-3xl font-bold text-red-500">
                        Error loading data! Please try again later.
                    </h1>
                </div>
            </RootLayout>
        )
    }

    return (
        <RootLayout className="space-y-12">
            {/* Tag */}
            <div className="flex items-center justify-center w-full text-center">
                <h1 className="text-3xl font-bold text-neutral-800">
                    Top Search <span className='text-primary'>Routes</span>
                </h1>
            </div>

            {/* Top Search tickets routes Card */}
            <div className="grid w-full grid-cols-3 gap-5">
                {data.map((item) => (
                    <TopSearchCard 
                        key={item._id} 
                        routeFrom={item.busCitiesAndTimes[0].cityName} 
                        routeTo={item.busCitiesAndTimes[item.busCitiesAndTimes.length - 1].cityName} 
                        timeDuration="2 Hrs"  // You can modify this logic based on your needs
                        price={item.busTicketPrice} 
                        date={item.busDepartureDate}
                    />
                ))}
            </div>
        </RootLayout>
    )
}

export default TopSearch
