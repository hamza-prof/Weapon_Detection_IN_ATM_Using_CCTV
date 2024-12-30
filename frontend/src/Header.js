import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const navigateToLogin = () => {
    navigate("/LoginPage");
  };

  const navigateToNotifications = () => {
    navigate("/notifications");
  };

  return (
    <header className="flex justify-between items-center bg-white p-4 shadow z-40 w-full">
      {/* Left side - Search bar */}
      <div className="relative w-full max-w-xs">
        <FontAwesomeIcon
          icon={faSearch}
          className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
        />
        <input
          type="search"
          className="pl-10 pr-4 py-2 rounded-full bg-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Search here..."
        />
      </div>
      {/* Right side - Icons */}
      <div className="flex items-center ml-4">
        <FontAwesomeIcon
          icon={faBell}
          className="text-gray-500 mx-5 cursor-pointer w-5 h-5"
          onClick={navigateToNotifications}
        />
        <FontAwesomeIcon
          icon={faUser}
          className="text-gray-500 cursor-pointer w-5 h-5"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        />
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={navigateToProfile}
            >
              Your Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={navigateToLogin}
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
