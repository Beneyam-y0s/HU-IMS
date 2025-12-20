import React from "react";
import { useAuth } from "../../context/authContext.jsx";
import {
  FaCalendarCheck,
  FaArrowDown,
  FaRing,
  FaEdit
} from "react-icons/fa";
import BittomImg from "../assets/An Inventory Management System that is more….jpeg";
import Navbar from "./Navbar.jsx";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="px-4">
      <Navbar />
      

      <div className=" pb-4">
        <p className="text-gray-600 bg-green-200 p-4 rounded-xl shadodw-xl">User account information</p>
      </div>
      <div className="flex gap-8 justify-center mb-24">
          <div className="bg-white border-b-6 border-t-6 border-green-300/90  shadow-xl rounded-lg flex flex-col px-2 py-2  justify-between w-fit gap-4">
          <div className="flex flex-col justify-center items-center pt-6">
            <img src={BittomImg} alt="" className="w-40 shadow-lg rounded-full" />
          </div>


            <div className="flex flex-col px-8 py-5 justify-center items-center ">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Full Name:  <span className="mt-1 p-3  text-green-600 font-bold">{user?.name || "N/A"}</span></span>
                <span className="text-sm text-gray-500">Email:  <span className="mt-1 p-3  text-green-600 font-bold">{user?.email || "N/A"}</span></span>
                <span className="text-sm text-gray-500">Department :<span className="mt-1 p-3  text-green-600 font-bold">{user?.department || "N/A"}</span></span>
                <span className="text-sm text-gray-500">Role: <span className="mt-1 p-3  text-green-600 font-bold">{user?.role || "N/A"}</span></span>
              </div>
            </div>

            <div className="flex justify-end" >
              <span className=" cursor-pointer"> 
                <FaEdit className="text-green-600 hover:text-amber-400 mt-4"/>
              </span>
            </div>
          </div>


          <form className="bg-white   shadow-xl rounded-lg w-[60%] p-4 space-y-4 grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Address</label>
              <input
                type="text"
                name="address"
                
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">University ID</label>
              <input
                type="text"
                name="universityId"
                
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Role</label>
              <select
                name="role"
                
                className="w-full border px-3 py-2 rounded"
              >
                
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Department</label>
              <select
                name="department"
                className="w-full border px-3 py-2 rounded"
              >
                
              </select>
            </div>

            <button
              type="submit"
              className="bg-green-700/90 text-white px-4 py-2 rounded hover:bg-green-700 col-span-2"
            >
              Update Profile
            </button>
          </form>
      </div>

      <div className="mt-8 pt-4 pb-2 border-t text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Haramaya University Inventory Management System
        <h1 className="text-blue-600 underline cursor-pointer hover:font-semibold">Meet the developer Team? </h1>
      </div>
    </div>
  );
};

export default Profile;
