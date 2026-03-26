import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";
import { PageHeader, Button, Input, Section, LoadingSpinner } from "../../constants/componentUtils";

const DepartmentList = () => {
  const [depLoading, setDepLoading] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const loadDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get("https://employee-server-pink.vercel.app/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep) => ({
          id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />,
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  const onDepartmentDelete = async () => {
    await loadDepartments();
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };
  
  return (
    <div className="p-4 sm:p-6">
      {depLoading && <LoadingSpinner className="py-12" />}
      
      {!depLoading && (
        <>
          <PageHeader 
            title="Manage Departments"
            action={
              <Link to="/admin-dashboard/add-department">
                <Button variant="primary">Add New Department</Button>
              </Link>
            }
          />

          <Section>
            <div className="mb-4">
              <Input
                placeholder="Search by department name"
                onChange={filterDepartments}
              />
            </div>
            
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <DataTable 
                columns={columns} 
                data={filteredDepartments} 
                pagination 
                highlightOnHover
                pointerOnHover
              />
            </div>
          </Section>
        </>
      )}
    </div>
  );
};

export default DepartmentList;

