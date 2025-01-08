import React from 'react'
import RootLayout from '../../../layout/RootLayout'
import ServiceCard from '../../../components/service/ServiceCard'
import { RiSecurePaymentLine, RiRefund2Line } from 'react-icons/ri';
import { PiHeadsetFill } from 'react-icons/pi';

const Services = () => {
  return (
    <RootLayout className="space-y-12">

        {/* Tag */}
        <div className="flex items-center justify-center w-full text-center">
            <h1 className="text-3xl font-bold text-neutral-800">
                Our <span className='text-primary'>Services</span>
            </h1>
        </div>

        {/*Services Card */}
        <div className="grid w-full grid-cols-3 gap-10">
            <ServiceCard icon={RiSecurePaymentLine} title={"Secure PayMent"} desc={"Integrate secure payment gateways for users to ay for their tickets"} />
            <ServiceCard icon={RiRefund2Line} title={"Refund Policy"} desc={"Offer options for the users to purchase refundable tickets with clear terms "} />
            <ServiceCard icon={PiHeadsetFill} title={"24/7 support"} desc={"Get assistance anytime through chat, email, or phone"} />
        </div>

    </RootLayout>
  )
}

export default Services