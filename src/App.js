import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Components/Static/Main.tsx";
import YearFilter from "./Components/Filters/YearFilter.tsx";
import "./App.css";
import RegisterUser from "./Components/Static/RegisterUser.tsx";
import { AuthProvider } from "./Components/Contexts/AuthContext.tsx";
import Login from "./Components/Static/Login.tsx";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("https://jemesouviens-h3evekbjf5bkcre7.centralus-01.azurewebsites.net/movies", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        console.log("Movies Data:", data);
        setMovies(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Main movies={movies} />} />
          <Route path="/year" element={<YearFilter movies={movies} />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
