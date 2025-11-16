import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext.tsx";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { setUser } = useAuth(); // get setUser from your context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const e = <div>uighui</div>
  
  const validateForm = () => {
    const {
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      email,
      dateOfBirth,
    } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d).{8,}$/;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    const errorMessages: string[] = [];
    if (username.length < 8)
      errorMessages.push("Username must be at least 8 characters long");
    if (!passwordRegex.test(password))
      errorMessages.push(
        "Password must be at least 8 characters long and contain at least one number"
      );
    if (password !== confirmPassword)
      errorMessages.push("Passwords do not match");
    if (firstName.length < 2)
      errorMessages.push("First name must be at least 2 characters");
    if (lastName.length < 2)
      errorMessages.push("Last name must be at least 2 characters");
    if (!emailRegex.test(email)) errorMessages.push("Invalid email format");
    if (birthDate > today)
      errorMessages.push("Date of birth cannot be in the future");
    if (age < 18)
      errorMessages.push("You need to be at least 18 years old to register");

    return errorMessages;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);

    const { confirmPassword, ...userData } = formData;
    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert("Registration successful!");
        setUser(userData); // update the logged-in user in context
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          email: "",
          city: "",
          country: "",
          dateOfBirth: "",
        });
        navigate("/"); // return to main menu
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md border-4 border-white/60"
      >
        <h2 className="text-white/80 text-2xl font-bold mb-4 text-center">
          Register
        </h2>
        {errors.length > 0 && (
          <div className="mb-4">
            {errors.map((error, index) => (
              <p key={index} className="text-red-500 text-sm text-center">
                {error}
              </p>
            ))}
          </div>
        )}

        <h3 className="text-white/80 text-lg font-bold mb-2">Username</h3>
        <input
          className="text-black/80 w-full p-2 mb-2 border rounded"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <h3 className="text-white/80 text-lg font-bold mb-2">Password</h3>
        <input
          className="text-black/80 w-full p-2 mb-2 border rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <h3 className="text-white/80 text-lg font-bold mb-2">
          Confirm Password
        </h3>
        <input
          className="text-black/80 w-full p-2 mb-2 border rounded"
          type="password"
          name="confirmPassword"
          placeholder="Retype Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <div className="flex space-x-2">
          <div className="w-1/2">
            <h3 className="text-white/80 text-lg font-bold mb-2">First Name</h3>
            <input
              className="text-black/80 w-full p-2 mb-2 border rounded"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-1/2">
            <h3 className="text-white/80 text-lg font-bold mb-2">Last Name</h3>
            <input
              className="text-black/80 w-full p-2 mb-2 border rounded"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h3 className="text-white/80 text-lg font-bold mb-2">Email</h3>
        <input
          className="text-black/80 w-full p-2 mb-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="flex space-x-2">
          <div className="w-1/2">
            <h3 className="text-white/80 text-lg font-bold mb-2">City</h3>
            <input
              className="text-black/80 w-full p-2 mb-2 border rounded"
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-1/2">
            <h3 className="text-white/80 text-lg font-bold mb-2">Country</h3>
            <input
              className="text-black/80 w-full p-2 mb-2 border rounded"
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h3 className="text-white/80 text-lg font-bold mb-2">Date of Birth</h3>
        <input
          className="text-black/80 w-full p-2 mb-4 border rounded"
          type="date"
          name="dateOfBirth"
          max={new Date().toISOString().split("T")[0]}
          min={"1900-01-01"}
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />

        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
