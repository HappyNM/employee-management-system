import React from 'react'
import { useAuth } from '../../context/authContext'
import { FaBars } from 'react-icons/fa'

const Navbar = ({toggleSidebar}) => {
    const {user, logout}= useAuth()
  return (
    <div className='flex items-center text-white justify-between h-12 bg-teal-600 px-5'>
        <div className='flex items-center'>
            <button className='mr-4 text-xl focus:outline-none' onClick={toggleSidebar}>
                <FaBars />
            </button>
            <p>Welcome {user.Name}</p>
        </div>
        <button className='px-4 py-1 bg-teal-700 hover:bg-teal-800' onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar