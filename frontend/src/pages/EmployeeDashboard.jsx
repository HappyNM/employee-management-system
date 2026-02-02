import React, { useState } from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import Navbar from '../components/dashboard/Navbar'



const EmployeeDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen)
  }
  
  return (
    <div className="flex">
            <Sidebar sidebarOpen={sidebarOpen}/>
            <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} bg-gray-100 h-screen transition-all duration-300`}>
                <Navbar toggleSidebar={toggleSidebar}/>
               <Outlet/>
            </div>
        </div>
  )
}

export default EmployeeDashboard