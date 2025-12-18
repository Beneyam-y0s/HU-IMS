import React from 'react'
import BittomImg from "../../assets/An Inventory Management System that is more….jpeg";
import {
  FaHome,
  FaPlus,
  FaShare,
  FaShower,
  FaLayerGroup,
  FaServicestack,
  FaCalendarCheck,
  FaRing,
  FaArrowDown,
  FaEdit,
  FaRemoveFormat,
  FaCog
} from "react-icons/fa";
function Home() {
  return (
    <div className='px-2'>
      <div className="flex justify-between items-center mb-12 mt-6">
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-600">
              <span className="text-green-600 font-semibold">Monday</span> · 02 March 2025
            </p>
          </div>

          <div className="flex items-center gap-6">
            <FaCalendarCheck className="text-xl text-gray-600 cursor-pointer" />
            <FaRing className="text-xl text-gray-600 cursor-pointer" />

            <div className="flex items-center gap-2 cursor-pointer">
              <span className="bg-green-600 text-white px-3 py-1 rounded-lg font-bold">
                BY
              </span>
              <span className="font-medium">Beneyam Yohannes</span>
              <FaArrowDown className="text-gray-600" />
            </div>
          </div>
        </div>


      

        <div className="bg-green-200/90 rounded-xl px-12 py-4 flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold">Hi, Beneyam 👋</h2>
            <p className="text-gray-700">
              Welcome back to HU Inventory System
            </p>
          </div>
          <img src={BittomImg} alt="welcome" className="w-30" />
        </div>

        {/* Overview */}
        <section>
          <h3 className="font-bold text-lg mb-3">Overview</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-amber-400 p-4 rounded-lg shadow">
              <h4 className="text-white text-sm">Production Rate</h4>
              <p className="text-2xl font-bold text-white">83%</p>
            </div>
            <div className="bg-pink-700 p-4 rounded-lg shadow">
              <h4 className="text-white text-sm">Complete</h4>
              <p className="text-2xl font-bold text-white">77%</p>
            </div>
            <div className="bg-blue-900 p-4 rounded-lg shadow">
              <h4 className="text-white text-sm">Unique Views</h4>
              <p className="text-2xl font-bold text-white">91</p>
            </div>
            <div className="bg-green-400 p-4 rounded-lg shadow">
              <h4 className="text-white text-sm">Total Views</h4>
              <p className="text-2xl font-bold text-white">193</p>
            </div>
          </div>
        </section>


        <section>
            <h1 className="mt-10 font-bold text-xl">Compain History</h1>
            <div className="flex justify-between align-center items-center gap-4 bg-gray-100 p-4 rounded shadow cursor-pointer mt-3">
                <div className="flex justify-center  gap-2">
                    <img src={BittomImg} alt="" className="w-25"/>
                    <div className="w-150 flex flex-col justify-between px-2 gap-2">
                        <h1 className="text-green-600 font-bold text-lg">CCI lab Smart Screen Power Shortage</h1>
                        <p className="text-neutral-600">harum adipisci temporibus quidem? Alias reprehenderit repellendus sed nostrum vero quae laborum minima ipsum tenetur!</p>
                        <h1 className="text-neutral-950 font-bold ">10 slide</h1>
                    </div>
                </div>
                
                <div className="flex gap-3 justify-end align-end items-end bg-white p-2 px-4 rounded-2xl">
                    <span className="hover:text-amber-600"><FaEdit/></span>
                    <hr className="border border-green-600 h-5" />
                    <span className="hover:text-amber-600"><FaRemoveFormat /></span>
                </div>
            </div>
            <div className="flex justify-between align-center items-center gap-4 bg-gray-100 p-4 rounded shadow cursor-pointer mt-8">
                <div className="flex justify-center  gap-2">
                    <img src={BittomImg} alt="" className="w-25"/>
                    <div className="w-150 flex flex-col justify-between px-2 gap-2">
                        <h1 className="text-green-600 font-bold text-lg">CCI lab Smart Screen Power Shortage</h1>
                        <p className="text-neutral-600">harum adipisci temporibus quidem? Alias reprehenderit repellendus sed nostrum vero quae laborum minima ipsum tenetur!</p>
                        <h1 className="text-neutral-950 font-bold ">10 slide</h1>
                    </div>
                </div>
                
                <div className="flex gap-3 justify-end align-end items-end bg-white p-2 px-4 rounded-2xl">
                    <span className="hover:text-amber-600"><FaEdit/></span>
                    <hr className="border border-green-600 h-5" />
                    <span className="hover:text-amber-600"><FaRemoveFormat /></span>
                </div>
            </div>
            <div className="flex justify-between align-center items-center gap-4 bg-gray-100 p-4 rounded shadow cursor-pointer mt-8">
                <div className="flex justify-center  gap-2">
                    <img src={BittomImg} alt="" className="w-25"/>
                    <div className="w-150 flex flex-col justify-between px-2 gap-2">
                        <h1 className="text-green-600 font-bold text-lg">CCI lab Smart Screen Power Shortage</h1>
                        <p className="text-neutral-600">harum adipisci temporibus quidem? Alias reprehenderit repellendus sed nostrum vero quae laborum minima ipsum tenetur!</p>
                        <h1 className="text-neutral-950 font-bold ">10 slide</h1>
                    </div>
                </div>
                
                <div className="flex gap-3 justify-end align-end items-end bg-white p-2 px-4 rounded-2xl">
                    <span className="hover:text-amber-600"><FaEdit/></span>
                    <hr className="border border-green-600 h-5" />
                    <span className="hover:text-amber-600"><FaRemoveFormat /></span>
                </div>
            </div>
        </section>
        
        
     

      

    </div>
  )
}

export default Home;
