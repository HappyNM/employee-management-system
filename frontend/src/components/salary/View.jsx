import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaArrowLeft, FaMoneyBillWave } from 'react-icons/fa'

const ViewSalary = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [salaries, setSalaries] = useState([])
    const [employee, setEmployee] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await axios.get(`https://employee-server-pink.vercel.app/api/salary/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data.success) {
                    setSalaries(response.data.salaries)
                    setEmployee(response.data.employee)
                }
            } catch (error) {
                console.error("Error fetching salaries:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchSalaries()
    }, [id])

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 mx-auto mb-4"></div>
                    <div className="text-xl text-gray-600">Loading salary records...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/admin-dashboard/employees')}
                    className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold transition-colors duration-200"
                >
                    <FaArrowLeft />
                    <span>Back to Employees</span>
                </button>

                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <FaMoneyBillWave className="text-2xl text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Salary History</h1>
                                {employee && (
                                    <p className="text-teal-100 mt-1">
                                        {employee.userId?.name} - {employee.employeeId}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Salary Table */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {salaries.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            S No
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Employee ID
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Basic Salary
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Allowance
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Deduction
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Pay Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {salaries.map((salary, index) => (
                                        <tr key={salary._id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {employee?.employeeId}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                KES {salary.basicSalary?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                                                +KES {salary.allowances?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                                                -KES {salary.deductions?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-teal-600">
                                                KES {salary.netSalary?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {new Date(salary.payDate).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="text-6xl mb-4">💰</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No Salary Records Found</h3>
                            <p className="text-gray-600 mb-6">This employee doesn't have any salary records yet.</p>
                            <button
                                onClick={() => navigate('/admin-dashboard/salary/add')}
                                className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
                            >
                                Add Salary Record
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewSalary
