import React, { useState } from "react";
import { useAuth } from "../Contexts/AuthContext.tsx";

export default function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      await login(username, password);
    } catch (err) {
      console.error("Login form error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <div className="bg-gray-600 p-6 rounded shadow-lg w-80">
        <h2 className="text-xl text-white flex justify-center font-bold mb-4">
          Login
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-2 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-2 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
