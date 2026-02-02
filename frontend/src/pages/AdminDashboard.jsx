import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";


 const AdminDashboard = ()=>{
    const {user} = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return(
        <div className="flex">
            <AdminSidebar sidebarOpen={sidebarOpen}/>
            <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} bg-gray-100 h-screen transition-all duration-300`}>
                <Navbar toggleSidebar={toggleSidebar}/>
               <Outlet/>
            </div>
        </div>
    )
}
export default AdminDashboard