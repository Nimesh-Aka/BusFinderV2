import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@/hooks/use-theme";
import { Footer } from "@/layouts/footer";
import {
  CreditCard,
  DollarSign,
  Package,
  PencilLine,
  Star,
  Trash,
  TrendingUp,
  Users,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const DAILY_REVENUE_URL = "http://localhost:8000/api/buses/reports/daily";
const TRANSACTIONS_URL = "http://localhost:8000/api/buses/bookings/users";
const TOTAL_REVENUE_URL = "http://localhost:8000/api/buses/totalcost";
const ALL_BUSES_URL = "http://localhost:8000/api/buses/all";
const USERS_URL = "http://localhost:8000/api/users";

const DashboardPage = () => {
  const [buses, setBuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [todayBuses, setTodayBuses] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [topBuses, setTopBuses] = useState([]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Fetch daily revenue data
  useEffect(() => {
    const fetchDailyRevenue = async () => {
      try {
        const response = await axios.get(DAILY_REVENUE_URL);
        const sortedData = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setDailyRevenue(sortedData);
      } catch (error) {
        console.error("Error fetching daily revenue:", error);
      }
    };
    fetchDailyRevenue();
  }, []);

  // Fetch recent transactions
  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const response = await axios.get(TRANSACTIONS_URL);
        setRecentTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchRecentTransactions();
  }, []);

  // Fetch total revenue
  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get(TOTAL_REVENUE_URL);
        setTotalRevenue(response.data.totalRevenue);
      } catch (error) {
        console.error("Error fetching total revenue:", error);
      }
    };
    fetchTotalRevenue();
  }, []);

  // Fetch buses data and prepare top buses
  useEffect(() => {
    const fetchBuses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(ALL_BUSES_URL);
        const allBuses = response.data;
        setBuses(allBuses);

        // Set today's buses
        const todayDate = new Date().toISOString().split("T")[0];
        const filteredToday = allBuses.filter((bus) => {
          const departureDate = new Date(bus.busDepartureDate)
            .toISOString()
            .split("T")[0];
          return departureDate === todayDate;
        });
        setTodayBuses(filteredToday.length);

        // Prepare top buses based on ticket price (could be improved with booking data)
        const sortedBuses = [...allBuses].sort((a, b) => {
          // Sort by recommendations if available, otherwise by price
          if (a.recommends && b.recommends) {
            return b.recommends - a.recommends;
          }
          return b.busTicketPrice - a.busTicketPrice;
        }).slice(0, 5);
        
        setTopBuses(sortedBuses);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch buses");
      } finally {
        setLoading(false);
      }
    };
    fetchBuses();
  }, []);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(USERS_URL);
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="title">Dashboard</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="card">
          <div className="card-header">
            <div className="p-2 text-red-500 transition-colors rounded-lg w-fit bg-red-500/20 dark:bg-red-600/20 dark:text-red-600">
              <Package size={26} />
            </div>
            <p className="card-title">Total Buses</p>
          </div>
          <div className="transition-colors card-body bg-slate-100 dark:bg-slate-950">
            <p className="text-3xl font-bold transition-colors text-slate-900 dark:text-slate-50">
              {buses.length}
            </p>
            <span className="flex items-center px-2 py-1 font-medium text-red-500 border border-red-500 rounded-full w-fit gap-x-2 dark:border-red-600 dark:text-red-600">
              <TrendingUp size={18} />
              25%
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="p-2 text-red-500 transition-colors rounded-lg bg-red-500/20 dark:bg-red-600/20 dark:text-red-600">
              <DollarSign size={26} />
            </div>
            <p className="card-title">Total Revenue</p>
          </div>
          <div className="transition-colors card-body bg-slate-100 dark:bg-slate-950">
            <p className="text-3xl font-bold transition-colors text-slate-900 dark:text-slate-50">
              {formatCurrency(totalRevenue)}
            </p>
            <span className="flex items-center px-2 py-1 font-medium text-red-500 border border-red-500 rounded-full w-fit gap-x-2 dark:border-red-600 dark:text-red-600">
              <TrendingUp size={18} />
              12%
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="p-2 text-red-500 transition-colors rounded-lg bg-red-500/20 dark:bg-red-600/20 dark:text-red-600">
              <Users size={26} />
            </div>
            <p className="card-title">Total Users</p>
          </div>
          <div className="transition-colors card-body bg-slate-100 dark:bg-slate-950">
            <p className="text-3xl font-bold transition-colors text-slate-900 dark:text-slate-50">
              {users.length}
            </p>
            <span className="flex items-center px-2 py-1 font-medium text-red-500 border border-red-500 rounded-full w-fit gap-x-2 dark:border-red-600 dark:text-red-600">
              <TrendingUp size={18} />
              15%
            </span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="p-2 text-red-500 transition-colors rounded-lg bg-red-500/20 dark:bg-red-600/20 dark:text-red-600">
              <CreditCard size={26} />
            </div>
            <p className="card-title">On the Road Today</p>
          </div>
          <div className="transition-colors card-body bg-slate-100 dark:bg-slate-950">
            <p className="text-3xl font-bold transition-colors text-slate-900 dark:text-slate-50">
              {todayBuses}
            </p>
            <span className="flex items-center px-2 py-1 font-medium text-red-500 border border-red-500 rounded-full w-fit gap-x-2 dark:border-red-600 dark:text-red-600">
              <TrendingUp size={18} />
              19%
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-1 card md:col-span-2 lg:col-span-4">
          <div className="card-header">
            <p className="card-title">Revenue Overview</p>
          </div>
          <div className="p-0 card-body">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={dailyRevenue}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EB2528" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#EB2528" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  cursor={false}
                  formatter={(value) => formatCurrency(value)}
                  labelFormatter={(label) => formatDate(label)}
                />
                <XAxis
                  dataKey="date"
                  strokeWidth={0}
                  stroke={theme === "light" ? "#694748" : "#B89495"}
                  tickMargin={6}
                  tickFormatter={formatDate}
                />
                <YAxis
                  dataKey="totalRevenue"
                  strokeWidth={0}
                  stroke={theme === "light" ? "#694748" : "#B89495"}
                  tickFormatter={(value) => formatCurrency(value)}
                  tickMargin={6}
                />
                <Area
                  type="monotone"
                  dataKey="totalRevenue"
                  stroke="#2563eb"
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-1 card md:col-span-2 lg:col-span-3">
          <div className="card-header">
            <p className="card-title">Recent Transactions</p>
          </div>
          <div className="card-body h-[300px] overflow-auto p-0">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between py-2 pr-2 gap-x-4"
                >
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 size-10">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {(transaction.name?.charAt(0) || "U").toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <p className="font-medium text-slate-900 dark:text-slate-50">
                        {transaction.name || "Unknown User"}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {transaction.email || "No email provided"}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-slate-900 dark:text-slate-50">
                    {formatCurrency(transaction.totalCost)}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-slate-500">No recent transactions</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Buses Table - Improved version */}
      <div className="card">
        <div className="card-header">
          <p className="card-title">Top Buses</p>
        </div>
        <div className="p-0 card-body">
          <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">#</th>
                  <th className="table-head">Bus Information</th>
                  <th className="table-head">Route</th>
                  <th className="table-head">Departure Date</th>
                  <th className="table-head">Ticket Price</th>
                  <th className="table-head">Popularity</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {topBuses.length > 0 ? (
                  topBuses.map((bus, index) => (
                    <tr key={bus._id} className="table-row">
                      <td className="table-cell">{index + 1}</td>
                      <td className="table-cell">
                        <div className="flex flex-col">
                          <p className="font-medium">{bus.busName}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {bus.busPlateNo} • {bus.busType}
                          </p>
                          <p className="text-xs text-slate-500">
                            {bus.busOwnership === 'CTB' ? 'Government' : 'Private'}
                          </p>
                        </div>
                      </td>
                      <td className="table-cell">
                        {bus.busCitiesAndTimes && bus.busCitiesAndTimes.length > 0 ? (
                          <span>
                            {bus.busCitiesAndTimes[0].cityName} → {' '}
                            {bus.busCitiesAndTimes[bus.busCitiesAndTimes.length - 1].cityName}
                          </span>
                        ) : 'No route information'}
                      </td>
                      <td className="table-cell">
                        {bus.busDepartureDate ? format(new Date(bus.busDepartureDate), 'dd MMM yyyy') : 'No date'}
                      </td>
                      <td className="table-cell font-medium">
                        {formatCurrency(bus.busTicketPrice)}
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-x-2">
                          <Star size={18} className={`${bus.recommends > 0 ? 'fill-yellow-600 stroke-yellow-600' : 'text-gray-400'}`} />
                          {bus.recommends || 0}
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-x-4">
                          <Link to={`/buses/edit/${bus._id}`} className="text-blue-500 hover:text-blue-700">
                            <PencilLine size={20} />
                          </Link>
                          <Link to={`/buses/view/${bus._id}`} className="text-green-500 hover:text-green-700">
                            <Eye size={20} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="table-cell text-center py-4 text-slate-500">
                      {loading ? "Loading buses..." : "No buses available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;