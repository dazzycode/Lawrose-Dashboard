import { FiBell } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ onMenuClick }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white border-b">

      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden text-2xl mr-2"
        onClick={onMenuClick}
      >
        ☰
      </button>
      {/* Search bar */}
      <div className="relative w-1/2 hidden sm:block">
        <input
          type="text"
          placeholder="Search..."
          className="border border-black px-3 py-2 pr-10 rounded-lg w-full focus:outline-none"
        />
        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <FiBell className="text-xl" />
          {/* Red dot */}
          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full h-2 w-2"></span>
        </div>
        <div className="w-8 h-8 rounded-full bg-black"></div>
      </div>
    </div>
  );
};

export default Navbar;
