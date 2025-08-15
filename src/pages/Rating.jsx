import React, { useState} from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { FaStar } from "react-icons/fa";



export default function Rating() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const getInitials = (name) => {
  const names = name.split(" ");
  return names.map(n => n[0]).join("").toUpperCase();
};

 const reviews = [
  {
    customer: "Jane Justin",
    initials: "JJ",
    rating: 5,
    review:
      "This jacket is everything! The leather has such a soft and luxurious feel to it, it fits perfect and the stitching is impeccable. I’ve gotten compliments every single time I’ve worn it. Highly recommend!",
    product: "The Noir Classic Leather Jacket",
    date: "27 April",
  },
  {
    customer: "John Doe",
    initials: "JD",
    rating: 4,
    review:
      "Very stylish jacket. The fit is good but slightly tight around the shoulders. Overall, worth the purchase!",
    product: "The Noir Classic Leather Jacket",
    date: "25 April",
  },
  {
    customer: "Mary Smith",
    initials: "MS",
    rating: 5,
    review:
      "Amazing quality! The leather feels premium and it keeps me warm during chilly evenings. Definitely a wardrobe staple.",
    product: "The Noir Classic Leather Jacket",
    date: "23 April",
  },
  {
    customer: "Aliyu Bello",
    initials: "AB",
    rating: 3,
    review:
      "The jacket is okay, but the color was slightly different from the pictures. Comfortable enough though.",
    product: "The Noir Classic Leather Jacket",
    date: "20 April",
  },
  {
    customer: "Fatima Yusuf",
    initials: "FY",
    rating: 5,
    review:
      "Absolutely love it! Fits perfectly and the leather is so soft. Received so many compliments already.",
    product: "The Noir Classic Leather Jacket",
    date: "18 April",
  },
  {
    customer: "Chinedu Okeke",
    initials: "CO",
    rating: 4,
    review:
      "Good quality jacket. I like the style, but the sleeves are a bit long. Otherwise, highly satisfied.",
    product: "The Noir Classic Leather Jacket",
    date: "15 April",
  },
  {
    customer: "Ngozi Eze",
    initials: "NE",
    rating: 5,
    review:
      "Excellent craftsmanship! The jacket feels luxurious and looks amazing on. Highly recommended for anyone looking for quality leather.",
    product: "The Noir Classic Leather Jacket",
    date: "12 April",
  },
  {
    customer: "Ahmed Musa",
    initials: "AM",
    rating: 4,
    review:
      "Great jacket! The fit is good and it’s comfortable. A little pricey but worth it for the quality.",
    product: "The Noir Classic Leather Jacket",
    date: "10 April",
  },
];


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
      <h2 className="text-lg font-semibold mb-4">Ratings & Reviews</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-3 text-sm font-semibold">Customer</th>
              <th className="text-left p-3 text-sm font-semibold">Rating</th>
              <th className="text-left p-3 text-sm font-semibold">Review</th>
              <th className="text-left p-3 text-sm font-semibold">Product</th>
              <th className="text-left p-3 text-sm font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                {/* Customer */}
                <td className="p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-semibold">
      {getInitials(review.customer)}
    </div>
                  <span className="text-sm">{review.customer}</span>
                </td>

                {/* Rating */}
                <td className="p-3">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </td>

                {/* Review */}
                <td className="p-3 text-sm max-w-xs truncate">{review.review}</td>

                {/* Product */}
                <td className="p-3 text-sm">{review.product}</td>

                {/* Date */}
                <td className="p-3 text-sm">{review.date}</td>
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
