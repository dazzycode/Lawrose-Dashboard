import React, { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Generate months dynamically
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const monthlyData = months.map((month) => ({
  date: month,
  customers: Math.floor(Math.random() * 1500) + 500,
}));

// Generate years dynamically
const currentYear = new Date().getFullYear();
const yearlyData = Array.from({ length: 5 }, (_, i) => ({
  date: `${currentYear - (4 - i)}`,
  customers: Math.floor(Math.random() * 12000) + 5000,
}));

// Chart datasets
const chartDataSets = {
  days: [
    { date: "1 Apr", customers: 25 },
    { date: "2 Apr", customers: 30 },
    { date: "3 Apr", customers: 28 },
    { date: "4 Apr", customers: 39 },
    { date: "5 Apr", customers: 20 },
    { date: "6 Apr", customers: 15 },
    { date: "7 Apr", customers: 25 },
    { date: "8 Apr", customers: 39 },
  ],
  week: [
    { date: "Week 1", customers: 180 },
    { date: "Week 2", customers: 220 },
    { date: "Week 3", customers: 200 },
    { date: "Week 4", customers: 250 },
  ],
  monthly: monthlyData,
  year: yearlyData,
};

// Dummy customers list
const initialCustomers = [
  { name: "Jane Kansa", email: "jane.kansa@gmail.com", location: "Abuja", orders: 39, spent: "₦1,198,450" },
  { name: "John Doe", email: "john.doe@gmail.com", location: "Lagos", orders: 25, spent: "₦980,000" },
  { name: "Mary Smith", email: "mary.smith@gmail.com", location: "Port Harcourt", orders: 12, spent: "₦450,500" },
  { name: "Aliyu Bello", email: "aliyu.bello@gmail.com", location: "Kano", orders: 33, spent: "₦1,250,300" },
  { name: "Fatima Yusuf", email: "fatima.yusuf@gmail.com", location: "Kaduna", orders: 20, spent: "₦720,000" },
  { name: "Chinedu Okeke", email: "chinedu.okeke@gmail.com", location: "Enugu", orders: 15, spent: "₦500,200" },
  { name: "Ngozi Eze", email: "ngozi.eze@gmail.com", location: "Abuja", orders: 28, spent: "₦950,000" },
  { name: "Ahmed Musa", email: "ahmed.musa@gmail.com", location: "Lagos", orders: 18, spent: "₦650,000" },
  { name: "Grace Johnson", email: "grace.johnson@gmail.com", location: "Port Harcourt", orders: 22, spent: "₦780,000" },
  { name: "Samuel Ade", email: "samuel.ade@gmail.com", location: "Kano", orders: 35, spent: "₦1,400,000" },
  { name: "Aisha Bello", email: "aisha.bello@gmail.com", location: "Kaduna", orders: 17, spent: "₦600,000" },
  { name: "Emeka Obi", email: "emeka.obi@gmail.com", location: "Enugu", orders: 30, spent: "₦1,050,000" },
];


export default function Customer() {
  const [activeTab, setActiveTab] = useState("days");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newCustRange, setNewCustRange] = useState("days");
  const [customers, setCustomers] = useState(initialCustomers);
  const [filterLocation, setFilterLocation] = useState("");

  // Chart data for top cards
  const newCustomers = useMemo(() => chartDataSets[newCustRange], [newCustRange]);

  // Filtered customers for the table
  const filteredCustomers = customers.filter(c =>
    c.location.toLowerCase().includes(filterLocation.toLowerCase())
  );

  // Export table to CSV
  const handleExport = () => {
    const headers = ["Name", "Email", "Location", "Orders", "Total spent"];
    const rows = filteredCustomers.map(c => [c.name, c.email, c.location, c.orders, c.spent]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter table by location
  const handleFilter = () => {
    const location = prompt("Enter location to filter by:");
    if (location !== null) setFilterLocation(location);
  };

  // Small helpers
  const newCustomersToday = 39;
  const newCustChange = "+20.3%";

  return (
    <div className="flex min-h-screen bg-white flex-col md:flex-row">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white border-r transform transition-transform duration-300 md:translate-x-0 md:static md:block ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      <div className="flex-1">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6 bg-white min-h-screen">
          {/* Top Section: Cards + Chart */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Cards */}
            <div className="flex flex-col gap-6 w-full lg:w-1/3">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <p className="text-4xl font-bold">20,111</p>
                <p className="text-gray-500 text-sm">Total Customers</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <p className="text-4xl font-bold">18,111</p>
                <p className="text-gray-500 text-sm">Active Customers</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex-1">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-xl md:text-3xl font-bold">{newCustomersToday}</div>
                  <div className="text-gray-500 text-sm">
                    New <br /> customers
                  </div>
                  <div className="text-emerald-600 ml-8 text-xs font-semibold">{newCustChange}</div>
                </div>
              </div>

              {/* Tabs + Buttons */}
              <div className="flex items-center justify-between mb-4">
                {/* Tabs */}
                <div className="flex gap-4">
                  {["days", "week", "monthly", "year"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => { setActiveTab(tab); setNewCustRange(tab); }}
                      className={`capitalize px-3 py-1 rounded-md text-sm ${
                        activeTab === tab
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleExport}
                    className="bg-black text-white px-3 py-1 rounded-md text-sm"
                  >
                    Export list
                  </button>
                  <button
                    onClick={handleFilter}
                    className="border px-3 py-1 rounded-md text-sm"
                  >
                    Filter
                  </button>
                </div>
              </div>

              {/* Chart */}
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartDataSets[activeTab]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="customers"
                    stroke="#000"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="text-left p-3 text-sm font-semibold">Name</th>
                  <th className="text-left p-3 text-sm font-semibold">Email</th>
                  <th className="text-left p-3 text-sm font-semibold">Location</th>
                  <th className="text-left p-3 text-sm font-semibold">Orders</th>
                  <th className="text-left p-3 text-sm font-semibold">Total spent</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm">{customer.name}</td>
                    <td className="p-3 text-sm">{customer.email}</td>
                    <td className="p-3 text-sm">{customer.location}</td>
                    <td className="p-3 text-sm">{customer.orders}</td>
                    <td className="p-3 text-sm">{customer.spent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
