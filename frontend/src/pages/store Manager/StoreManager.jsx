import React from 'react'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router'

function StoreManager() {
  return (
    <div>
        
        <div className="flex-1 ml-16 md:ml-64 bg-gray-100 min-h-screen">
        <Outlet />
                            
        </div>
    </div>
  )
}

export default StoreManager
