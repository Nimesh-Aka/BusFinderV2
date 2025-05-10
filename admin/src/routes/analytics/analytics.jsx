import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { Footer } from "@/layouts/footer";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Analytics = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/buses/analytics');
        setBookingsData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch analytics data");
        setLoading(false);
        console.error("Error fetching analytics data:", err);
      }
    };

    fetchData();
  }, []);

  // Filter data based on time range
  const getFilteredData = () => {
    if (!bookingsData?.length) return [];
    
    const now = new Date();
    let filteredData = [...bookingsData];
    
    switch(timeFilter) {
      case 'today':
        filteredData = bookingsData.filter(item => 
          format(parseISO(item.createdAt), 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')
        );
        break;
      case '7days':
        filteredData = bookingsData.filter(item => 
          parseISO(item.createdAt) >= subDays(now, 7)
        );
        break;
      case '30days':
        filteredData = bookingsData.filter(item => 
          parseISO(item.createdAt) >= subDays(now, 30)
        );
        break;
      case 'month':
        filteredData = bookingsData.filter(item => {
          const date = parseISO(item.createdAt);
          return date >= startOfMonth(now) && date <= endOfMonth(now);
        });
        break;
      case 'custom':
        filteredData = bookingsData.filter(item => {
          const date = parseISO(item.createdAt);
          return date >= parseISO(dateRange.start) && date <= parseISO(dateRange.end);
        });
        break;
      default:
        break;
    }
    
    return filteredData;
  };

  const filteredData = getFilteredData();
  
  // Calculate key metrics
  const totalBookings = filteredData.length;
  const totalRevenue = filteredData.reduce((sum, item) => sum + item.totalCost, 0);
  const averageTicketPrice = totalBookings > 0 ? totalRevenue / totalBookings : 0;
  const confirmedBookings = filteredData.filter(item => item.paymentStatus === 'confirmed').length;
  const pendingBookings = filteredData.filter(item => item.paymentStatus === 'pending').length;
  
  // Prepare chart data
  const prepareRouteData = () => {
    const routeCounts = {};
    filteredData.forEach(booking => {
      const route = booking.routeTo;
      routeCounts[route] = (routeCounts[route] || 0) + 1;
    });
    
    return Object.keys(routeCounts).map(route => ({
      name: route,
      value: routeCounts[route]
    }));
  };
  
  const prepareDailyRevenueData = () => {
    const dailyRevenue = {};
    filteredData.forEach(booking => {
      const date = format(parseISO(booking.createdAt), 'MMM dd');
      dailyRevenue[date] = (dailyRevenue[date] || 0) + booking.totalCost;
    });
    
    return Object.keys(dailyRevenue).map(date => ({
      date,
      revenue: dailyRevenue[date]
    }));
  };

  const prepareBusTypeData = () => {
    const busTypes = {};
    filteredData.forEach(booking => {
      if (booking.busId) {
        const busType = booking.busId.busType;
        busTypes[busType] = (busTypes[busType] || 0) + 1;
      }
    });
    
    return Object.keys(busTypes).map(type => ({
      name: type,
      count: busTypes[type]
    }));
  };
  
  const routeData = prepareRouteData();
  const dailyRevenueData = prepareDailyRevenueData();
  const busTypeData = prepareBusTypeData();

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-lg bg-red-50 p-4 text-red-800">
        <h3 className="text-lg font-medium">Error loading analytics</h3>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Analytics Dashboard</h1>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => setTimeFilter('all')}
              className={`rounded-full px-4 py-1 text-sm font-medium ${timeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
            >
              All Time
            </button>
            <button 
              onClick={() => setTimeFilter('today')}
              className={`rounded-full px-4 py-1 text-sm font-medium ${timeFilter === 'today' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
            >
              Today
            </button>
            <button 
              onClick={() => setTimeFilter('7days')}
              className={`rounded-full px-4 py-1 text-sm font-medium ${timeFilter === '7days' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
            >
              Last 7 Days
            </button>
            <button 
              onClick={() => setTimeFilter('30days')}
              className={`rounded-full px-4 py-1 text-sm font-medium ${timeFilter === '30days' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
            >
              Last 30 Days
            </button>
            <button 
              onClick={() => setTimeFilter('month')}
              className={`rounded-full px-4 py-1 text-sm font-medium ${timeFilter === 'month' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
            >
              This Month
            </button>
            <button 
              onClick={() => setTimeFilter('custom')}
              className={`rounded-full px-4 py-1 text-sm font-medium ${timeFilter === 'custom' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
            >
              Custom
            </button>
          </div>
        </div>

        {timeFilter === 'custom' && (
          <div className="mb-6 flex flex-wrap gap-4 rounded-lg bg-white p-4 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={e => setDateRange({...dateRange, start: e.target.value})}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={e => setDateRange({...dateRange, end: e.target.value})}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-blue-100 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                <h3 className="text-2xl font-bold text-gray-900">{totalBookings.toLocaleString()}</h3>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Confirmed</p>
                <p className="text-xs font-medium text-gray-900">{confirmedBookings.toLocaleString()}</p>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                <div 
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${totalBookings ? (confirmedBookings / totalBookings) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-green-100 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900">LKR {totalRevenue.toLocaleString()}</h3>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <span className="font-medium text-green-600">
                {timeFilter !== 'all' ? `+${totalRevenue.toLocaleString()} LKR` : ''}
              </span>
              <span> {timeFilter === 'today' ? 'today' : timeFilter === '7days' ? 'this week' : timeFilter === '30days' ? 'this month' : ''}</span>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-purple-100 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Ticket Price</p>
                <h3 className="text-2xl font-bold text-gray-900">LKR {averageTicketPrice.toFixed(2)}</h3>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Based on {totalBookings} bookings
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-yellow-100 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Bookings</p>
                <h3 className="text-2xl font-bold text-gray-900">{pendingBookings}</h3>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <span className={pendingBookings > 0 ? "text-yellow-600" : "text-green-600"}>
                {pendingBookings > 0 ? "Action required" : "All bookings confirmed"}
              </span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Revenue Trend */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-800">Revenue Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`LKR ${value}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#93c5fd" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Popular Routes */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-800">Popular Destinations</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={routeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {routeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bus Types */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-800">Bookings by Bus Type</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={busTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Bookings" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-medium text-gray-800">Recent Bookings</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Bus</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Destination</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredData.slice(0, 5).map((booking) => (
                    <tr key={booking._id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{booking.busId?.busName || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{booking.busId?.busPlateNo || 'N/A'}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{booking.routeTo}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">LKR {booking.totalCost}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          booking.paymentStatus === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Analytics;