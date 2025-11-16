import React from "react";
import Header from "../Layout/Header.tsx";
import RegistrationForm from "../Forms/RegistrationForm.tsx";
import { useAuth } from "../Contexts/AuthContext.tsx";

export default function RegisterUser() {
  const { user } = useAuth();
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      {user ? (
        
        <div className="flex flex-col items-center justify-center py-8">
          <h2 className="text-2xl font-bold">Welcome, {user.firstName} {user.lastName}!</h2>
          <p className="text-gray-300">Email: {user.email}</p>
          <p className="text-gray-300">City: {user.city}, {user.country}</p>
          <p className="text-gray-300">Date of Birth: {user.dateOfBirth}</p>
          <img
            src={`${process.env.PUBLIC_URL}/Drapeau_Québécois.png`}
            className="w-24 h-24 rounded-full border-2 border-white mt-4"
            alt="Avatar"
          />
        </div>
      ) : (
        
        <RegistrationForm />
      )}
    </div>
  );
}
