import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUser,
  faBroadcastTower,
  faBell,
  faChartBar,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/UserContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { adminMail, userMail } = useAuth();
  const { setIsWebcamHidden } = useAuth();

  // Function to navigate to the respective path
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <aside className="w-64 bg-gray-50 min-h-screen flex flex-col justify-between">
      <div>
        {/* Top section with CCTV icon */}
        <div className="flex items-center justify-center p-5">
          <FontAwesomeIcon icon={faVideo} className="h-14 w-14 text-gray-600" />
        </div>
        {/* Navigation Links */}
        <nav className="mt-5">
          <a
            onClick={() => navigateTo(userMail ? "/dashboard" : "/admin")}
            className="flex items-center p-2 my-2 transition-colors duration-200 justify-start text-gray-600 hover:text-gray-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="w-5 h-5" />
            <span className="mx-4 text-sm font-normal">Dashboard</span>
          </a>
          <a
            onClick={() => navigateTo("/profile")}
            className="flex items-center p-2 my-2 transition-colors duration-200 justify-start text-gray-600 hover:text-gray-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
            <span className="mx-4 text-sm font-normal">Profile</span>
          </a>
          <a
            onClick={() => setIsWebcamHidden(false)}
            className="flex items-center p-2 my-2 transition-colors duration-200 justify-start text-gray-600 hover:text-gray-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBroadcastTower} className="w-5 h-5" />
            <span className="mx-4 text-sm font-normal">Go Live</span>
          </a>
          <a
            onClick={() => navigateTo("/notifications")}
            className="flex items-center p-2 my-2 transition-colors duration-200 justify-start text-gray-600 hover:text-gray-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
            <span className="mx-4 text-sm font-normal">Notification</span>
          </a>
          <a
            onClick={() => navigateTo("/statistics")}
            className="flex items-center p-2 my-2 transition-colors duration-200 justify-start text-gray-600 hover:text-gray-700 cursor-pointer"
          >
            <FontAwesomeIcon icon={faChartBar} className="w-5 h-5" />
            <span className="mx-4 text-sm font-normal">Statistics</span>
          </a>
        </nav>
      </div>
      {/* Bottom section if needed */}
      <div>{/* Placeholder for bottom content */}</div>
    </aside>
  );
};

export default Sidebar;
