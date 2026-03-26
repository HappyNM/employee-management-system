import React, { useEffect, useMemo, useState } from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'
import axios from 'axios'
import { LoadingSpinner } from '../../constants/componentUtils'

const AdminSummary = () => {
  const [counts, setCounts] = useState({ employees: 0, departments: 0, salaryTotal: 0 })
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }
    const fetchAll = async () => {
      try {
        const [empRes, depRes, leaveRes, salRes] = await Promise.all([
          axios.get('https://employee-server-pink.vercel.app/api/employee', { headers }),
          axios.get('https://employee-server-pink.vercel.app/api/department', { headers }),
          axios.get('https://employee-server-pink.vercel.app/api/leave', { headers }),
          axios.get('https://employee-server-pink.vercel.app/api/salary/summary/current', { headers })
        ])
        const employees = empRes.data?.employees || []
        const departments = depRes.data?.departments || []
        const allLeaves = leaveRes.data?.leaves || []
        const salaryTotal = salRes.data?.total || 0
        setCounts({ employees: employees.length, departments: departments.length, salaryTotal })
        setLeaves(allLeaves)
      } catch (e) {
        setCounts((c) => c)
        setLeaves([])
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const leaveStats = useMemo(() => {
    const total = leaves.length
    const approved = leaves.filter(l => l.status === 'approved').length
    const pending = leaves.filter(l => l.status === 'pending').length
    const rejected = leaves.filter(l => l.status === 'rejected').length
    return { total, approved, pending, rejected }
  }, [leaves])

  return (
    <div className='p-4 sm:p-6'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-2'>Dashboard Overview</h1>
      <p className='text-xs sm:text-base text-gray-600 mb-6'>Summary of your key metrics</p>
      
      {loading ? (
        <LoadingSpinner className="py-12" />
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12'>
            <SummaryCard icon={<FaUsers />} text="Total Employees" number={counts.employees} color="bg-teal-600" />
            <SummaryCard icon={<FaBuilding />} text="Total Departments" number={counts.departments} color="bg-yellow-600" />
            <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number={counts.salaryTotal} color="bg-red-600" />
          </div>

          <div className='mt-8 sm:mt-12'>
            <h2 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-6'>Leave Details</h2>
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6'>
              <SummaryCard icon={<FaFileAlt />} text="Total Leaves" number={leaveStats.total} color="bg-teal-600" />
              <SummaryCard icon={<FaCheckCircle />} text="Approved" number={leaveStats.approved} color="bg-green-600" />
              <SummaryCard icon={<FaHourglassHalf />} text="Pending" number={leaveStats.pending} color="bg-orange-600" />
              <SummaryCard icon={<FaTimesCircle />} text="Rejected" number={leaveStats.rejected} color="bg-red-600" />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminSummary
