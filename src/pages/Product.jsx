import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FaPlus } from "react-icons/fa";

const Product = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Men's classic oxford shoe",
      price: "₦18,000",
      status: "In stock",
      stock: 18,
      thumbnail: "/jacket.png",
    },
    ...Array(18).fill({
      id: Math.random(),
      name: "Men's classic oxford shoe",
      price: "₦18,000",
      status: "In stock",
      stock: 18,
      thumbnail: "/jacket.png",
    }),
  ]);
  const navigate = useNavigate(); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    status: "",
    stock: "",
    thumbnail: "",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentData = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(currentData[index]); // use currentData here
    setIsModalOpen(true);
  };


  const handleSave = () => {
    if (editIndex !== null) {
      const globalIndex = (currentPage - 1) * itemsPerPage + editIndex;
      const updated = [...products];
      updated[globalIndex] = formData;
      setProducts(updated);
    } else {
      setProducts([...products, { ...formData, id: Math.random() }]);
    }
    setIsModalOpen(false);
  };

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
          {/* Add new product button */}
          <div className="flex justify-center">
            <div className="bg-white my-8 shadow rounded-lg p-8 w-[1000px]">
              <button
                onClick={() => navigate("/edit")} // <-- changed here
                className="flex items-center justify-center mx-auto px-4 py-2 hover:bg-gray-100 transition"
              >
                <FaPlus className="mr-2" />
                Add Item
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2">Thumbnail</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">No. in stock</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((p, index) => (
                <tr key={index}>
                  <td className="border p-2 text-center">
                    <img src={p.thumbnail} alt={p.name} className="w-12 h-12" />
                  </td>
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2">{p.price}</td>
                  <td className="border p-2">{p.status}</td>
                  <td className="border p-2">{p.stock}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleEdit(index)}
                      className="border rounded px-3 py-1 bg-gray-100 hover:bg-gray-200"
                    >
                    Edit <span>▼</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === pageNum
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* Modal */}
          {isModalOpen && (
             <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">
                  {editIndex !== null ? "Edit Product" : "Add Product"}
                </h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Thumbnail URL"
                  value={formData.thumbnail}
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.value })
                  }
                  className="border p-2 mb-2 w-full"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="border px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-black text-white px-4 py-2 rounded"
                  >
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
};

export default Product;
