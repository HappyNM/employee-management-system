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
        <div className="flex flex-col md:flex-row">
            <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
            <div className={`flex-1 flex flex-col bg-gray-100 min-h-screen md:ml-0 transition-all duration-300`}>
                <Navbar toggleSidebar={toggleSidebar}/>
               <Outlet/>
            </div>
        </div>
    )
}
export default AdminDashboard