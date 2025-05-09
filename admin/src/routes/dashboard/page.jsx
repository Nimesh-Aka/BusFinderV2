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
import { overviewData, recentSalesData, topProducts } from "@/constants";
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
} from "lucide-react";

const DashboardPage = () => {
  const [buses, setBuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [todayBuses, setTodayBuses] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const [recentTransactions, setRecentTransactions] = useState([]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Fetch recent transactions
  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/buses/bookings/users");
        console.log("Transactions data:", response.data);
        setRecentTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchRecentTransactions();
  }, []);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/buses/totalcost");
        setTotalRevenue(response.data.totalRevenue);
      } catch (error) {
        console.error("Error fetching total revenue:", error);
      }
    };
    fetchTotalRevenue();
  }, []);

  useEffect(() => {
    const fetchBuses = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/buses/all");
        const allBuses = response.data;
        setBuses(allBuses);

        const todayDate = new Date().toISOString().split("T")[0];
        const filteredToday = allBuses.filter((bus) => {
          const departureDate = new Date(bus.busDepartureDate)
            .toISOString()
            .split("T")[0];
          return departureDate === todayDate;
        });

        setTodayBuses(filteredToday.length);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch buses");
      } finally {
        setLoading(false);
      }
    };
    fetchBuses();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/users");
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Total Buses Card */}
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

        {/* Total Revenue Card */}
        <div className="card">
          <div className="card-header">
            <div className="p-2 text-red-500 transition-colors rounded-lg bg-red-500/20 dark:bg-red-600/20 dark:text-red-600">
              <DollarSign size={26} />
            </div>
            <p className="card-title">Total Paid Sheets</p>
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

        {/* Total Users Card */}
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

        {/* Today's Buses Card */}
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
                data={overviewData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EB2528" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#EB2528" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip cursor={false} formatter={(value) => formatCurrency(value)} />
                <XAxis
                  dataKey="name"
                  strokeWidth={0}
                  stroke={theme === "light" ? "#694748" : "#B89495"}
                  tickMargin={6}
                />
                <YAxis
                  dataKey="total"
                  strokeWidth={0}
                  stroke={theme === "light" ? "#694748" : "#B89495"}
                  tickFormatter={(value) => formatCurrency(value)}
                  tickMargin={6}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#2563eb"
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="col-span-1 card md:col-span-2 lg:col-span-3">
          <div className="card-header">
            <p className="card-title">Recent Transactions</p>
          </div>
          <div className="card-body h-[300px] overflow-auto p-0">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction, index) => (
                <div key={transaction._id || index} className="flex items-center justify-between py-2 pr-2 gap-x-4">
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 size-10">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {(transaction.name?.charAt(0) || 'U').toUpperCase()}
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

      {/* Top Buses Table */}
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
                  <th className="table-head">Buses</th>
                  <th className="table-head">Price</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">Rating</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {topProducts.map((product) => (
                  <tr key={product.number} className="table-row">
                    <td className="table-cell">{product.number}</td>
                    <td className="table-cell">
                      <div className="flex w-max gap-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover rounded-lg size-14"
                        />
                        <div className="flex flex-col">
                          <p>{product.name}</p>
                          <p className="font-normal text-slate-600 dark:text-slate-400">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">${product.price}</td>
                    <td className="table-cell">{product.status}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-x-2">
                        <Star size={18} className="fill-yellow-600 stroke-yellow-600" />
                        {product.rating}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-x-4">
                        <button className="text-red-500 dark:text-red-600">
                          <PencilLine size={20} />
                        </button>
                        <button className="text-red-500">
                          <Trash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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