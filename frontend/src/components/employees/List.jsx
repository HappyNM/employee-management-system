import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { EmployeeButtons, columns } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'

const List = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(null)
  const [filteredEmployees, setFilteredEmployees] = useState([])
  useEffect(()=> {
    const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/employee", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.employees.map((emp) => ({
          _id: emp._id,
          sno: sno++,
          dep_name: emp.department.dep_name,
          name: emp.userId.name,
          dateOfBirth: new Date(emp.dob).toLocaleDateString(),
          profileImage: <img src={`http://localhost:5000/public/uploads/${emp.userId.profileImage}`} alt={emp.userId.name} className="w-11 h-11 rounded-full object-cover mx-auto" />,
          action: <EmployeeButtons _id={emp._id} />
        }));
        setEmployees(data);
        setFilteredEmployees(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setEmpLoading(false);
    }
  }
  fetchEmployees()
  },[])
   
  const handleFilter = (e) => {
    const records = employees.filter((emp) => {
      return emp.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredEmployees(records);
  }
  return (
   <div className="p=6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name"
          className="px-4 py-0.5 border"
          onChange={handleFilter}
          
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 mb-3 mr-2 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={filteredEmployees}
          progressPending={empLoading}
          pagination
          highlightOnHover
          pointerOnHover
        />
      </div>
    </div>
  )
}

export default List