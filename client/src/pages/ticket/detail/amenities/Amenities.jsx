import React from 'react';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import { FaBus, FaBuilding } from 'react-icons/fa';
import useFetch from '../../../../Hooks/useFetch';
import { useParams } from 'react-router-dom';

const Amenities = () => {
  const { id } = useParams();
  const { data: bus, loading, error } = useFetch(`/buses/find/${id}`);

  // All possible amenities to display
  const allAmenities = [
    { key: 'AC', label: 'Super AC' },
    { key: 'Charging Ports', label: 'Charging Port' },
    { key: 'Internet/Wifi', label: 'Internet/Wifi' },
    { key: 'Fan', label: 'Cooler Fan' }
  ];

  // Bus type information with descriptions
  const busTypeInfo = {
    'AC Delux': 'Premium air-conditioned bus with comfortable seating',
    'Tourist AC Delux': 'Luxury coach with extra amenities for tourists',
    'Air Suspension': 'Enhanced comfort with superior suspension system',
    'Semi Luxury': 'Comfortable bus with basic amenities'
  };

  // Bus ownership information
  const ownershipInfo = {
    'CTB': 'Government-operated service by Ceylon Transport Board',
    'Private': 'Privately owned and operated bus service'
  };

  // Color themes based on bus type
  const getTypeColor = (type) => {
    switch(type) {
      case 'AC Delux': return 'bg-blue-100 text-blue-800';
      case 'Tourist AC Delux': return 'bg-purple-100 text-purple-800';
      case 'Air Suspension': return 'bg-green-100 text-green-800';
      case 'Semi Luxury': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Color for ownership
  const getOwnershipColor = (ownership) => {
    return ownership === 'CTB' ? 'bg-teal-100 text-teal-800' : 'bg-orange-100 text-orange-800';
  };

  if (loading) return (
    <div className="col-span-3 w-full animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
      <div className="h-12 bg-gray-200 rounded mb-4"></div>
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
  
  if (error) return <div className="col-span-3 w-full text-red-500">Error: {error.message}</div>;
  if (!bus) return null;

  return (
    <div className="col-span-3 w-full">
      <div className="w-full space-y-4">
        <h1 className="text-lg text-neutral-600 font-medium text-start">
          Bus Information & Amenities
        </h1>

        {/* Bus Type and Ownership Info */}
        <div className="w-full rounded-lg border border-gray-200 p-4 mb-4">
          <div className="flex flex-col gap-3">
            {/* Bus Type */}
            <div className="flex items-start gap-x-2">
              <FaBus className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(bus.busType)}`}>
                  {bus.busType}
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {busTypeInfo[bus.busType] || 'Standard bus service'}
                </p>
              </div>
            </div>
            
            {/* Bus Ownership */}
            <div className="flex items-start gap-x-2">
              <FaBuilding className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getOwnershipColor(bus.busOwnership)}`}>
                  {bus.busOwnership}
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {ownershipInfo[bus.busOwnership] || 'Standard bus operator'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities Header */}
        <h2 className="text-base text-neutral-600 font-medium text-start border-b pb-2">
          Available Amenities
        </h2>

        {/* Amenities Grid */}
        <div className="w-full grid grid-cols-2 gap-x-8 gap-y-3">
          {/* Column 1: First two amenities */}
          <div className="space-y-2">
            {allAmenities.slice(0, 2).map((amenity) => (
              <div key={amenity.key} className="flex items-center gap-x-2 w-full">
                {bus.busAmenities && bus.busAmenities.includes(amenity.key) ? (
                  <IoMdCheckboxOutline className="w-5 h-5 text-green-500" />
                ) : (
                  <AiOutlineCloseSquare className="w-5 h-5 text-red-500" />
                )}
                <p className="text-base text-neutral-700 font-normal">
                  {amenity.label}
                </p>
              </div>
            ))}
          </div>

          {/* Column 2: Last two amenities */}
          <div className="space-y-2">
            {allAmenities.slice(2, 4).map((amenity) => (
              <div key={amenity.key} className="flex items-center gap-x-2 w-full">
                {bus.busAmenities && bus.busAmenities.includes(amenity.key) ? (
                  <IoMdCheckboxOutline className="w-5 h-5 text-green-500" />
                ) : (
                  <AiOutlineCloseSquare className="w-5 h-5 text-red-500" />
                )}
                <p className="text-base text-neutral-700 font-normal">
                  {amenity.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amenities;