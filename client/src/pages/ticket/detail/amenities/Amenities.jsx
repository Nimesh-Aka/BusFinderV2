import React from 'react';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { AiOutlineCloseSquare } from 'react-icons/ai';

const Amenities = () => {
  return (
    <div className="col-span-3 w-full">
      <div className="w-full space-y-3">
        <h1 className="text-lg text-neutral-600 font-medium text-start">
          Bus Amenities
        </h1>

        {/* Updated the grid layout to use 'grid-cols-2' for two columns */}
        <div className="w-full grid grid-cols-2 gap-x-8 gap-y-3">
          {/* Column 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-x-2 w-full">
              <IoMdCheckboxOutline className="w-5 h-5 text-green-500" />
              <p className="text-base text-neutral-700 font-normal">
                Supper AC 
              </p>
            </div>

            <div className="flex items-center gap-x-2 w-full">
              <IoMdCheckboxOutline className="w-5 h-5 text-green-500" />
              <p className="text-base text-neutral-700 font-normal">
                Charging Port
              </p>
            </div>

            <div className="flex items-center gap-x-2 w-full">
              <IoMdCheckboxOutline className="w-5 h-5 text-green-500" />
              <p className="text-base text-neutral-700 font-normal">
                Internet/Wifi
              </p>
            </div>

            <div className="flex items-center gap-x-2 w-full">
              <IoMdCheckboxOutline className="w-5 h-5 text-green-500" />
              <p className="text-base text-neutral-700 font-normal">
                AC & Air Suspension
              </p>
            </div>

            <div className="flex items-center gap-x-2 w-full">
              <AiOutlineCloseSquare className="w-5 h-5 text-red-500" /> 
              <p className="text-base text-neutral-700 font-normal">
                Sleeper Seat
              </p>
            </div>

            <div className="flex items-center gap-x-2 w-full">
              <AiOutlineCloseSquare className="w-5 h-5 text-red-500" />
              <p className="text-base text-neutral-700 font-normal">
                Snacks
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-2">
            <div className="flex items-center gap-x-2 w-full">
              <IoMdCheckboxOutline className="w-5 h-5 text-green-500" />
              <p className="text-base text-neutral-700 font-normal">
                2*2 VIP Sofa
              </p>
            </div>

            <div className="flex items-center gap-x-2 w-full">
              <AiOutlineCloseSquare className="w-5 h-5 text-red-500" />
              <p className="text-base text-neutral-700 font-normal">
                Cooler fan
              </p>
            </div>

            <div className="flex items-center gap-x-2 w-full">
              <IoMdCheckboxOutline className="w-5 h-5 text-green-500" />
              <p className="text-base text-neutral-700 font-normal">
                LED TV
              </p>
            </div>

            <div className="flex items-center gap-x-2 w-full">
              <IoMdCheckboxOutline className="w-5 h-5 text-green-500" />
              <p className="text-base text-neutral-700 font-normal">
                Water Bottles
              </p>
            </div>

            <div className="flex items-center gap-x-2 w-full">
              <AiOutlineCloseSquare className="w-5 h-5 text-red-500" />
              <p className="text-base text-neutral-700 font-normal">
                Luxury Seat
              </p>
            </div>

            <div className="flex items-center gap-x-2 w-full">
              <AiOutlineCloseSquare className="w-5 h-5 text-green-500" />
              <p className="text-base text-neutral-700 font-normal">
                Comfortable Seat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amenities;
