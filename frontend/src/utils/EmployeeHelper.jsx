import axios from "axios";
import { useNavigate } from "react-router-dom";
 
export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        sortable: true,
        width: "70px"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        center: true,
        width: "100px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "200px"
    },
    {
        name: "DOB",
        selector: (row) => row.dateOfBirth,
        
        width: "100px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        
        width: "120px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true,
    }
]
export const fetchDepartments = async () => {
    let departments
    
    try {
      const response = await axios.get("http://localhost:5000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        departments = response.data.departments
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } 
    return departments
  };
  //employees for salaries code
export const getEmployees = async (id) => {
    let employees
    
    try {
      const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        employees = response.data.employees
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } 
    return employees
  };  
  

  export const EmployeeButtons = ({_id})=>{
    const navigate = useNavigate()
    const handleView = () => {
        navigate(`/admin-dashboard/employees/${_id}`)
    }
    
    const handleEdit = () => {
        navigate(`/admin-dashboard/employees/edit/${_id}`)
    }
    
    const handleLeave = () => {
        // Functionality to be added later
        console.log("Leave employee:", _id)
    }
    
    return (
        <div className="flex items-center gap-2">
            <button onClick={handleView} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm" >
                View
            </button>
            <button onClick={handleEdit} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm" >
                Edit
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm" onClick={()=> navigate(`/admin-dashboard/employee/salary/${_id}`)}>
              Salary
            </button>
            <button onClick={handleLeave} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm" >
                Leave
            </button>

        </div>
    )
}