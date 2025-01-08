import React from 'react'
import RootLayout from '../../../layout/RootLayout'
import TopSearchCard from '../../../components/topsearch/TopSearchCard'


const TopSearch = () => {
    return (
        <RootLayout className="space-y-12">

            {/* Tag */}
            <div className="flex items-center justify-center w-full text-center">
                <h1 className="text-3xl font-bold text-neutral-800">
                    Top Search <span className='text-primary'>Routes</span>
                </h1>
            </div>

            
        {/*top Search tickets routes Card */}
        <div className="grid w-full grid-cols-3 gap-5">
            <TopSearchCard routeFrom={"Matara"} routeTo={"Galle"} timeDuration={"2 Hrs"} price={"180"} />
            <TopSearchCard routeFrom={"Matara"} routeTo={"Colombo"} timeDuration={"4 Hrs"} price={"750"} />
            <TopSearchCard routeFrom={"Galle"} routeTo={"Colombo"} timeDuration={"3 Hrs"} price={"600"} />
            <TopSearchCard routeFrom={"Kurunagala"} routeTo={"Kandy"} timeDuration={"2 Hrs"} price={"200"} />
            <TopSearchCard routeFrom={"Matara"} routeTo={"Jaffna"} timeDuration={"16 Hrs"} price={"1500"} />
            <TopSearchCard routeFrom={"Gampaha"} routeTo={"Colombo"} timeDuration={"1 Hrs"} price={"220"} />
        </div>
            
        </RootLayout>
    )
}

export default TopSearch