import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from 'react-icons/fa'

const AdminSidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        />
      )}
      
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64 md:w-64 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-50 md:translate-x-0 md:relative md:block overflow-y-auto`}>
      <div className='bg-teal-600 h-12 flex items-center justify-center border-b border-teal-700'>
        <h3 className='text-2xl text-center font-pacific'>Employee MS</h3>
      </div>
      
      <nav className='px-4 py-4'>
        <NavLink 
          to="/admin-dashboard" 
          className={({ isActive }) => `
            flex items-center space-x-4 py-3 px-4 rounded-md transition-all duration-200
            ${isActive ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}
          `} 
          end
        >
          <FaTachometerAlt className='w-5 h-5' />
          <span className='font-medium'>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/admin-dashboard/employees"
          className={({ isActive }) => `
            flex items-center space-x-4 py-3 px-4 rounded-md transition-all duration-200
            ${isActive ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}
          `}
        >
          <FaUsers className='w-5 h-5' />
          <span className='font-medium'>Employees</span>
        </NavLink>

        <NavLink 
          to="/admin-dashboard/departments" 
          className={({ isActive }) => `
            flex items-center space-x-4 py-3 px-4 rounded-md transition-all duration-200
            ${isActive ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}
          `}
        >
          <FaBuilding className='w-5 h-5' />
          <span className='font-medium'>Departments</span>
        </NavLink>

        <NavLink 
          to="/admin-dashboard/leaves"
          className={({ isActive }) => `
            flex items-center space-x-4 py-3 px-4 rounded-md transition-all duration-200
            ${isActive ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}
          `}
        >
          <FaCalendarAlt className='w-5 h-5' />
          <span className='font-medium'>Leaves</span>
        </NavLink>

        <NavLink 
          to="/admin-dashboard/salary/add"
          className={({ isActive }) => `
            flex items-center space-x-4 py-3 px-4 rounded-md transition-all duration-200
            ${isActive ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}
          `}
        >
          <FaMoneyBillWave className='w-5 h-5' />
          <span className='font-medium'>Salary</span>
        </NavLink>

        <NavLink 
          to="/admin-dashboard/settings" 
          className={({ isActive }) => `
            flex items-center space-x-4 py-3 px-4 rounded-md transition-all duration-200
            ${isActive ? 'bg-teal-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}
          `}
        >
          <FaCogs className='w-5 h-5' />
          <span className='font-medium'>Settings</span>
        </NavLink>
      </nav>
      </div>
    </>
  )
}

export default AdminSidebar