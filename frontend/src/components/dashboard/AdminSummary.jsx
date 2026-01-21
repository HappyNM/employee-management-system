import React, { useEffect, useMemo, useState } from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'
import axios from 'axios'

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
          axios.get('http://localhost:5000/api/employee', { headers }),
          axios.get('http://localhost:5000/api/department', { headers }),
          axios.get('http://localhost:5000/api/leave', { headers }),
          axios.get('http://localhost:5000/api/salary/summary/current', { headers })
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
    <div className='p-6'>
      <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={counts.employees} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={counts.departments} color="bg-yellow-600" />
        <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number={counts.salaryTotal} color="bg-red-600" />
      </div>

      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <SummaryCard icon={<FaFileAlt />} text="Total Leaves" number={leaveStats.total} color="bg-teal-600" />
          <SummaryCard icon={<FaCheckCircle />} text="Approved Leaves" number={leaveStats.approved} color="bg-green-600" />
          <SummaryCard icon={<FaHourglassHalf />} text="Pending Leaves" number={leaveStats.pending} color="bg-orange-600" />
          <SummaryCard icon={<FaTimesCircle />} text="Rejected Leaves" number={leaveStats.rejected} color="bg-red-600" />
        </div>
      </div>
      {loading && (
        <div className='mt-4 text-sm text-gray-500'>Loading latest stats…</div>
      )}
    </div>
  )
}

export default AdminSummary