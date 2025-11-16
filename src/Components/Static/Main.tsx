import React from "react";
import MoviesList from "../Content/MoviesList.tsx";
import Header from "../Layout/Header.tsx";

const Main = ({ movies }) => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />

      <MoviesList movies={[...movies].sort(() => Math.random() - 0.5)} />
    </div>
  );
};

export default Main;
