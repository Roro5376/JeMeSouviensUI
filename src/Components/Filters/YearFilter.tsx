import React, { useState } from "react";
import Header from "../Layout/Header.tsx";
import MoviesList from "../Content/MoviesList.tsx";

export default function YearFilter({ movies }) {
  const [selectedYear, setSelectedYear] = useState("");
  let shuffledMovies = [...movies].sort(() => Math.random() - 0.5)

  const uniqueYears = [...new Set(shuffledMovies.map((movie) => movie.release_date?.split("-")[0]))]
    .sort()
    .reverse();

  if (!shuffledMovies || shuffledMovies.length === 0) {
    shuffledMovies = [];
    return <p className="text-white text-center mt-4">Loading movies...</p>;
  }

  const filteredMovies = selectedYear
    ? shuffledMovies.filter((movie) => movie.release_date?.split("-")[0] === selectedYear)
    : shuffledMovies;

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <h1 className="text-center text-2xl font-bold mb-4 py-6">
        Filter by Year
      </h1>

      <div className="text-center mb-6">
        <select
          className="bg-gray-700 text-white p-2 rounded-md"
          value={String(selectedYear)}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All Years</option>
          {uniqueYears.map((year) => (
            <option key={String(year)} value={String(year)}>
              {String(year)}
            </option>
          ))}
        </select>
      </div>

      <MoviesList movies={filteredMovies} />
    </div>
  );
}
