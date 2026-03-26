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
                    axios.get(`https://employee-server-pink.vercel.app/api/leave/${user._id}`, { headers }),
                    axios.get(`https://employee-server-pink.vercel.app/api/salary/user/${user._id}`, { headers })
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
        <div className='p-4 sm:p-6'>
            {/* Welcome Card */}
            <div className='bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl shadow-xl p-4 sm:p-8 mb-6'>
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6'>
                    <div className='w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-sm'>
                        <FaUser className='text-2xl sm:text-4xl text-white'/>
                    </div>
                    <div className='text-white flex-1'>
                        <p className='text-xs sm:text-lg text-teal-100'>Welcome back,</p>
                        <h1 className='text-xl sm:text-3xl font-bold'>{user.name}</h1>
                        <div className='flex items-center gap-2 mt-2 text-xs sm:text-sm text-teal-100'>
                            <FaCalendarAlt className='text-xs sm:text-base'/>
                            <span>{currentDate}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6'>
                {/* Profile Card */}
                <div className='bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                    <div className='flex items-start gap-3 sm:gap-4 mb-4'>
                        <div className='w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                            <FaUser className='text-lg sm:text-xl text-blue-600'/>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <p className='text-xs sm:text-sm text-gray-500'>Your Profile</p>
                            <p className='font-bold text-xs sm:text-base text-gray-800 truncate'>{user.name}</p>
                        </div>
                    </div>
                    <div className='pt-4 border-t border-gray-100'>
                        <button onClick={() => navigate(`/employee-dashboard/profile/${user._id}`)} className='text-blue-600 font-semibold text-xs sm:text-sm hover:text-blue-700 transition-colors'>
                            View Profile →
                        </button>
                    </div>
                </div>

                {/* Role Card */}
                <div className='bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                    <div className='flex items-start gap-3 sm:gap-4 mb-4'>
                        <div className='w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                            <FaBriefcase className='text-lg sm:text-xl text-purple-600'/>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <p className='text-xs sm:text-sm text-gray-500'>Your Role</p>
                            <p className='font-bold text-xs sm:text-base text-gray-800 capitalize truncate'>{user.role}</p>
                        </div>
                    </div>
                    <div className='pt-4 border-t border-gray-100'>
                        <span className='inline-block px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold'>
                            Active
                        </span>
                    </div>
                </div>

                {/* Email Card */}
                <div className='bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300'>
                    <div className='flex items-start gap-3 sm:gap-4 mb-4'>
                        <div className='w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0'>
                            <FaEnvelope className='text-lg sm:text-xl text-green-600'/>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <p className='text-xs sm:text-sm text-gray-500'>Email</p>
                            <p className='font-bold text-xs sm:text-base text-gray-800 truncate'>{user.email || 'Not provided'}</p>
                        </div>
                    </div>
                    <div className='pt-4 border-t border-gray-100'>
                        <span className='inline-block px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold'>
                            Verified
                        </span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className='mt-6 bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100'>
                <h2 className='text-base sm:text-lg font-bold text-gray-800 mb-4'>Quick Actions</h2>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4'>
                    <button onClick={() => navigate('/employee-dashboard/leaves')} className='p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-teal-50 hover:border-teal-200 border-2 border-transparent transition-all duration-200 text-center'>
                        <div className='text-lg sm:text-2xl mb-1 sm:mb-2'>📋</div>
                        <span className='text-xs sm:text-sm font-semibold text-gray-700'>My Leaves</span>
                    </button>
                    <button onClick={() => navigate('/employee-dashboard/salary')} className='p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-teal-50 hover:border-teal-200 border-2 border-transparent transition-all duration-200 text-center'>
                        <div className='text-lg sm:text-2xl mb-1 sm:mb-2'>💰</div>
                        <span className='text-xs sm:text-sm font-semibold text-gray-700'>My Salary</span>
                    </button>
                    <button onClick={() => navigate('/employee-dashboard/settings')} className='p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-teal-50 hover:border-teal-200 border-2 border-transparent transition-all duration-200 text-center'>
                        <div className='text-lg sm:text-2xl mb-1 sm:mb-2'>⚙️</div>
                        <span className='text-xs sm:text-sm font-semibold text-gray-700'>Settings</span>
                    </button>
                    <button onClick={() => navigate('/employee-dashboard/add-leave')} className='p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-teal-50 hover:border-teal-200 border-2 border-transparent transition-all duration-200 text-center'>
                        <div className='text-lg sm:text-2xl mb-1 sm:mb-2'>❓</div>
                        <span className='text-xs sm:text-sm font-semibold text-gray-700'>Apply Leave</span>
                    </button>
                </div>
                <div className='mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4'>
                    <div className='bg-gray-50 rounded-xl p-3 sm:p-4 border'>
                        <p className='text-xs sm:text-sm text-gray-500'>Pending Leaves</p>
                        <p className='text-xl sm:text-2xl font-bold'>{pendingLeaves}</p>
                    </div>
                    <div className='bg-gray-50 rounded-xl p-3 sm:p-4 border'>
                        <p className='text-xs sm:text-sm text-gray-500'>Approved Leaves</p>
                        <p className='text-xl sm:text-2xl font-bold'>{approvedLeaves}</p>
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
