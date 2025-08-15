import React, { useState} from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";





export default function EditCode() {
  

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
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
  {/* Heading */}
  <h1 className="text-sm sm:text-base md:text-xl font-semibold text-center sm:text-left break-words">
    Add a new Discount code
  </h1>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto justify-end sm:justify-normal">
    <button
      className="flex-shrink px-3 sm:px-6 py-2 sm:py-3 bg-gray-200 rounded w-auto min-w-0 text-center text-xs md:text-sm"
    >
      Save as draft
    </button>

    <button
      className="px-4 py-2 bg-gray-200 rounded w-auto min-w-0"
    >
      Cancel
    </button>
  </div>
</div>


      {/* Form */}
      <div className="w-full bg-white p-6 rounded shadow-sm border">
        <form className="space-y-5">
          {/* Discount code */}
          <div>
            <label className="block mb-1 text-sm font-medium">Discount code</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Discount type */}
          <div>
            <label className="block mb-1 text-sm font-medium">Discount type</label>
            <select
              className="w-full border rounded px-3 py-2"
            >
              <option>Percentage</option>
              <option>Fixed amount</option>
            </select>
          </div>

          {/* Discount value */}
          <div>
            <label className="block mb-1 text-sm font-medium">Discount value</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Conditions */}
          <div>
            <label className="block mb-1 text-sm font-medium">Conditions</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Expiry date */}
          <div>
            <label className="block mb-1 text-sm font-medium">Expiry date</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Usage limit */}
          <div>
            <label className="block mb-1 text-sm font-medium">Usage limit (optional)</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">Description (optional)</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Publish button */}
           <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="h-10 w-56 rounded-md bg-black text-sm font-medium text-white hover:opacity-90"
          >
            Publish
          </button>
        </div>
        </form>
      </div>
    </div>
  
  
  

  
        
      </div>
    </div>
  );
}
