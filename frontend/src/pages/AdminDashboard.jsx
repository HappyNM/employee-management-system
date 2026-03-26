import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";


 const AdminDashboard = ()=>{
    const {user} = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return(
        <div className="flex">
            <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
            <div className="flex-1 flex flex-col bg-gray-100 min-h-screen transition-all duration-300">
                <Navbar toggleSidebar={toggleSidebar}/>
               <Outlet/>
            </div>
        </div>
    )
}
export default AdminDashboard