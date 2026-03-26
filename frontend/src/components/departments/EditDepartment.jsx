import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
  const {id} = useParams();
  const [department, setDepartment] = useState({});
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return; // Don't fetch if id is undefined
    
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`https://employee-server-pink.vercel.app/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }finally {
        setDepLoading(false);
      }
    };
    fetchDepartments();
  
  }, [id])

    const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({...department, [name]: value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit updated department data
    try {
      const response = await axios.put(`https://employee-server-pink.vercel.app/api/department/${id}`, department, {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        // Handle successful update (e.g., navigate back to department list)
        navigate('/admin-dashboard/departments');
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }
  return (
    <>{depLoading ? <div className='p-6 text-center'>Loading...</div> : 
      <div className='max-w-3xl mx-auto mt-6 sm:mt-10 bg-white p-4 sm:p-8 rounded-md shadow-md'>
      <div>
        <h2 className='text-2xl sm:text-3xl font-bold mb-6'>Edit Department</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="dep_name" className='block text-xs sm:text-sm font-medium text-gray-700 mb-2'>Department Name</label>
            <input type="text" name="dep_name" placeholder='Department Name' className='w-full px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md' onChange={handleChange} value={department?.dep_name || ''} required/>
          </div>
          <div className='mt-4 sm:mt-6'>
            <label htmlFor="description" className='block text-xs sm:text-sm font-medium text-gray-700 mb-2'>Description</label>
            <textarea name="description" placeholder='Enter Description' className='w-full px-3 py-2 text-xs sm:text-base border border-gray-300 rounded-md' rows="4" onChange={handleChange} value={department?.description || ''}/> 
          </div>
          <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 sm:py-3 px-4 rounded text-sm sm:text-base'>Edit Department</button>
        </form>
      </div>
    </div>}</>
  )
}

export default EditDepartment
