import React, { useState} from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Link} from "react-router-dom";



const initialDiscounts = [
  { code: "WELCOME10", value: "10% off", conditions: "First order only", expiry: "April 30", status: "Active" },
  { code: "WELCOME10", value: "10% off", conditions: "First order only", expiry: "April 30", status: "Active" },
  { code: "REAL24", value: "₦500 off", conditions: "Orders above ₦5000", expiry: "July 3", status: "Active" },
  { code: "WELCOME10", value: "10% off", conditions: "First order only", expiry: "April 30", status: "Active" },
  { code: "WELCOME10", value: "10% off", conditions: "First order only", expiry: "April 30", status: "Active" },
];

export default function Discount() {
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({});

  const openModal = (index) => {
    setEditIndex(index);
    setEditForm(discounts[index]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditForm({});
    setEditIndex(null);
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updated = [...discounts];
    updated[editIndex] = editForm;
    setDiscounts(updated);
    closeModal();
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  

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
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Discount codes</h2>
       <Link to="/create"><button className="bg-black text-white px-4 py-2 rounded-md text-sm">Create new</button></Link> 
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left text-sm font-semibold">Code</th>
              <th className="p-3 text-left text-sm font-semibold">Value</th>
              <th className="p-3 text-left text-sm font-semibold">Conditions</th>
              <th className="p-3 text-left text-sm font-semibold">Expiry date</th>
              <th className="p-3 text-left text-sm font-semibold">Status</th>
              <th className="p-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-3 text-sm">{discount.code}</td>
                <td className="p-3 text-sm">{discount.value}</td>
                <td className="p-3 text-sm">{discount.conditions}</td>
                <td className="p-3 text-sm">{discount.expiry}</td>
                <td className="p-3 text-sm">{discount.status}</td>
                <td className="p-3 text-sm">
                  <button
                    onClick={() => openModal(idx)}
                    className="border px-3 py-1 rounded-md text-sm flex items-center gap-1"
                  >
                    Edit <span>▼</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h3 className="text-lg font-semibold mb-4">Edit Discount</h3>

            {/* Inputs */}
            <div className="space-y-3">
              <input
                name="code"
                value={editForm.code}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                placeholder="Code"
              />
              <input
                name="value"
                value={editForm.value}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                placeholder="Value"
              />
              <input
                name="conditions"
                value={editForm.conditions}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                placeholder="Conditions"
              />
              <input
                name="expiry"
                value={editForm.expiry}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                placeholder="Expiry Date"
              />
              <select
                name="status"
                value={editForm.status}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={closeModal} className="px-4 py-2 rounded border">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 rounded bg-black text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  

  
        
      </div>
    </div>
  );
}
