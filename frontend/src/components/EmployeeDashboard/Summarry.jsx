import React, { useEffect, useMemo, useState } from 'react'
import { FaUser, FaCalendarAlt, FaBriefcase, FaEnvelope } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Summarry = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [leaves, setLeaves] = useState([])
    const [salary, setSalary] = useState(null)
    const [loading, setLoading] = useState(true)
    const currentDate = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    useEffect(() => {
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }
        const fetchData = async () => {
            try {
                if (!user?._id) return
                const [leaveRes, salaryRes] = await Promise.all([
                    axios.get(`http://localhost:5000/api/leave/${user._id}`, { headers }),
                    axios.get(`http://localhost:5000/api/salary/user/${user._id}`, { headers })
                ])
                setLeaves(leaveRes.data?.leaves || [])
                const salaries = salaryRes.data?.salaries || []
                setSalary(salaries[0] || null) // most recent by backend sort
            } catch (e) {
                setLeaves([])
                setSalary(null)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [user])

    const pendingLeaves = useMemo(() => leaves.filter(l => l.status === 'pending').length, [leaves])
    const approvedLeaves = useMemo(() => leaves.filter(l => l.status === 'approved').length, [leaves])

    return (
        <div className='p-6'>
            {/* Welcome Card */}
            <div className='bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl shadow-xl p-8 mb-6'>
                <div className='flex items-center gap-6'>
                    <div className='w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm'>
                        <FaUser className='text-4xl text-white'/>
                    </div>
                    <div className='text-white'>
                        <p className='text-teal-100 text-lg'>Welcome back,</p>
                        <h1 className='text-3xl font-bold'>{user.name}</h1>
                        <div className='flex items-center gap-2 mt-2 text-teal-100'>
                            <FaCalendarAlt className='text-sm'/>
                            <span className='text-sm'>{currentDate}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* Profile Card */}
                <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                    <div className='flex items-center gap-4 mb-4'>
                        <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center'>
                            <FaUser className='text-xl text-blue-600'/>
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Your Profile</p>
                            <p className='font-bold text-gray-800'>{user.name}</p>
                        </div>
                    </div>
                    <div className='pt-4 border-t border-gray-100'>
                        <button onClick={() => navigate(`/employee-dashboard/profile/${user._id}`)} className='text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors'>
                            View Profile →
                        </button>
                    </div>
                </div>

                {/* Role Card */}
                <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                    <div className='flex items-center gap-4 mb-4'>
                        <div className='w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center'>
                            <FaBriefcase className='text-xl text-purple-600'/>
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Your Role</p>
                            <p className='font-bold text-gray-800 capitalize'>{user.role}</p>
                        </div>
                    </div>
                    <div className='pt-4 border-t border-gray-100'>
                        <span className='inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold'>
                            Active
                        </span>
                    </div>
                </div>

                {/* Email Card */}
                <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                    <div className='flex items-center gap-4 mb-4'>
                        <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center'>
                            <FaEnvelope className='text-xl text-green-600'/>
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Email</p>
                            <p className='font-bold text-gray-800 text-sm truncate'>{user.email || 'Not provided'}</p>
                        </div>
                    </div>
                    <div className='pt-4 border-t border-gray-100'>
                        <span className='inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold'>
                            Verified
                        </span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className='mt-6 bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
                <h2 className='text-lg font-bold text-gray-800 mb-4'>Quick Actions</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <button onClick={() => navigate('/employee-dashboard/leaves')} className='p-4 bg-gray-50 rounded-xl hover:bg-teal-50 hover:border-teal-200 border-2 border-transparent transition-all duration-200 text-center'>
                        <div className='text-2xl mb-2'>📋</div>
                        <span className='text-sm font-semibold text-gray-700'>My Leaves</span>
                    </button>
                    <button onClick={() => navigate('/employee-dashboard/salary')} className='p-4 bg-gray-50 rounded-xl hover:bg-teal-50 hover:border-teal-200 border-2 border-transparent transition-all duration-200 text-center'>
                        <div className='text-2xl mb-2'>💰</div>
                        <span className='text-sm font-semibold text-gray-700'>My Salary</span>
                    </button>
                    <button onClick={() => navigate('/employee-dashboard/settings')} className='p-4 bg-gray-50 rounded-xl hover:bg-teal-50 hover:border-teal-200 border-2 border-transparent transition-all duration-200 text-center'>
                        <div className='text-2xl mb-2'>⚙️</div>
                        <span className='text-sm font-semibold text-gray-700'>Settings</span>
                    </button>
                    <button onClick={() => navigate('/employee-dashboard/add-leave')} className='p-4 bg-gray-50 rounded-xl hover:bg-teal-50 hover:border-teal-200 border-2 border-transparent transition-all duration-200 text-center'>
                        <div className='text-2xl mb-2'>❓</div>
                        <span className='text-sm font-semibold text-gray-700'>Apply Leave</span>
                    </button>
                </div>
                <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='bg-gray-50 rounded-xl p-4 border'>
                        <p className='text-sm text-gray-500'>Pending Leaves</p>
                        <p className='text-2xl font-bold'>{pendingLeaves}</p>
                    </div>
                    <div className='bg-gray-50 rounded-xl p-4 border'>
                        <p className='text-sm text-gray-500'>Approved Leaves</p>
                        <p className='text-2xl font-bold'>{approvedLeaves}</p>
                    </div>
                    <div className='bg-gray-50 rounded-xl p-4 border'>
                        <p className='text-sm text-gray-500'>Last Net Salary</p>
                        <p className='text-2xl font-bold'>{salary?.netSalary ?? 0}</p>
                    </div>
                </div>
                {loading && <div className='text-sm text-gray-500 mt-2'>Loading your data…</div>}
            </div>
        </div>
    )
}

export default Summarry