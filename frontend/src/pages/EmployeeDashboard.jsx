import React, { useState } from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import Navbar from '../components/dashboard/Navbar'



const EmployeeDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen)
  }
  
  return (
    <div className="flex">
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
            <div className="flex-1 flex flex-col bg-gray-100 min-h-screen transition-all duration-300">
                <Navbar toggleSidebar={toggleSidebar}/>
               <Outlet/>
            </div>
        </div>
  )
}

export default EmployeeDashboard