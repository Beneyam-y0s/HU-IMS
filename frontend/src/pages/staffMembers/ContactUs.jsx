import React from "react";
import { useAuth } from "../../../context/authContext.jsx";
import {
    FaCalendarCheck,
    FaRing,
    FaArrowDown,
} from "react-icons/fa";
const ContactUs = () => {
    const { user } = useAuth();
  return (
    <div className=" px-2">
        <div className="flex justify-between items-center mb-12 mt-6">
            <div>
            <h1 className="text-xl font-bold">Contact Us</h1>
            <p className="text-sm text-gray-600">
                <span className="text-green-600 font-semibold">Monday</span> · 02 March 2025
            </p>
            </div>

            <div className="flex items-center gap-6">
            <FaCalendarCheck className="text-xl text-gray-600 cursor-pointer" />
            <FaRing className="text-xl text-gray-600 cursor-pointer" />

            <div className="flex items-center gap-2 cursor-pointer">
                <span className="bg-emerald-700 text-white px-3 py-1 rounded-lg font-bold">
                BY
                </span>
                <span className="font-medium">Beneyam Yohannes</span>
                <FaArrowDown className="text-gray-600" />
            </div>
            </div>
                    </div>
      <div className=" bg-green-200 rounded-xl p-2">
        <p className="text-neutral-700 font-semibold text-xl px-2">
          Get in touch with the HU Inventory System team
        </p>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 shadow-lg  w-[90%] items-center my-5 border border-gray-200 rounded-xl gap-4">
        {/* Contact Info */}
        <div className=" flex flex-col gap-1 justify-center bg-green-200 text-black h-full item-center  p-6 ">
          <p className="mb-5">
            If you have questions, technical issues, or suggestions related to
            the Inventory Management System, feel free to reach out.
          </p>

          <div>
            
            <p><span className="font-semibold"> Address: </span>Haramaya University, Dire Dawa, Ethiopia</p>
          </div>

          <div>
            
            <p><span className="font-semibold"> Email: </span>ims-support@haramaya.edu.et</p>
          </div>

          <div>
            
            <p><span className="font-semibold"> Phone: </span>+251 25 553 0000</p>
          </div>

          <div>
            
            <p><span className="font-semibold">Working Hours: </span>Monday – Friday, 8:00 AM – 5:00 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4 px-6 py-3">
          <div>
            <label className="text-sm text-gray-500">Your Name</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your name"
              value={user?.name || ""}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              value={user.email}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Message</label>
            <textarea
              rows="4"
              className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Write your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
