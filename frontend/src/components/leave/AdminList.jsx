import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdminLeaveList = () => {
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)

  const fetchLeaves = async () => {
    try {
      setLoading(true)
      const res = await axios.get('https://employee-server-pink.vercel.app/api/leave', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (res.data.success) {
        setLeaves(res.data.leaves)
      }
    } catch (error) {
      console.error('Failed to fetch leaves', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaves()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id)
      const res = await axios.patch(`https://employee-server-pink.vercel.app/api/leave/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (res.data.success) {
        setLeaves((prev) => prev.map(l => l._id === id ? { ...l, status } : l))
      }
    } catch (error) {
      console.error('Failed to update status', error)
    } finally {
      setUpdatingId(null)
    }
  }

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
          <div className="text-lg text-gray-600">Loading leave applications...</div>
        </div>
      </div>
    )
  }

  return (
    <div className='p-6'>
      <div className='text-center mb-6'>
        <h3 className='text-2xl font-bold'>Leave Applications</h3>
      </div>

      <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
        {leaves.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>S No</th>
                  <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>Employee</th>
                  <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>Leave Type</th>
                  <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>From</th>
                  <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>To</th>
                  <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>Reason</th>
                  <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>Applied</th>
                  <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>Status</th>
                  <th className='px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {leaves.map((leave, index) => (
                  <tr key={leave._id} className='hover:bg-gray-50 transition-colors duration-150'>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      {index + 1}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                      {leave?.employeeId?.userId?.name || '—'}
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
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {leave.status === 'pending' ? (
                        <div className='flex gap-2'>
                          <button
                            onClick={() => updateStatus(leave._id, 'approved')}
                            disabled={updatingId === leave._id}
                            className={`px-3 py-1 rounded text-white ${updatingId === leave._id ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(leave._id, 'rejected')}
                            disabled={updatingId === leave._id}
                            className={`px-3 py-1 rounded text-white ${updatingId === leave._id ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'}`}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className='text-sm text-gray-500'>No actions</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='p-12 text-center'>
            <div className='text-6xl mb-4'>📋</div>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>No Leave Applications</h3>
            <p className='text-gray-600 mb-6'>Employees have not requested any leave yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminLeaveList

