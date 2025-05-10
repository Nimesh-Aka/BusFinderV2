import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { format, parseISO, subDays } from 'date-fns';
import { Footer } from "@/layouts/footer";
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reports = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd')
  });
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const reportRef = useRef();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/buses/analytics');
        setBookingsData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch report data");
        setLoading(false);
        console.error("Error fetching report data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [selectedReport, selectedStatus, dateRange, searchQuery, bookingsData]);

  const filterData = () => {
    if (!bookingsData.length) return;
    
    let result = [...bookingsData];
    
    // Filter by date range
    result = result.filter(booking => {
      const bookingDate = parseISO(booking.createdAt);
      return bookingDate >= parseISO(dateRange.start) && 
             bookingDate <= parseISO(dateRange.end + 'T23:59:59');
    });
    
    // Filter by status
    if (selectedStatus !== 'all') {
      result = result.filter(booking => booking.paymentStatus === selectedStatus);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(booking => 
        (booking.busId?.busName?.toLowerCase().includes(query)) ||
        (booking.routeTo?.toLowerCase().includes(query)) ||
        (booking.busId?.busPlateNo?.toLowerCase().includes(query)) ||
        (booking.userId?.userName?.toLowerCase().includes(query)) ||
        (booking.userId?.email?.toLowerCase().includes(query))
      );
    }
    
    // Filter by report type
    switch(selectedReport) {
      case 'today':
        result = result.filter(booking => 
          format(parseISO(booking.createdAt), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
        );
        break;
      case 'week':
        result = result.filter(booking => 
          parseISO(booking.createdAt) >= subDays(new Date(), 7)
        );
        break;
      case 'month':
        result = result.filter(booking => 
          parseISO(booking.createdAt) >= subDays(new Date(), 30)
        );
        break;
      default:
        break;
    }
    
    setFilteredData(result);
  };

  // Format data for CSV export
  const csvData = filteredData.map(booking => ({
    'Customer Name': booking.userId?.userName || 'Guest',
    'Email': booking.userId?.email || 'N/A',
    'Mobile': booking.userId?.mobile || 'N/A',
    'Bus Name': booking.busId?.busName || 'N/A',
    'Bus Plate No': booking.busId?.busPlateNo || 'N/A',
    'Bus Type': booking.busId?.busType || 'N/A',
    'Departure Date': booking.busId?.busDepartureDate ? format(parseISO(booking.busId.busDepartureDate), 'dd MMM yyyy') : 'N/A',
    'Route To': booking.routeTo,
    'Seats Booked': booking.selectedSeats.length,
    'Total Cost': `LKR ${booking.totalCost}`,
    'Payment Status': booking.paymentStatus,
    'Payment ID': booking.stripeSessionId,
    'Booking Date': format(parseISO(booking.createdAt), 'dd MMM yyyy HH:mm')
  }));

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    documentTitle: `BusFinder_Report_${format(new Date(), 'yyyy-MM-dd')}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm 15mm;
      }
    `
  });

  // PDF export
  const exportPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('BusFinder Booking Report', 14, 20);
    
    // Add report info
    doc.setFontSize(10);
    doc.text(`Generated: ${format(new Date(), 'dd MMM yyyy HH:mm')}`, 14, 30);
    doc.text(`Date Range: ${format(parseISO(dateRange.start), 'dd MMM yyyy')} - ${format(parseISO(dateRange.end), 'dd MMM yyyy')}`, 14, 35);
    doc.text(`Status Filter: ${selectedStatus === 'all' ? 'All Statuses' : selectedStatus}`, 14, 40);
    doc.text(`Total Bookings: ${filteredData.length}`, 14, 45);
    doc.text(`Total Revenue: LKR ${filteredData.reduce((sum, item) => sum + item.totalCost, 0).toLocaleString()}`, 14, 50);
    
    // Add table
    const tableColumn = ['Customer', 'Bus', 'Route', 'Date', 'Status', 'Cost'];
    const tableRows = filteredData.map(booking => [
      booking.userId?.userName || 'Guest',
      booking.busId?.busName || 'N/A',
      booking.routeTo,
      format(parseISO(booking.createdAt), 'dd MMM yyyy'),
      booking.paymentStatus,
      `LKR ${booking.totalCost}`
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 60,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [42, 78, 120] }
    });
    
    doc.save(`BusFinder_Report_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
  };

  // Get total metrics
  const totalRevenue = filteredData.reduce((sum, item) => sum + item.totalCost, 0);
  const confirmedBookings = filteredData.filter(item => item.paymentStatus === 'confirmed').length;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Transaction Reports</h1>
          <p className="mt-2 text-gray-600">Generate and download detailed booking reports</p>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Report Type</label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              >
                <option value="all">All Transactions</option>
                <option value="today">Today's Transactions</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            {/* Date Range Start */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              />
            </div>

            {/* Date Range End */}
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              />
            </div>
          </div>
          
          {/* Search */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Search</label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by customer name, bus, destination, or email..."
                className="block w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-green-500 focus:outline-none focus:ring-green-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{filteredData.length}</p>
              </div>
              <div className="rounded-md bg-blue-50 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">LKR {totalRevenue.toLocaleString()}</p>
              </div>
              <div className="rounded-md bg-green-50 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Confirmed Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{confirmedBookings}</p>
              </div>
              <div className="rounded-md bg-green-50 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{filteredData.filter(item => item.paymentStatus === 'pending').length}</p>
              </div>
              <div className="rounded-md bg-yellow-50 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Download Options */}
        <div className="mb-6 flex flex-wrap gap-3">
          <CSVLink 
            data={csvData} 
            filename={`BusFinder_Report_${format(new Date(), 'yyyy-MM-dd')}.csv`}
            className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </CSVLink>

          <button
            onClick={exportPDF}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Report
          </button>
        </div>

        {/* Printable Report Area */}
        <div ref={reportRef}>
          <div className="print:block print:p-6 hidden">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold">BusFinder Booking Report</h1>
              <p className="text-gray-600">
                {format(parseISO(dateRange.start), 'dd MMM yyyy')} - {format(parseISO(dateRange.end), 'dd MMM yyyy')}
              </p>
              <p className="text-sm text-gray-500">
                Generated on {format(new Date(), 'dd MMM yyyy HH:mm')}
              </p>
            </div>
            
            <div className="mb-4 grid grid-cols-3 gap-4">
              <div className="border p-3 text-center">
                <p className="text-sm text-gray-500">Total Transactions</p>
                <p className="text-xl font-bold">{filteredData.length}</p>
              </div>
              <div className="border p-3 text-center">
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-xl font-bold">LKR {totalRevenue.toLocaleString()}</p>
              </div>
              <div className="border p-3 text-center">
                <p className="text-sm text-gray-500">Confirmed Bookings</p>
                <p className="text-xl font-bold">{confirmedBookings}</p>
              </div>
            </div>
          </div>

          {/* Report Table */}
          <div className="mb-8 overflow-hidden rounded-lg bg-white shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Bus Info
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Route
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Seats
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-4 text-center text-gray-500">
                        No transactions found matching the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{booking.userId?.userName || 'Guest User'}</div>
                          <div className="text-xs text-gray-500">{booking.userId?.email || 'No email available'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{booking.busId?.busName || 'N/A'}</div>
                          <div className="text-xs text-gray-500">{booking.busId?.busPlateNo} • {booking.busId?.busType}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {booking.routeTo}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {booking.selectedSeats.length}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          LKR {booking.totalCost}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 
                            ${booking.paymentStatus === 'confirmed' ? 'bg-green-100 text-green-800' : 
                              booking.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              booking.paymentStatus === 'cancelled' ? 'bg-red-100 text-red-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {booking.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {format(parseISO(booking.createdAt), 'dd MMM yyyy')}
                          <div className="text-xs text-gray-400">
                            {format(parseISO(booking.createdAt), 'HH:mm')}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="border-t bg-gray-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium">{filteredData.length}</span> transactions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reports;