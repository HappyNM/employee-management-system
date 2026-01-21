import React, { useState } from 'react'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddLeave = () => {
    const {user}= useAuth()
    const [leave, setLeave] = useState({
        userId: user._id,
    })
    const navigate= useNavigate()
    
    const handleChange = (e) => {
        const {name, value}= e.target
        setLeave((prevLeave) => ({...prevLeave, [name]: value}))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        
            try {
                const response = await axios.post(`http://localhost:5000/api/leave/add`, leave, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(response.data.success) {
                    navigate('/employee-dashboard/leaves')
                }
            } catch (error) {
                console.error("Error requesting leave:", error)
            }
    }
        
  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Request for Leaves</h2>
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
                {/* Leave Type - Full Row */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Leave Type
                    </label>
                    <select name="leaveType" onChange={handleChange} required
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'>
                        <option value="">Select leave type</option>
                        <option value="sick">Sick Leave</option>
                        <option value="casual">Casual Leave</option>
                        <option value="annual">Annual Leave</option>
                    </select>
                </div>

                {/* Dates - Shared Row */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            From Date
                        </label>
                        <input type="date" name="startDate" onChange={handleChange} required
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md' />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            To Date
                        </label>
                        <input type="date" name="endDate" onChange={handleChange} required
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md' />
                    </div>
                </div>

                {/* Description - Full Row */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Description
                    </label>
                    <textarea name="reason" onChange={handleChange} required rows="4" placeholder="Enter reason for leave..."
                    className='w-full p-2 border border-gray-300 rounded-md' />
                </div>

                {/* Submit Button - Full Row */}
                <div>
                    <button type="submit" className='w-full mt-2 bg-teal-600 text-white font-semibold px-4 py-3 rounded-md hover:bg-teal-700 transition-colors'>
                        Submit Leave Request
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default AddLeave