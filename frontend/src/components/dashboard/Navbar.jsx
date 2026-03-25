import React from 'react'
import { useAuth } from '../../context/authContext'
import { FaBars, FaSignOutAlt } from 'react-icons/fa'
import { Button } from '../../constants/componentUtils'

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth()
  
  return (
    <div className='flex items-center justify-between h-12 bg-teal-600 text-white px-6 shadow-md'>
      <div className='flex items-center gap-4'>
        <button 
          className='text-xl focus:outline-none hover:bg-teal-700 p-2 rounded transition-colors duration-200' 
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <p className='font-medium'>Welcome, {user?.Name || 'User'}</p>
      </div>
      
      <button 
        onClick={logout}
        className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium transition-colors duration-200'
        aria-label="Logout"
      >
        <FaSignOutAlt className='w-4 h-4' />
        <span>Logout</span>
      </button>
    </div>
  )
}

export default Navbar