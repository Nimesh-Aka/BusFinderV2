import React from 'react';
import TopLayout from '../../layout/toppage/TopLayout';
import { motion } from 'framer-motion';
import RootLayout from '../../layout/RootLayout';
import Search from '../Home/hero/search/Search';
import Filter from './filter/Filter';
import SearchResult from './searchresult/SearchResult';
import { useLocation } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';

const Ticket = () => {
  const location = useLocation();
  const { from, to, date } = location.state || { from: '', to: '', date: '' }; // Extract the passed values

  const {data, loading, error} = useFetch(`/buses?busCitiesAndTimes.0.cityName=${from}`)

  console.log("Fetched data:", data);
  console.log("Loading:", loading);
  console.log("Error:", error);

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
          {loading ? "Loading" : <>
          {data.map(item=>(
            <SearchResult item={item} key={item.id}/>
          ))}
          </>}
          
        </div>
      </RootLayout>
    </div>
  );
};

export default Ticket;
