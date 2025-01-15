import React from 'react';

const ReservationPolicy = () => {
  return (
    <div className="col-span-4 w-full flex">
      {/* Vertical Line */}
      <div className="border-l-2 border-neutral-300 h-full"></div>

      {/* Content Section */}
      <div className="w-full space-y-3 text-left pl-5">
        <h1 className="text-lg text-neutral-600 font-medium">
          Reservation Policies
        </h1>

        <ul className="w-full list-disc list-outside space-y-2.5 px-4">
            <li className="text-sm text-neutral-500 font-normal">
                Please note that ticket is non-refundable.
            </li>

            <li className="text-sm text-neutral-500 font-normal">
                Passengers must keep their tickets until the journey 
                ends; otherwise, they wil need to purchase a new one.
            </li>

            <li className="text-sm text-neutral-500 font-normal">
                Tickets can be cancelled 24 hours before the 
                departure time for a 50% fee.
            </li>

            <li className="text-sm text-neutral-500 font-normal">
                Bus services may be cancelled, rescheduled, or 
                delayed due to natural disasters or other unforeseen
                circumstances.
            </li>

            <li className="text-sm text-neutral-500 font-normal">
            Passengers must arrive at the bording point 30
            minutes before the departure time. The company is not
            responsible for missed buses due to late arrivals.
            </li>


        </ul>
      </div>
    </div>
  );
};

export default ReservationPolicy;
