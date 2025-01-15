import React from 'react'
import RootLayout from '../../../layout/RootLayout'
import ServiceCard from '../../../components/service/ServiceCard'
import { RiSecurePaymentLine, RiRefund2Line } from 'react-icons/ri';
import { PiHeadsetFill } from 'react-icons/pi';
import useFetch from '../../../Hooks/useFetch';

const Services = () => {
  const { data, loading, error} = useFetch("/buses/countByFirstStation?cities=Colombo,Matara,Kandy");

  return (
    <RootLayout className="space-y-12">

        {/* Tag */}
        <div className="flex items-center justify-center w-full text-center">
            <h1 className="text-3xl font-bold text-neutral-800">
                Our <span className='text-primary'>Services</span>
            </h1>
        </div>

        {/*Services Card */}
        {loading ? ("Loading please wait") : (
          <div className="grid w-full grid-cols-3 gap-10">
          <ServiceCard icon={RiSecurePaymentLine} title={"Colombo Buses"} desc={`${data[0]} buses in Colombo right now`} />
          <ServiceCard icon={RiRefund2Line} title={"Matara Buses"} desc={`${data[1]} buses in Matara right now`} />
          <ServiceCard icon={PiHeadsetFill} title={"Kandy Buses"} desc={`${data[2]} buses in Kandy right now`} />
          </div>
        )}
       

    </RootLayout>
  )
}

export default Services