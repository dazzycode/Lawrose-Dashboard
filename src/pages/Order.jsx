import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FaChevronDown } from "react-icons/fa";

const Order = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [viewModal, setViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Pagination states
  const [orderPage, setOrderPage] = useState(1);
  const [returnPage, setReturnPage] = useState(1);
  const itemsPerPage = 5;

  const ordersData = [
    { id: "0001", date: "05-April-2025", customer: "Rose D.", amount: "₦125,000", status: "Delivered" },
    { id: "0002", date: "05-April-2025", customer: "Rose D.", amount: "₦125,000", status: "Pending" },
    { id: "0003", date: "05-April-2025", customer: "Rose D.", amount: "₦125,000", status: "Failed" },
    { id: "0004", date: "05-April-2025", customer: "Rose D.", amount: "₦125,000", status: "Delivered" },
    { id: "0005", date: "05-April-2025", customer: "Rose D.", amount: "₦125,000", status: "Pending" },
    { id: "0006", date: "05-April-2025", customer: "Rose D.", amount: "₦125,000", status: "Failed" },
    { id: "0007", date: "05-April-2025", customer: "Rose D.", amount: "₦125,000", status: "Delivered" },
    { id: "0008", date: "05-April-2025", customer: "Rose D.", amount: "₦125,000", status: "Pending" },
    { id: "0009", date: "05-April-2025", customer: "Rose D.", amount: "₦125,000", status: "Failed" },
  ];

  const returnsData = [
    { returnId: "#R102", orderId: "#1009", date: "Apr 5", customer: "Chioma J.", reason: "Wrong Size", status: "Approved" },
    { returnId: "#R103", orderId: "#1010", date: "Apr 5", customer: "Chioma J.", reason: "Wrong Size", status: "Declined" },
    { returnId: "#R104", orderId: "#1011", date: "Apr 5", customer: "Chioma J.", reason: "Wrong Size", status: "Approved" },
    { returnId: "#R105", orderId: "#1012", date: "Apr 5", customer: "Chioma J.", reason: "Wrong Size", status: "Approved" },
    { returnId: "#R106", orderId: "#1013", date: "Apr 5", customer: "Chioma J.", reason: "Wrong Size", status: "Declined" },
    { returnId: "#R107", orderId: "#1014", date: "Apr 5", customer: "Chioma J.", reason: "Wrong Size", status: "Approved" },
    { returnId: "#R108", orderId: "#1015", date: "Apr 5", customer: "Chioma J.", reason: "Wrong Size", status: "Approved" },
  ];

  const statusColors = {
    Delivered: "text-green-500",
    Pending: "text-yellow-500",
    Failed: "text-red-500",
    Approved: "text-green-500",
  };

  // Pagination helpers
  const paginate = (data, page) => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const totalOrderPages = Math.ceil(ordersData.length / itemsPerPage);
  const totalReturnPages = Math.ceil(returnsData.length / itemsPerPage);

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
        <div className="p-6">
          {/* Tabs */}
          <div className="flex justify-center bg-white rounded-full mx-auto mb-4">
            <button
              className={`px-4 py-2 rounded border ${
                activeTab === "orders" ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
            <button
              className={`px-4 py-2 rounded border ${
                activeTab === "returns" ? "bg-black text-white" : "bg-white text-black"
              }`}
              onClick={() => setActiveTab("returns")}
            >
              Return & Refunds
            </button>
          </div>

          {/* Orders Table */}
          {activeTab === "orders" && (
            <div className="overflow-x-auto bg-white p-4 rounded shadow">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left text-xs md:text-sm ">Order ID</th>
                    <th className="p-2 text-left text-xs md:text-sm ">Date</th>
                    <th className="p-2 text-left  text-xs md:text-sm  ">Customer</th>
                    <th className="p-2 text-left text-xs md:text-sm ">Total Amount</th>
                    <th className="p-2 text-left text-xs md:text-sm ">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginate(ordersData, orderPage).map((order, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="p-2 text-xs md:text-sm  ">{order.id}</td>
                      <td className="p-2 text-xs md:text-sm ">{order.date}</td>
                      <td className="p-2 text-xs md:text-sm  ">{order.customer}</td>
                      <td className="p-2 text-xs md:text-sm ">{order.amount}</td>
                      <td className={`p-2 ${statusColors[order.status]}`}>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  disabled={orderPage === 1}
                  onClick={() => setOrderPage(orderPage - 1)}
                  className="px-2 py-1 border rounded disabled:opacity-50"
                >
                  &lt;
                </button>
                {Array.from({ length: totalOrderPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setOrderPage(i + 1)}
                    className={`px-2 py-1 border rounded ${
                      orderPage === i + 1 ? "bg-black text-white" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={orderPage === totalOrderPages}
                  onClick={() => setOrderPage(orderPage + 1)}
                  className="px-2 py-1 border rounded disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}

          {/* Return & Refunds Table */}
          {activeTab === "returns" && (
            <div className="overflow-x-auto bg-white p-4 rounded shadow">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-xs md:text-sm text-left">Return ID</th>
                    <th className="p-2 text-left text-xs md:text-sm ">Order ID</th>
                    <th className="p-2 text-left text-xs md:text-sm ">Date</th>
                    <th className="p-2 text-left text-xs md:text-sm  ">Customer</th>
                    <th className="p-2 text-left text-xs md:text-sm ">Reason</th>
                    <th className="p-2 text-left text-xs md:text-sm ">Status</th>
                    <th className="p-2 text-left text-xs md:text-sm ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginate(returnsData, returnPage).map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="p-2 text-xs md:text-sm ">{item.returnId}</td>
                      <td className="p-2 text-xs md:text-sm ">{item.orderId}</td>
                      <td className="p-2 text-xs md:text-sm ">{item.date}</td>
                      <td className="p-2 text-xs md:text-sm ">{item.customer}</td>
                      <td className="p-2 text-xs md:text-sm ">{item.reason}</td>
                      <td
                        className={`p-2 ${item.status === "Declined" ? "text-red-500" : ""}`}
                      >
                        {item.status}
                      </td>
                      <td className="p-2">
                        <button
                          className="border px-3 py-1 rounded flex items-center gap-1"
                          onClick={() => {
                            setSelectedItem(item);
                            setViewModal(true);
                          }}
                        >
                          View
                          <FaChevronDown className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  disabled={returnPage === 1}
                  onClick={() => setReturnPage(returnPage - 1)}
                  className="px-2 py-1 border rounded disabled:opacity-50"
                >
                  &lt;
                </button>
                {Array.from({ length: totalReturnPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setReturnPage(i + 1)}
                    className={`px-2 py-1 border rounded ${
                      returnPage === i + 1 ? "bg-black text-white" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={returnPage === totalReturnPages}
                  onClick={() => setReturnPage(returnPage + 1)}
                  className="px-2 py-1 border rounded disabled:opacity-50"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}

          {/* View Modal */}
          {viewModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow w-96">
                <h2 className="text-lg font-semibold mb-4">Return Details</h2>
                {selectedItem && (
                  <div className="space-y-2">
                    <p><strong>Return ID:</strong> {selectedItem.returnId}</p>
                    <p><strong>Order ID:</strong> {selectedItem.orderId}</p>
                    <p><strong>Customer:</strong> {selectedItem.customer}</p>
                    <p><strong>Reason:</strong> {selectedItem.reason}</p>
                    <p><strong>Status:</strong> {selectedItem.status}</p>
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <button
                    className="px-4 py-2 bg-black text-white rounded"
                    onClick={() => setViewModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
