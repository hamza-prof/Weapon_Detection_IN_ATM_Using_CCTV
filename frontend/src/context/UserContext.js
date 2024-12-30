import React, { createContext, useState, useContext, useCallback } from "react";

import { login as loginUser } from "../utils/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Initialize loading state
  const [userMail, setUserMail] = useState("");
  const [adminMail, setAdminMail] = useState("");
  const [isWebcamHidden, setIsWebcamHidden] = useState(true);

  const login = useCallback(async (email, password) => {
    setError(""); // Reset error state
    setLoading(true); // Set loading to true when login starts
    try {
      const data = await loginUser(email, password);

      if (data.adminMail) {
        setIsAuthenticated(true);
        setAdminMail(data.adminMail);
      } else if (data.userMail) {
        setIsAuthenticated(true);
        setUserMail(data.userMail);
      } else {
        setIsAuthenticated(false);
        setError("Incorrect email or password");
      }
    } catch (error) {
      setIsAuthenticated(false);
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        adminMail,
        userMail,
        login,
        error,
        loading,
        isWebcamHidden,
        setIsWebcamHidden,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
