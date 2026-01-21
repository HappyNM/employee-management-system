import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaUserEdit } from 'react-icons/fa'
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper.jsx';

const AddSalary = () => {
    const navigate = useNavigate()
    const [departments, setDepartments] = useState([])
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [formState, setFormState] = useState({
        employeeId: '',
        basicSalary: '',
        allowances: '',
        deductions: '',
        payDate: ''
    })


    useEffect(() => {
        const initialise = async () => {
            try {
                const departmentList = await fetchDepartments()

                if (Array.isArray(departmentList)) {
                    setDepartments(departmentList)
                }
            } catch (error) {
                console.error('Error initialising salary form:', error)
            } finally {
                setLoading(false)
            }
        }

        initialise()
    }, [])
    const handleDepartment = async (e) => {
        const emps= await getEmployees(e.target.value)
        setEmployees(emps)
        // Reset employee selection and basicSalary when department changes
        setFormState((prev) => ({ ...prev, employeeId: '', basicSalary: '' }))
    }
    
    const handleEmployeeChange = (e) => {
        const selectedEmpId = e.target.value
        const selectedEmployee = employees.find(emp => emp._id === selectedEmpId)
        setFormState((prev) => ({ 
            ...prev, 
            employeeId: selectedEmpId,
            basicSalary: selectedEmployee ? selectedEmployee.salary : ''
        }))
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormState((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:5000/api/salary/add`, formState, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            if (response.data.success) {
                navigate('/admin-dashboard/employees')
            }
        } catch (error) {
            console.error('Error updating salary:', error)
        }
    }

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Preparing employee details...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                            <FaUserEdit className="text-2xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">Add Salary</h2>
                    </div>
                    <p className="text-gray-600 ml-16">Update the salary information for this team member.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div >
                                <label htmlFor="department" className="block text-sm font-semibold text-gray-700">
                                    Department <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="department"
                                    name="department"
                                    value={formState.department}
                                    onChange={handleDepartment}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 hover:border-gray-400"
                                >
                                    <option value="">Select department</option>
                                    {departments && departments.map((department) => (
                                        <option key={department._id} value={department._id}>
                                            {department.dep_name}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-sm text-gray-500">Choose the team this employee belongs to.</p>
                            </div>
                            {/* employee */}
                            <div className="space-y-2 md:col-span-2">
                                <label htmlFor="employee" className="block text-sm font-semibold text-gray-700">
                                    Employee <span className="text-red-500">*</span>
                                </label>
                                <select
                                    
                                    name="employeeId"
                                    value={formState.employeeId}
                                    onChange={handleEmployeeChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 hover:border-gray-400"
                                >
                                    <option value="">Select employee</option>
                                    {employees && employees.map((emp) => (
                                        <option key={emp._id} value={emp._id}>
                                            {emp.employeeId} - {emp.userId.name}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-sm text-gray-500">Select an employee to auto-fill their base salary.</p>
                            </div>
                            

                            <div className="space-y-2">
                                <label htmlFor="basicSalary" className="block text-sm font-semibold text-gray-700">
                                    Basic Salary <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="basicSalary"
                                    name="basicSalary"
                                    value={formState.basicSalary}
                                    onChange={handleChange}
                                    placeholder="Enter basic salary"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 hover:border-gray-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="allowances" className="block text-sm font-semibold text-gray-700">
                                    Allowances <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="allowances"
                                    name="allowances"
                                    min="0"
                                    value={formState.allowances}
                                    onChange={handleChange}
                                    placeholder="Enter allowances"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 hover:border-gray-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="deductions" className="block text-sm font-semibold text-gray-700">
                                    Deductions <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="deductions"
                                    name="deductions"
                                    min="0"
                                    value={formState.deductions}
                                    onChange={handleChange}
                                    placeholder="Enter salary "
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 hover:border-gray-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="payDate" className="block text-sm font-semibold text-gray-700">
                                    Pay Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="payDate"
                                    name="payDate"
                                    min="0"
                                    value={formState.payDate}
                                    onChange={handleChange}
                                    placeholder="Enter paydate"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 hover:border-gray-400"
                                />
                            </div>

                            
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Add Salary
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/admin-dashboard/employees')}
                                className="px-6 py-4 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddSalary