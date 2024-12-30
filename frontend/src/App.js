// App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainContent from "./Maincontent";
import Profile from "./Profile";
import LoginPage from "./LoginPage";
import Layout from "./Layout";
import Incidents from "./Incidents";
import { useAuth } from "./context/UserContext";
import AdminDashboard from "./AdminDashboard";
import LiveView from "./LiveView";
import UseDetectionModel from "./UseDetectionModel";
import DetectionModel from "./DetectionModel";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <ToastContainer />
      {isAuthenticated && <DetectionModel />}
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <MainContent />
              </Layout>
            }
          />
          <Route
            path="/live"
            element={
              <Layout>
                <LiveView />
              </Layout>
            }
          />
          <Route
            path="/admin"
            element={
              <Layout>
                <AdminDashboard />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/incidents"
            element={
              <Layout>
                <Incidents />
              </Layout>
            }
          />
          {/* Redirect from root to dashboard */}
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
