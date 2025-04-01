import React from 'react';
import PaymentMethod from './payment/PaymentMethod';

const PassengerData = () => {
  return (
    <div className="w-full col-span-2 py-4 space-y-6">
      <h1 className="text-xl text-neutral-700 font-semibold">
        Passenger Information
      </h1>

      <div className="space-y-7">
        <div className="w-full space-y-2">
          <label
            htmlFor="fullname"
            className="text-sm text-neutral-500 font-medium"
          >
            Full Name
          </label>
          <input
            type="text"
            placeholder="e.g. Hirusha Kularathna"
            className="w-full h-14 px-4 bg-neutral-100/40 focus:bg-neutral-100/70 border border-neutral-400/50 rounded-xl focus:outline-none focus:border-neutral-400 text-base text-neutral-600 font-normal placeholder:text-neutral-400"
          />
        </div>

        <div className="w-full space-y-2">
          <label
            htmlFor="email"
            className="text-sm text-neutral-500 font-medium"
          >
            Email Address
          </label>
          <input
            type="text"
            placeholder="e.g. hirusha@gmail.com"
            className="w-full h-14 px-4 bg-neutral-100/40 focus:bg-neutral-100/70 border border-neutral-400/50 rounded-xl focus:outline-none focus:border-neutral-400 text-base text-neutral-600 font-normal placeholder:text-neutral-400"
          />
        </div>

        <div className="w-full space-y-2">
          <label
            htmlFor="phone"
            className="text-sm text-neutral-500 font-medium"
          >
            Phone
          </label>
          <input
            type="text"
            placeholder="e.g. 077 000 0000"
            className="w-full h-14 px-4 bg-neutral-100/40 focus:bg-neutral-100/70 border border-neutral-400/50 rounded-xl focus:outline-none focus:border-neutral-400 text-base text-neutral-600 font-normal placeholder:text-neutral-400"
          />
        </div>
      </div>

    </div>
  );
};

export default PassengerData;
