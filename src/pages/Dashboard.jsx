    import React, { useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ---- mock data (Day / Week / Month / Year) ----
const makeRange = (labels, min = 8, max = 60) =>
  labels.map((name, i) => ({
    name,
    value: Math.round(min + (Math.sin(i * 0.9) + 1) * ((max - min) / 2)),
  }));

const dayLabels = ["1 Apr", "2 Apr", "3 Apr", "4 Apr", "5 Apr", "6 Apr", "7 Apr", "8 Apr", "9 Apr"];
const weekLabels = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5"];
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const yearLabels = ["2021", "2022", "2023", "2024", "2025"];

const series = {
  day: makeRange(dayLabels, 5, 40),
  week: makeRange(weekLabels, 10, 50),
  month: makeRange(monthLabels, 8, 60),
  year: makeRange(yearLabels, 12, 45),
};

const salesSeries = {
  day: makeRange(["JAN","F","M","A","M","J","J","A","S","O","N","DEC"], 1200, 5200),
  week: makeRange(weekLabels, 1500, 5200),
  month: makeRange(monthLabels, 1200, 5200),
  year: makeRange(yearLabels, 1600, 5200),
};

const bestSellers = [
  {
    img: "/jacket.png",
    name: "Classic Edge Jean Jacket",
    revenue: "₦400,000",
    units: 24,
  },
  {
    img: "/jacket.png",
    name: "Luxe Leather Jacket",
    revenue: "₦382,000",
    units: 22,
  },
  {
    img: "/jacket.png",
    name: "Classic Edge Jean Jacket",
    revenue: "₦400,000",
    units: 24,
  },
];

const orders = [
  { id: "0001", date: "05-April-2025", customer: "Rose D.", total: "₦125,000", status: "Pending" },
  { id: "0001", date: "05-April-2025", customer: "Rose D.", total: "₦125,000", status: "Pending" },
  { id: "0001", date: "05-April-2025", customer: "Rose D.", total: "₦125,000", status: "Pending" },
  { id: "0001", date: "05-April-2025", customer: "Rose D.", total: "₦125,000", status: "Pending" },
];

const COLORS = ["#000000", "#E5E7EB"]; // black + light gray for pie

const Tabs = ({ value, onChange, options = ["day", "week", "month", "year"] }) => (
  <div className="flex items-center gap-2">
    {options.map((opt) => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        className={`text-xs px-2.5 py-1 rounded-md border ${
          value === opt ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-200"
        }`}
      >
        {opt[0].toUpperCase() + opt.slice(1)}
      </button>
    ))}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>{children}</div>
);

