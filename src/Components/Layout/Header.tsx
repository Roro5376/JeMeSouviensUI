import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext.tsx";
import Login from "../Static/Login.tsx";

const Header = () => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {user && (
        <div className="absolute right-4 top-4 flex items-center text-white text-lg font-semibold ">
          <span>
            {user.firstName} {user.lastName}
          </span>
          <img
            src="/Drapeau_Québécois.png"
            className="w-10 h-10 rounded-full border-2 border-white"
            alt="Avatar"
          />
        </div>
      )}

      <div className="w-full h-50 bg-cover bg-center flex items-center justify-center relative pt-14">
        <div className="absolute inset-0 bg-white/10 border-y-4 border-white/60 z-10 top-20 bottom-5"></div>
        <img
          src="/Logo.png"
          alt="Top Banner"
          className="max-w-full max-h-48 object-contain "
        />
      </div>

      <nav className="bg-gray-800 border-y-4 border-white/80">
        <ul className="flex justify-center space-x-6">
          {["Main", "Year", "Rating", "Search", "Register"].map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:text-yellow-400 px-4 py-4 hover:bg-sky-950"
            >
              <Link
                to={
                  item.toLowerCase() === "main" ? `/` : `/${item.toLowerCase()}`
                }
                className="w-full h-full"
              >
                {item}
              </Link>
            </li>
          ))}
          {user ? (
            <li className="cursor-pointer hover:text-yellow-400 px-4 py-4 hover:bg-sky-950">
              <span className="text-white font-semibold">My Account</span>
            </li>
          ) : (
            <li
              className="cursor-pointer hover:text-yellow-400 px-4 py-4 hover:bg-sky-950"
              onClick={() => setShowLogin(true)}
            >
              <Link to={`/login`} className="w-full h-full">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
