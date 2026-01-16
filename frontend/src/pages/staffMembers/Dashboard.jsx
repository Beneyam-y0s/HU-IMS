import react from "react";
import StaffMember from "./Sidebar.jsx"
import { Outlet } from "react-router";
import Home from "./Home.jsx";


const StaffDashboard = () => {
    return (
        <>
            <div className="flex ">
              
                    <StaffMember />
                    
                
                <div className="flex-1 ml-16 md:ml-64 px-4 bg-gray-100 min-h-screen">
                    <Outlet />
                    
                </div>
            </div>

            
        </>
    )
};

export default StaffDashboard;
