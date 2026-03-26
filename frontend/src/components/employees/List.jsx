import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { EmployeeButtons, columns } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import { PageHeader, Button, Input, Section } from '../../constants/componentUtils'

const List = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(null)
  const [filteredEmployees, setFilteredEmployees] = useState([])
  useEffect(()=> {
    const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get("https://employee-server-pink.vercel.app/api/employee", {
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
          profileImage: <img src={emp.userId.profileImage} alt={emp.userId.name} className="w-11 h-11 rounded-full object-cover mx-auto" />,
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
   <div className="p-4 sm:p-6">
      <PageHeader 
        title="Manage Employees"
        action={
          <Link to="/admin-dashboard/add-employee">
            <Button variant="primary">Add New Employee</Button>
          </Link>
        }
      />
      
      <Section>
        <div className="mb-4">
          <Input
            placeholder="Search by name"
            onChange={handleFilter}
          />
        </div>
        
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <DataTable
            columns={columns}
            data={filteredEmployees}
            progressPending={empLoading}
            pagination
            highlightOnHover
            pointerOnHover
          />
        </div>
      </Section>
    </div>
  )
}

export default List
