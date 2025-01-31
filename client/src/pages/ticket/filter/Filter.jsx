import React from 'react'
import PriceRangeSlider from '../../../components/pricerange/PriceRangeSlider';

const Filter = ({ className }) => {

    const [rangeValues, setRangeValues] = React.useState({
        min: 0,
        max: 100
    });

  // Fetch all buses on component mount
  useEffect(() => {
    const fetchAllBuses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/buses");
        setAllBuses(response.data);
        setBuses(response.data); // Set initial buses

        console.log("All Buses:", response.data);
      } catch (error) {
        console.error("Error fetching all buses:", error);
      }

    return (
        <div className={`w-full ${className}`}>
            <h1 className="text-xl font-semibold text-neutral-700">
                Apply Filters
            </h1>

            {/* price filter 
            <div className="w-full p-4 space-y-1 border border-neutral-300 rounded-xl">
                <h1 className="text-lg font-medium text-neutral-600">
                    Apply Filters
                </h1>

                <PriceRangeSlider
                    min={1000}
                    max={3000}
                    onChange={handleRangeChange}
                />


            </div>*/}

            {/* Bus types filter */}
            <div className="w-full p-4 space-y-3 border border-neutral-300 rounded-xl">
                <h1 className="text-lg font-medium text-neutral-600">
                    Bus Types
                </h1>

                <div className="space-y-2.5">
                    <div className="flex items-center w-full gap-2">
                        <input type="checkbox" id='ac' className="w-3.5 h-3.5 border cursor-pointer border-neutral-300 text-neutral-300" />
                        <label htmlFor="ac" className="text-sm font-normal cursor-pointer text-neutral-600">
                            AC Deluxe <span className="text-xs text-neutral-600">
                                (10)
                            </span>
                        </label>
                    </div>
                    <div className="flex items-center w-full gap-2">
                        <input type="checkbox" id='tourist' className="w-3.5 h-3.5 border cursor-pointer border-neutral-300 text-neutral-300" />
                        <label htmlFor="tourist" className="text-sm font-normal cursor-pointer text-neutral-600">
                            Tourist AC Deluxe <span className="text-xs text-neutral-600">
                                (10)
                            </span>
                        </label>
                    </div>
                    <div className="flex items-center w-full gap-2">
                        <input type="checkbox" id='airsusp' className="w-3.5 h-3.5 border cursor-pointer border-neutral-300 text-neutral-300" />
                        <label htmlFor="airsusp" className="text-sm font-normal cursor-pointer text-neutral-600">
                            Air Suspension <span className="text-xs text-neutral-600">
                                (10)
                            </span>
                        </label>
                    </div>
                    <div className="flex items-center w-full gap-2">
                        <input type="checkbox" id='luxuryac' className="w-3.5 h-3.5 border cursor-pointer border-neutral-300 text-neutral-300" />
                        <label htmlFor="luxuryac" className="text-sm font-normal cursor-pointer text-neutral-600">
                            Luxury AC Deluxe <span className="text-xs text-neutral-600">
                                (10)
                            </span>
                        </label>
                    </div>
                </div>
            </div>
            
            {/* Bus Companies */}
            <div className="w-full p-4 space-y-3 border border-neutral-300 rounded-xl">
                <h1 className="text-lg font-medium text-neutral-600">
                    Bus Companies
                </h1>

                <div className="space-y-2.5">
                    <div className="flex items-center w-full gap-2">
                        <input type="checkbox" id='ctb' className="w-3.5 h-3.5 border cursor-pointer border-neutral-300 text-neutral-300" />
                        <label htmlFor="ctb" className="text-sm font-normal cursor-pointer text-neutral-600">
                            CTB Bus <span className="text-xs text-neutral-600">
                                (10)
                            </span>
                        </label>
                    </div>
                    <div className="flex items-center w-full gap-2">
                        <input type="checkbox" id='private' className="w-3.5 h-3.5 border cursor-pointer border-neutral-300 text-neutral-300" />
                        <label htmlFor="private" className="text-sm font-normal cursor-pointer text-neutral-600">
                            Private <span className="text-xs text-neutral-600">
                                (10)
                            </span>
                        </label>
                    </div>

                </div>
            </div>

            {/* Amenities filter */}
            <div className="w-full p-4 space-y-3 border border-neutral-300 rounded-xl">
                <h1 className="text-lg font-medium text-neutral-600">
                    Amenities
                </h1>

                <div className="space-y-2.5">
                    
                    <div className="flex items-center w-full gap-2">
                        <input type="checkbox" id='internet' className="w-3.5 h-3.5 border cursor-pointer border-neutral-300 text-neutral-300" />
                        <label htmlFor="internet" className="text-sm font-normal cursor-pointer text-neutral-600">
                            Internet/Wifi
                        </label>
                    </div>
                    <div className="flex items-center w-full gap-2">
                        <input type="checkbox" id='acairsusp' className="w-3.5 h-3.5 border cursor-pointer border-neutral-300 text-neutral-300" />
                        <label htmlFor="acairsusp" className="text-sm font-normal cursor-pointer text-neutral-600">
                            Ac & Air Suspension
                        </label>
                    </div>
                    <div className="flex items-center w-full gap-2">
                        <input type="checkbox" id='waterbottles' className="w-3.5 h-3.5 border cursor-pointer border-neutral-300 text-neutral-300" />
                        <label htmlFor="waterbottles" className="text-sm font-normal cursor-pointer text-neutral-600">
                            Water Bottles
                        </label>
                    </div>
                    <div className="flex items-center w-full gap-2">
                        <input type="checkbox" id='tvmusic' className="w-3.5 h-3.5 border cursor-pointer border-neutral-300 text-neutral-300" />
                        <label htmlFor="tvmusic" className="text-sm font-normal cursor-pointer text-neutral-600">
                            LED TV & Music
                        </label>
                    </div>
                    <div className="flex items-center w-full gap-2">
                        <input type="checkbox" id='chargingport' className="w-3.5 h-3.5 border cursor-pointer border-neutral-300 text-neutral-300" />
                        <label htmlFor="chargingport" className="text-sm font-normal cursor-pointer text-neutral-600">
                            Charging port
                        </label>
                    </div>
                    <div className="flex items-center w-full gap-2">
                        <input type="checkbox" id='fan' className="w-3.5 h-3.5 border cursor-pointer border-neutral-300 text-neutral-300" />
                        <label htmlFor="fan" className="text-sm font-normal cursor-pointer text-neutral-600">
                            Fan
                        </label>
                    </div>
                    <div className="flex items-center w-full gap-2">
                        <input type="checkbox" id='superac' className="w-3.5 h-3.5 border cursor-pointer border-neutral-300 text-neutral-300" />
                        <label htmlFor="superac" className="text-sm font-normal cursor-pointer text-neutral-600">
                            Super AC
                        </label>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default Filter