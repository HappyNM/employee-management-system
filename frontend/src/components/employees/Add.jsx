import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Select, Button, Section, Alert } from '../../constants/componentUtils';

const Add = () => { 
    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const [alert, setAlert] = useState(null)
    const navigate = useNavigate()
    
    useEffect(() => {
        const getDepartments = async () => {            
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartments()
    }, [])
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }))
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key]);
        })
        
        try {
            const response = await axios.post('https://employee-server-pink.vercel.app/api/employee/add', formDataObj, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setAlert({ type: 'success', message: 'Employee added successfully!' })
                setTimeout(() => navigate('/admin-dashboard/employees'), 1500);
            }
        } catch (error) {
            console.log("Error details:", error);
            console.log("Error response:", error.response);
            if (error.response && error.response.data) {
                setAlert({
                    type: 'error',
                    message: error.response.data.error || error.response.data.message || "Failed to add employee"
                })
            } else {
                setAlert({ type: 'error', message: "Failed to add employee. Please try again." })
            }
        }
    }

    const departmentOptions = departments.map(dep => ({
        value: dep._id,
        label: dep.dep_name
    }));

    return (
        <div className='p-6 max-w-4xl mx-auto'>        
            <h1 className='text-3xl font-bold mb-6'>Add New Employee</h1>
            
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            
            <Section>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                        <Input
                            label="Name"
                            name="name"
                            placeholder='Enter full name'
                            onChange={handleChange}
                            required
                        />
                        
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            placeholder='Enter email address'
                            onChange={handleChange}
                            required
                        />
                        
                        <Input
                            label="Employee ID"
                            name="employeeId"
                            placeholder='Enter employee ID'
                            onChange={handleChange}
                            required
                        />
                        
                        <Input
                            label="Date of Birth"
                            type="date"
                            name="dob"
                            onChange={handleChange}
                            required
                        />
                        
                        <Select
                            label="Gender"
                            name="gender"
                            options={[
                                { value: '', label: 'Select gender' },
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                                { value: 'other', label: 'Other' }
                            ]}
                            onChange={handleChange}
                            required
                        />
                        
                        <Select
                            label="Marital Status"
                            name="maritalStatus"
                            options={[
                                { value: '', label: 'Select marital status' },
                                { value: 'single', label: 'Single' },
                                { value: 'married', label: 'Married' }
                            ]}
                            onChange={handleChange}
                            required
                        />
                        
                        <Input
                            label="Designation"
                            name="designation"
                            placeholder='Enter designation'
                            onChange={handleChange}
                            required
                        />
                        
                        <Select
                            label="Department"
                            name="department"
                            options={[{ value: '', label: 'Select department' }, ...departmentOptions]}
                            onChange={handleChange}
                            required
                        />
                        
                        <Input
                            label="Salary"
                            type="number"
                            name="salary"
                            placeholder='Enter salary amount'
                            onChange={handleChange}
                            required
                        />
                        
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            placeholder='Enter password'
                            onChange={handleChange}
                            required
                        />
                        
                        <Select
                            label="Role"
                            name="role"
                            options={[
                                { value: '', label: 'Select role' },
                                { value: 'admin', label: 'Admin' },
                                { value: 'employee', label: 'Employee' }
                            ]}
                            onChange={handleChange}
                            required
                        />
                        
                        <Input
                            label="Profile Image"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="flex gap-4">
                        <Button variant="primary" type="submit">
                            Add Employee
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={() => navigate('/admin-dashboard/employees')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Section>
        </div>
    )
}

export default Add
