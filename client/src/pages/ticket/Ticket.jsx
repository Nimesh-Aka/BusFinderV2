import React from 'react';
import TopLayout from '../../layout/toppage/TopLayout';
import { motion } from 'framer-motion';
import RootLayout from '../../layout/RootLayout';
import Search from '../Home/hero/search/Search';
import Filter from './filter/Filter';
import SearchResult from './searchresult/SearchResult';
import { useLocation } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import {GrRefresh} from "react-icons/gr";

const Ticket = () => {
  const location = useLocation();
  const { from, to, date } = location.state || { from: "", to: "", date: "" }; // Extract the passed values

  // Construct the query string
  const queryString = `/buses?busCitiesAndTimes.0.cityName=${from}&busCitiesAndTimes[$elemMatch][cityName]=${to}&busDepartureDate=${date}`;

  // Use useFetch hook to fetch data
  const { data, loading, error } = useFetch(queryString);

  console.log("Fetched Data:", data);

  return (
    <div className="w-full pb-16 space-y-12">
      {/* Top Layout */}
      <TopLayout
        bgImg={
          "https://cdn.pixabay.com/photo/2020/09/21/11/41/bus-5589826_1280.jpg"
        }
        title={"reserve your ticket"}
      />

      <RootLayout className="relative space-y-12">
        {/* Search section */}
        <div className="sticky top-0 z-30 flex flex-col items-center justify-center w-full py-4 space-y-5 bg-neutral-50">
          <motion.h1
            initial={{ opacity: 0, y: -800 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -800 }}
            transition={{ duration: 1.35, ease: "easeOut" }}
            className="text-3xl font-semibold text-neutral-700"
          >
            Want to change the route?
          </motion.h1>
          {/* Pass values to Search */}
          <Search initialFrom={from} initialTo={to} initialDate={date} />
        </div>

        {/* Searched bus tickets */}
        <div className="relative grid w-full h-auto grid-cols-4 gap-16">
          {/* Filter section */}
          <div className="col-span-1">
            <Filter className="sticky z-20 space-y-4 top-52" />
          </div>

          {/* Search tickets */}
          <div className="col-span-3">
            {loading ? (
              "Loading..."
            ) : error ? (
              <p>Error fetching buses: {error.message}</p>
            ) : (
              <>
                {data.length > 0 ? (
                  data.map((item) => (
                    <SearchResult item={item} key={item._id} to={to} />
                  ))
                ) : (
                  <p>No buses found for the selected route.</p>
                )}
                <div className="flex items-center justify-center py-5 w-full">
                  <button className="flex items-center justify-center px-8 py-3 text-base font-normal duration-300 ease-in-out border-2 w-fit bg-primary hover:bg-transparent border-primary hover:border-primary rounded-xl text-neutral-50 gap-x-2 hover:text-primary ">
                    <GrRefresh />
                    Load More
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </RootLayout>
    </div>
  );
};

export default Ticket;
