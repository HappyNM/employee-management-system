import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/authContext'

const LeaveList = () => {
    const { user } = useAuth()
    const [leaves, setLeaves] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/leave/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data.success) {
                    setLeaves(response.data.leaves)
                }
            } catch (error) {
                console.error("Error fetching leaves:", error)
            } finally {
                setLoading(false)
            }
        }
        if (user?._id) {
            fetchLeaves()
        }
    }, [user])

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-700',
            approved: 'bg-green-100 text-green-700',
            rejected: 'bg-red-100 text-red-700'
        }
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
                {status}
            </span>
        )
    }

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-teal-600 mx-auto mb-4"></div>
                    <div className="text-lg text-gray-600">Loading leaves...</div>
                </div>
            </div>
        )
    }

    return (
        <div className='p-6'>
            <div className='text-center mb-6'>
                <h3 className='text-2xl font-bold'>My Leave Requests</h3>
            </div>
            <div className='flex justify-between items-center mb-4'>
                <input type="text" placeholder='Search leaves...' className='px-4 py-2 border rounded-md' />
                <Link to="/employee-dashboard/add-leave" className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                    Request New Leave
                </Link>
            </div>

            <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
                {leaves.length > 0 ? (
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='bg-gray-50 border-b border-gray-200'>
                                <tr>
                                    <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>S No</th>
                                    <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>Leave Type</th>
                                    <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>From</th>
                                    <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>To</th>
                                    <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>Description</th>
                                    <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>Applied Date</th>
                                    <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>Status</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                                {leaves.map((leave, index) => (
                                    <tr key={leave._id} className='hover:bg-gray-50 transition-colors duration-150'>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                            {index + 1}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize'>
                                            {leave.leaveType}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                                            {new Date(leave.startDate).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                                            {new Date(leave.endDate).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className='px-6 py-4 text-sm text-gray-700 max-w-xs truncate'>
                                            {leave.reason}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                                            {new Date(leave.createdAt).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            {getStatusBadge(leave.status)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='p-12 text-center'>
                        <div className='text-6xl mb-4'>📋</div>
                        <h3 className='text-xl font-bold text-gray-800 mb-2'>No Leave Requests</h3>
                        <p className='text-gray-600 mb-6'>You haven't requested any leaves yet.</p>
                        <Link
                            to="/employee-dashboard/add-leave"
                            className='bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 inline-block'
                        >
                            Request Your First Leave
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LeaveList