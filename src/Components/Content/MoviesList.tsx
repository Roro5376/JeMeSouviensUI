import React from "react";

export default function MoviesList({ movies }) {
  return (
    <div className="grid grid-cols-5 gap-6 container mx-auto p-6">
      {movies.slice(0, 20).map((movie) => (
        <div
          key={movie.id}
          className=" 
            bg-black/30 p-2 rounded-lg transition-transform duration-300 hover:scale-110 text-center border-4 border-cyan-900 border-opacity-50"
        >
          <div className="relative group">
            <div className="w-64 aspect-[2/3] text-center relative overflow-hidden rounded-lg border-2 border-white">
              <div
                className="absolute inset-0 bg-white opacity-20 rounded-lg"
                style={{
                  clipPath: "polygon(0 0, 99% 0, 50% 50%, 0% 100%)",
                }}
              ></div>
              <img
                src={
                  movie.poster_path !== null
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/Drapeau_Québécois.png"
                }
                alt={movie.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <p className="mt-2 font-semibold line-clamp-1 group-hover:line-clamp-none">
              {movie.title}
            </p>

            <p className="mt-1 font-bold text-yellow-400 border-y border-white/80 ">
              {movie.release_date?.split("-")[0]}
            </p>
            <p
              className={`mt-1 font-bold ${
                movie.vote_average < 7
                  ? movie.vote_average < 4
                    ? "text-red-400"
                    : "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {movie.vote_average
                ? `${
                    movie.vote_average < 7
                      ? movie.vote_average < 4
                        ? "🔴"
                        : "🟡"
                      : "🟢"
                  } ${movie.vote_average}/10`
                : "Pas encore noté"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
