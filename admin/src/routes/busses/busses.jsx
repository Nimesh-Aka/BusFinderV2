import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Columns, PencilLine, Trash } from "lucide-react";
import { Footer } from "@/layouts/footer";

const Busses = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState({
    name: '',
    date: '',
    from: '',
    to: ''
  });

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/buses/all');
        setBuses(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch buses');
      } finally {
        setLoading(false);
      }
    };
    fetchBuses();
  }, []);

  const filteredBuses = buses.filter(bus => {
    if (!bus.busCitiesAndTimes || bus.busCitiesAndTimes.length === 0) return false;

    const departureDate = new Date(bus.busDepartureDate).toISOString().split('T')[0];

    return (
      bus.busName.toLowerCase().includes(searchTerm.name.toLowerCase()) &&
      departureDate.includes(searchTerm.date) &&
      (bus.busCitiesAndTimes[0]?.city?.toLowerCase().includes(searchTerm.from.toLowerCase())) &&
      (bus.busCitiesAndTimes[bus.busCitiesAndTimes.length - 1]?.city?.toLowerCase().includes(searchTerm.to.toLowerCase()))
    );
  });

  const handleSearchChange = (e) => {
    setSearchTerm({
      ...searchTerm,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <div>Loading buses...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  {/*
  console.log("Buses",buses)
  console.log("seats", buses[54])
  const availableSeatCount = buses[54].seats.filter(seat => seat.availability === 'available').length;
  console.log(availableSeatCount);
*/}

//console.log(buses[54].busCitiesAndTimes[0]?.arrivalTime)

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="title">Buses Management</h1>

      {/* Search Filters */}
      {/*<div className="card">
        <div className="card-header">
          <p className="card-title">Search Buses</p>
        </div>
        <div className="p-4 card-body">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <input
              type="text"
              placeholder="Search by bus name"
              className="input"
              name="name"
              value={searchTerm.name}
              onChange={handleSearchChange}
            />
            <input
              type="date"
              placeholder="Search by date"
              className="input"
              name="date"
              value={searchTerm.date}
              onChange={handleSearchChange}
            />
            <input
              type="text"
              placeholder="From (First city)"
              className="input"
              name="from"
              value={searchTerm.from}
              onChange={handleSearchChange}
            />
            <input
              type="text"
              placeholder="To (Last city)"
              className="input"
              name="to"
              value={searchTerm.to}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>*/}

      {/* Buses Table */}
      <div className="card">
        <div className="card-header">
          <p className="card-title">Buses List</p>
        </div>
        <div className="p-0 card-body">
          <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">Bus Name</th>
                  <th className="table-head">Departure Date & Time</th>
                  <th className="table-head">From</th>
                  <th className="table-head">To</th>
                  {/*<th className="table-head">Route</th>*/}
                  <th className="table-head">Plate No</th>
                  <th className="table-head">Price</th>
                  <th className="table-head">Available Seats</th>
                  <th className="table-head">Total Seats</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {buses.map((bus) => {
                  const departureDate = new Date(bus.busDepartureDate);
                  const routeCities = bus.busCitiesAndTimes.map(stop => stop.city).join(' → ');

                  return (
                    <tr key={bus._id} className="table-row">
                      <td className="table-cell">{bus.busName}</td>
                      <td className="table-cell">
                        <div className="date-style">
                          {departureDate.toLocaleDateString()}
                        </div>
                        <div className="time-style">
                          {departureDate.toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="table-cell">{bus.busCitiesAndTimes[0]?.cityName || 'N/A'}</td>
                      <td className="table-cell">{bus.busCitiesAndTimes[bus.busCitiesAndTimes.length - 1]?.cityName || 'N/A'}</td>
                      {/*<td className="table-cell">{routeCities || 'N/A'}</td>*/}
                      <td className="table-cell">{bus.busPlateNo || 'N/A'}</td>
                      <td className="table-cell">Rs.{bus.busTicketPrice || '0'}</td>
                      <td className="table-cell">{bus.seats ? bus.seats.filter(seat => seat.availability === 'available').length : 0}</td>
                      <td className="table-cell">{bus.seats ? bus.seats.length : 0}</td>
                      <td className="table-cell">
                        <div className="flex items-center gap-x-4">
                          <button className="text-blue-500 hover:text-blue-700">
                            <PencilLine size={20} />
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <Trash size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Busses;