import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaMoneyBillWave } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const Salary = () => {
    const { user } = useAuth()
    const [salaries, setSalaries] = useState([])
    const [employee, setEmployee] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/salary/user/${user._id}`, {
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
        if (user?._id) {
            fetchSalaries()
        }
    }, [user])

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-teal-600 mx-auto mb-4"></div>
                    <div className="text-lg text-gray-600">Loading salary records...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl shadow-xl p-6 mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <FaMoneyBillWave className="text-2xl text-white" />
                    </div>
                    <div className="text-white">
                        <h1 className="text-2xl font-bold">My Salary History</h1>
                        {employee && (
                            <p className="text-teal-100 mt-1">
                                {employee.userId?.name} - {employee.employeeId}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Salary Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {salaries.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                        S No
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
                                        Net Salary
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
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Salary Records</h3>
                        <p className="text-gray-600">You don't have any salary records yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Salary
