import React, { useState } from "react";
import { useAuth } from "../../context/authContext.jsx";

import { useNavigate } from "react-router";
import axios from "axios";
import bgImg from "../assets/An Inventory Management System that is more….jpeg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        await login(response.data.user, response.data.token);

        if (response.data.user.role === "admin") {
          navigate("/admin/dashboard");
        }else if (response.data.user.role === "storeManager") {
          navigate("/storeManager/dashboard");
        }else if (response.data.user.role === "departmentHead") {
          navigate("/departmentHead/dashboard");
        }else if (response.data.user.role === "universityAuth") {
          navigate("/universityAuth/dashboard");
        }else {
          navigate("/customer/dashboard");
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen ">
      
      <div className="w-[40%] h-screen relative flex flex-col pt-[18%] p-7 align-center ">
        <img
          src={bgImg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-600/90"></div>
        <h2 className="relative text-5xl text-white font-bold px-4 mb-4">
          Welcome
        </h2>
        <div className="flex items-center justify-center mb-2">
            <hr className="relative border-white w-18" />
            <h3 className="relative text-xl text-white font-bold text-center">
                To HU Inventory Management System
            </h3>
            </div>

         <div className="flex justify-center">
          <p className="relative  text-white text-lg md:text-sm max-w-2xl px-4">A smart platform for Haramaya University to track and manage inventory.
            Monitor stock, record transactions, and get real-time reports effortlessly.</p>
         </div>
          
          

      </div>

      
      <div className="w-[60%] h-screen flex justify-center items-center bg-gray-100 ">
        <div className=" p-6 w-100 rounded-2xl border shadow-lg pt-10 pb-10 border-gray-300 m-10 ">
          <h5 className="text-3xl font-bold mb-4 text-center">Login To HU IMS</h5>
          <p className="mb-4 text-lg md:text-sm max-w-2xl text-center">Fill up the following to login is you already Registerd and to get access</p>

          {error && (
            <div className="bg-red-200 text-red-700 p-2 mb-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className=" outline-none w-full px-3 py-2 mt-4 mb-2 shadow-sm  border border-gray-300  focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="mb-4">
              
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mb-2  border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
