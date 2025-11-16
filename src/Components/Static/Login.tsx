import React from "react";
import Header from "../Layout/Header.tsx";
import LoginForm from "../Forms/LoginForm.tsx";
const Login = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <LoginForm />
    </div>
  );
};

export default Login;
