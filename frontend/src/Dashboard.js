// Dashboard.js
import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./Maincontent";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
