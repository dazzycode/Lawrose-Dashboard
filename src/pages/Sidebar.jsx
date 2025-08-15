import { NavLink } from "react-router-dom";
import { FiHome,  FiShoppingCart, FiUsers, FiTag, FiSettings,  FiMessageSquare, FiGift} from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FiHome /> },
    { name: "Products", path: "/products", icon: <FiTag /> },
    { name: "Orders", path: "/orders", icon: <FiShoppingCart /> },
    { name: "Customers", path: "/customers", icon: <FiUsers/> },
    { name: "Ratings & Reviews", path: "/ratings", icon: <FiMessageSquare/> },
    { name: "Discounts & Marketing", path: "/discounts", icon: <FiGift /> },
    { name: "Settings", path: "/settings", icon: <FiSettings /> },
  ];

  return (
    <div className="bg-white w-64 min-h-screen border-r flex flex-col justify-between">
      <div>
<div className="p-4 mb-10 mt-5">
  <img 
    src="/logo.png" 
    alt="Logo" 
    className="h-16 w-auto"
  />
</div>
        <nav className="flex flex-col">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 transition-colors ${
                  isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
<div className="mt-20 "> 
      <button className="flex items-center gap-3 px-3  py-3 bg-black rounded-lg w-full text-white hover:bg-red-50">
        <FaSignOutAlt className="text-white text-xl"/>
        Logout
      </button></div>
    </div>
  );
};

export default Sidebar;