const Dashboard = () => {
  // tabs
  const [salesRange, setSalesRange] = useState("day");
  const [newCustRange, setNewCustRange] = useState("day");
  const [activityRange, setActivityRange] = useState("day");

  // pie view carousel index (for arrow left/right)
  const pieViews = [
    { labelLeft: "New", leftVal: 18, labelRight: "Returning", rightVal: 24 },
    { labelLeft: "New", leftVal: 22, labelRight: "Returning", rightVal: 19 },
    { labelLeft: "New", leftVal: 15, labelRight: "Returning", rightVal: 28 },
  ];
  const [pieIndex, setPieIndex] = useState(0);

  const newCustomers = useMemo(() => series[newCustRange], [newCustRange]);
  const sales = useMemo(() => salesSeries[salesRange], [salesRange]);

  const pieData = [
    { name: "New", value: pieViews[pieIndex].leftVal },
    { name: "Returning", value: pieViews[pieIndex].rightVal },
  ];

  // small helpers
  const totalSalesLabel = "$12.7k";
  const salesChangeLabel = "+1.35%";
  const newCustomersToday = 39;
  const newCustChange = "+20.3%";

  

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-white flex-col md:flex-row">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white border-r transform transition-transform duration-300 md:translate-x-0 md:static md:block ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />



    <div className="p-4 md:p-6 bg-[#f6f6f6] min-h-screen">
      {/* ===== top stats ===== */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6">
        <Card className="p-5 flex flex-col">
          <div className="text-4xl md:text-5xl font-bold">48</div>
          <div className="text-gray-500">Products sold</div>
        </Card>
        <Card className="p-5 flex flex-col">
          <div className="text-4xl md:text-5xl font-bold">16</div>
          <div className="text-gray-500">Total orders</div>
        </Card>
      </div>

      {/* ===== middle row: left (sales + best sellers) / right (new customers + activity pie) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* left column (lg: span 5) */}
        <div className="lg:col-span-5 space-y-4 md:space-y-6">
          {/* Sales chart card */}
          <Card className="p-2">
            <div className="flex items-start justify-between mb-3">
             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
  {/* Title & Sales Info */}
  <div>
    <div className="text-sm sm:text-base text-black font-bold">Sales chart</div>
    <div className="flex flex-wrap items-center gap-1 sm:gap-2">
      <div className="font-semibold text-xs sm:text-sm">{totalSalesLabel}</div>
      <span className="text-emerald-600 text-xs sm:text-sm font-semibold">
        {salesChangeLabel}
        <span className="text-black font-normal ml-1">vs yesterday</span>
      </span>
    </div>
  </div>

  {/* Tabs */}
  <div className="w-full sm:w-auto flex justify-start sm:justify-end">
    <Tabs value={salesRange} onChange={setSalesRange} />
  </div>
</div>
</div>

            {/* area "cloud" chart */}
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sales}>
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000000" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#000000"
                    strokeWidth={2}
                    fill="url(#areaFill)"
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Best selling products */}
          <Card className="p-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Best selling products</h3>
              <button className="text-xs border-b text-gray-600 hover:text-black">View all</button>
            </div>

            <div className="grid grid-cols-12 border-y py-2 text-xs text-gray-500 px-2">
              <div className="col-span-7">Product</div>
              <div className="col-span-3 text-right">Revenue</div>
              <div className="col-span-2 text-right">Units sold</div>
            </div>

            <ul className="mt-2 divide-y">
              {bestSellers.map((p, i) => (
                <li key={i} className="py-3 flex items-center">
                  <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-xs md:text-sm">{p.name}</div>
                  </div>
                  <div className="w-28 text-right text-xs md:text-sm">{p.revenue}</div>
                  <div className="w-10 text-right text-xs md:text-sm">{p.units}</div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* right column (lg: span 7) */}
        <div className="lg:col-span-7 space-y-4 md:space-y-6">
          {/* New customers line chart */}
          <Card className="p-2">
            <div className="flex items-start justify-between mb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
  {/* Stats Section */}
  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
    <div className="text-lg sm:text-xl md:text-3xl font-bold">{newCustomersToday}</div>
    
    <div className="text-gray-500 text-xs sm:text-sm leading-tight">
      New <br /> customers
    </div>
    
    <div className="text-emerald-600 text-xs sm:text-sm font-semibold">
      {newCustChange}
    </div>
  </div>

  {/* Tabs Section */}
  <div className="w-full sm:w-auto flex justify-start sm:justify-end">
    <Tabs value={newCustRange} onChange={setNewCustRange} />
  </div>
</div></div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={newCustomers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#000000"
                    strokeWidth={2}
                    dot={{ r: 4, stroke: "#000", fill: "#fff" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Customers activity pie */}
          <Card className="p-4">
           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2 sm:gap-4">
  {/* Title */}
  <h3 className="font-bold text-sm sm:text-base">Customers activity</h3>

  {/* Controls */}
  <div className="flex flex-wrap items-center gap-2">
    {/* Left / Right Arrows */}
    <button
      onClick={() => setPieIndex((p) => (p - 1 + pieViews.length) % pieViews.length)}
      className="w-8 h-8 rounded-md border hover:bg-gray-50 flex items-center justify-center"
      aria-label="Previous"
    >
      ‹
    </button>
    <button
      onClick={() => setPieIndex((p) => (p + 1) % pieViews.length)}
      className="w-8 h-8 rounded-md border hover:bg-gray-50 flex items-center justify-center"
      aria-label="Next"
    >
      ›
    </button>

    {/* Scrollable Tabs on Mobile */}
    <div className="w-full sm:w-auto overflow-x-auto">
      <div className="flex sm:block min-w-max">
        <Tabs value={activityRange} onChange={setActivityRange} />
      </div>
    </div>
  </div>
</div>


            <div className="flex items-center justify-center h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={`slice-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* pill labels like in the screenshot */}
            <div className="flex items-center justify-center gap-6 -mt-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-xs bg-black text-white">
                New <b>{pieData[0].value}</b>
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs bg-black text-white">
                Returning <b>{pieData[1].value}</b>
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* ===== recent orders ===== */}
      <Card className="mt-6">
        <div className="flex items-center justify-between px-4 pt-4">
          <h3 className="font-semibold">Recent Orders</h3>
          <button className="text-xs text-gray-600 hover:text-black">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[640px]">
            <thead>
              <tr className="text-gray-500">
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-3">{o.id}</td>
                  <td className="px-4 py-3">{o.date}</td>
                  <td className="px-4 py-3">{o.customer}</td>
                  <td className="px-4 py-3">{o.total}</td>
                  <td className="px-4 py-3">
                    <span className="text-yellow-600">Pending</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>




      </div>
    </div>
  );
};

export default Dashboard;
