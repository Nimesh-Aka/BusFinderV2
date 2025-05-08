import React, { useState, useEffect } from "react";
import TopLayout from "../../layout/toppage/TopLayout";
import { motion } from "framer-motion";
import RootLayout from "../../layout/RootLayout";
import Search from "../Home/hero/search/Search";
import Filter from "./filter/Filter";
import SearchResult from "./searchresult/SearchResult";
import { useLocation } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { GrRefresh } from "react-icons/gr";

const Ticket = () => {
  const location = useLocation();
  const { from, to, date } = location.state || { from: "", to: "", date: "" };

  // Construct API query with route parameters
  let queryString = "/buses?";
  const params = [];
  if (from) params.push(`fromCity=${from}`);
  if (to) params.push(`toCity=${to}`);
  if (date) params.push(`busDepartureDate=${date}`);
  queryString += params.join("&");


  const { data, loading, error } = useFetch(queryString);

  console.log("Clicking search button in under want to chnage route: ",data)

  const [filteredBuses, setFilteredBuses] = useState(null);

  // Handle data updates and filter reset
  useEffect(() => {
    if (data !== null && data !== -1) {
      setFilteredBuses(data); // Initialize with full data when fetched
    } else if (data === -1) {
      setFilteredBuses([]); // No buses found case
    }
  }, [data]);

  // Determine buses to display
  const busesToDisplay = filteredBuses !== null ? filteredBuses : [];


  return (
    <div className="w-full pb-16 space-y-12">
      <TopLayout
        bgImg="https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"
        title="Reserve Your Ticket"
      />

      <RootLayout className="relative space-y-12">
        <div className="sticky top-0 z-30 flex flex-col items-center justify-center w-full py-4 space-y-5 bg-neutral-50">
          <motion.h1
            initial={{ opacity: 0, y: -800 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-neutral-700"
          >
            Want to change the route?
          </motion.h1>
          <Search initialFrom={from} initialTo={to} initialDate={date} />
        </div>

        <div className="relative grid w-full h-auto grid-cols-4 gap-16">
          <div className="col-span-1">
            <Filter
              className="sticky z-20 space-y-4 top-52"
              setBuses={setFilteredBuses}
              from={from}
              to={to}
              date={date}
            />
          </div>

          <div className="col-span-3">
            {loading ? (
              <p className="text-center text-lg font-semibold text-gray-600">
                Loading...
              </p>
            ) : error ? (
              <p className="text-center text-lg font-semibold text-red-600">
                Error fetching buses: {error.message}
              </p>
            ) : busesToDisplay.length > 0 ? (
              busesToDisplay.map((item) => (
                <SearchResult item={item} key={item._id} from={from} to={to} />
              ))
            ) : (
              <div className="p-8 text-center bg-gray-100 rounded-lg">
                <p className="text-xl font-semibold text-gray-600">
                  No buses found for the selected route.
                </p>
              </div>
            )}

          </div>

        </div>
      </RootLayout>
    </div>
  );
};

export default Ticket;
