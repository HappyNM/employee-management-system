import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => { 
    const [departments, setDepartments] =useState([])
    const [formData, setFormData] = useState({})
    const navigate= useNavigate()
    useEffect(()=>{
        const getdepartments = async () => {            
       const departments = await fetchDepartments()
       setDepartments(departments)}
       getdepartments()
    },[])
    
    const handleChange = (e) => {
        const { name, value , files } = e.target;
        if(name === "image"){
            setFormData((prevData) => ({...prevData, [name]: files[0]}));
        } else{
            setFormData((prevData) => ({...prevData, [name]: value}));
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) =>{
            formDataObj.append(key, formData[key]);
        })
        
    try {
      const response = await axios.post('http://localhost:5000/api/employee/add',formDataObj, {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        navigate('/admin-dashboard/employees');
      }
    } catch (error) {
        console.log("Error details:", error);
        console.log("Error response:", error.response);
      if (error.response && error.response.data) {
        alert(error.response.data.error || error.response.data.message || "Failed to add employee");
    } else {
        alert("Failed to add employee. Please try again.");
    }
  }
    }

  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>        
            <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Name */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Name
                        </label>
                        <input type="text" name="name" placeholder='Insert name'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md' onChange={handleChange} required/>
                    </div>
                    {/* email */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Email
                        </label>
                        <input type="email" name="email" placeholder='Insert email'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md' onChange={handleChange} required/>
                    </div>
                    {/* Employee ID */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Employee ID
                        </label>
                        <input type="text" name="employeeId" placeholder='Insert employee ID'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md' onChange={handleChange} required/>
                    </div>
                    {/* DOB */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Date of Birth
                        </label>
                        <input type="date" name="dob" placeholder='Insert date of birth'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md' onChange={handleChange} required/> 
                    </div>
                    {/* Gender */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Gender
                        </label>
                        <select name="gender" onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md'  required>
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    {/* Marital status */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Marital Status
                        </label>
                        <select name="maritalStatus" className='mt-1 p-2 block w-full border border-gray-300 rounded-md' onChange={handleChange} required>
                            <option value="">Select marital status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            
                        </select>
                    </div>
                    {/* Designation */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Designation
                        </label>
                        <input type="text" name="designation" placeholder='Insert designation'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md' onChange={handleChange}required/>
                    </div>
                    {/* Department */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Department
                        </label>
                        <select name="department" className='mt-1 p-2 block w-full border border-gray-300 rounded-md' onChange={handleChange} required>
                            <option value="">Select department</option>
                            {departments && departments.map(dep =>(
                                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                            ))}
                        </select>
                    </div>
                    {/* SALARY */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>
                            Salary
                        </label>
                        <input type="number" name="salary" placeholder='Insert salary'
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md' onChange={handleChange} required/>
                    </div>
                
                {/* password */}
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Password
                    </label>
                    <input type="password" name="password" placeholder='Insert password'
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md' onChange={handleChange}required/>
                </div>
                {/* role */}
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Role
                    </label>
                    <select name="role" className='mt-1 p-2 block w-full border border-gray-300 rounded-md'onChange={handleChange} required>
                        <option value="">Select role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>
                
                {/* Image upload */}
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Image Upload</label>
                    <input type="file" name="image" placeholder="Upload image" accept ="image/*" className='mt-1 p-2 block w-full border border-gray-300 rounded-md' onChange={handleChange}/>
                </div>
            </div>   
            <button type="submit" className="w-full mt-6 bg-teal-700 text-white font-bold py-2 px-4 rounded">
                Submit
            </button>         
        </form>
     </div>
    
  )
}

export default Add