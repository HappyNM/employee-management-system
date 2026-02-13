import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import AuthProvider from "./context/authContext.jsx"
import PrivateRoutes from "./utils/PrivateRoutes.jsx"
import RoleBaseRoutes from "./utils/RoleBaseRoutes.jsx"
import AdminSummary from "./components/dashboard/AdminSummary.jsx"
import DepartmentList from "./components/departments/DepartmentList.jsx"
import AddDepartment from "./components/departments/AddDepartment.jsx"
import EditDepartment from "./components/departments/EditDepartment.jsx"
import List from "./components/employees/List.jsx"
import Add from "./components/employees/Add.jsx"
import View from "./components/employees/View.jsx"
import Edit from "./components/employees/Edit.jsx"
import AddSalary from "./components/salary/Add.jsx"
import ViewSalary from "./components/salary/View.jsx"
import Summary from "./components/EmployeeDashboard/Summarry.jsx"
import LeaveList from "./components/leave/List.jsx"
import AddLeave from "./components/leave/Add.jsx"
import EmployeeSalary from "./components/EmployeeDashboard/Salary.jsx"
import Settings from "./components/EmployeeDashboard/Settings.jsx"
import AdminLeaveList from "./components/leave/AdminList.jsx"
import AdminSettings from "./components/dashboard/AdminSettings.jsx"


function App() {
  return (
   <AuthProvider>
    <BrowserRouter>
   <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/admin-dashboard" element={
        <PrivateRoutes>
          <RoleBaseRoutes requiredRole={['admin']}>
          <AdminDashboard/>
          </RoleBaseRoutes>
        </PrivateRoutes>
      }>
        <Route index element={<AdminSummary/>}></Route>
        <Route path="/admin-dashboard/leaves" element={<AdminLeaveList/>}></Route>
        <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route>
        <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>
        <Route path="/admin-dashboard/department/:id" element={<EditDepartment/>}></Route>
        <Route path="/admin-dashboard/employees" element={<List/>}></Route>
        <Route path="/admin-dashboard/add-employee" element={<Add/>}></Route>
        <Route path="/admin-dashboard/employees/:id" element={<View/>}></Route>
        <Route path="/admin-dashboard/employees/edit/:id" element={<Edit/>}></Route>
        <Route path="/admin-dashboard/salary/add" element={<AddSalary/>}></Route>
        <Route path="/admin-dashboard/employee/salary/:id" element={<ViewSalary/>}></Route>
        <Route path="/admin-dashboard/settings" element={<AdminSettings/>}></Route>
        


      </Route>

      <Route path="/employee-dashboard" element={
        <PrivateRoutes>
          <RoleBaseRoutes requiredRole={['admin','employee']}>
          <EmployeeDashboard/>
          </RoleBaseRoutes>
        </PrivateRoutes>
      }>
        <Route index element={<Summary/>}></Route>
        <Route path="/employee-dashboard/profile/:id" element={<View/>}></Route>
        <Route path="/employee-dashboard/leaves" element={<LeaveList/>}></Route>
        <Route path="/employee-dashboard/add-leave" element={<AddLeave/>}></Route>
        <Route path="/employee-dashboard/salary" element={<EmployeeSalary/>}></Route>
        <Route path="/employee-dashboard/settings" element={<Settings/>}></Route>

        
      </Route>

      
   </Routes>
    </BrowserRouter>
     </AuthProvider> 
  )
}

export default App
