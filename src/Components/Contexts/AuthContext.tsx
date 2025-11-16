import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(String(localStorage.getItem("user"))) || null;
  });
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      console.log("Attempting login with username:", username);
      const response = await fetch("https://jemesouviens-h3evekbjf5bkcre7.centralus-01.azurewebsites.net/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("Login response status:", response.status);
      const responseData = await response
        .json()
        .catch(() => ({ message: "Failed to parse response" }));
      console.log("Login response data:", responseData);

      if (!response.ok) {
        throw new Error(
          responseData.message || `Login failed with status ${response.status}`
        );
      }

      localStorage.setItem("user", JSON.stringify(responseData.user));
      localStorage.setItem("token", responseData.token);
      setUser(responseData.user);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
      throw error; // Re-throw the error so the login form can handle it
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
