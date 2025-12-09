import React, { useState } from "react";
import { useAuth } from "../../context/authContext.jsx";
import { useNavigate } from "react-router";
import axios from "axios";
import bgImg from "../assets/An Inventory Management System that is more….jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { Login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://localhost:3000/api/auth/login", {
        email,
        password,
      });

      if (response.data.status) {
        await Login(response.data.user, response.data.token);

        if (response.data.role === "admin") {
          navigate("/admin/dashboard");
        } else {
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
    <div className="flex w-full h-screen">
      {/* Left 40% with image + green overlay */}
      <div className="w-[40%] h-screen relative flex flex-col justify-center ">
        <img
          src={bgImg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-600/90"></div>
        <h2 className="relative text-5xl text-white font-bold px-4 mb-4">
          Welcome
        </h2>
        <div className="flex items-center justify-center space-x-2 mb-2">
            <hr className="relative border-white w-24" />
            <h3 className="relative text-xl text-white font-bold text-center">
                To HU Inventory Management System
            </h3>
            </div>

        
        <p className="relative  text-white text-lg md:text-sm max-w-2xl px-4">A smart platform for Haramaya University to track and manage inventory.
            Monitor stock, record transactions, and get real-time reports effortlessly.</p>
      </div>

      
      <div className="w-[60%] h-screen flex justify-center items-center bg-gray-100 ">
        <div className=" p-6 w-100 rounded-2xl border shadow-lg pt-10 pb-10 border-gray-300 m-10 ">
          <h5 className="text-3xl  mb-4 text-center">Login To HU IMS</h5>
          <p className="mb-4 text-lg md:text-sm max-w-2xl text-center">Fill up the following to login is you already signup and to get updatad</p>

          {error && (
            <div className="bg-red-200 text-red-700 p-2 mb-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className=" outline-none w-full px-3 py-2 mt-4 mb-2 shadow-lg  border border-gray-200  focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="mb-4">
              
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 mb-2  border border-gray-200  shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
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
