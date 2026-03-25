# UI Component Quick Reference

This file shows how to use the new unified component system throughout your application.

## Import Pattern

```jsx
import { 
  Button, 
  Input, 
  Select, 
  Card, 
  Section,
  PageHeader,
  Container,
  Grid,
  Badge,
  Alert,
  LoadingSpinner
} from '@/constants/componentUtils';
```

---

## Common Component Patterns

### 1. List/Table Pages

```jsx
import { PageHeader, Button, Input, Section, LoadingSpinner } from '@/constants/componentUtils';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6">
      {/* Page Header with Action Button */}
      <PageHeader
        title="Manage Employees"
        subtitle="View all employees in the system"
        action={
          <Link to="/admin-dashboard/add-employee">
            <Button variant="primary">Add New Employee</Button>
          </Link>
        }
      />

      {/* Main Content Section */}
      <Section>
        {/* Search Bar */}
        <div className="mb-4">
          <Input
            placeholder="Search by name..."
            onChange={handleSearch}
          />
        </div>

        {/* Data Table */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <DataTable
            columns={columns}
            data={filteredEmployees}
            pagination
            highlightOnHover
          />
        )}
      </Section>
    </div>
  );
};
```

---

### 2. Form Pages

```jsx
import { 
  PageHeader, 
  Input, 
  Select, 
  Button, 
  Section,
  Alert 
} from '@/constants/componentUtils';

const AddEmployee = () => {
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call
      setAlert({ type: 'success', message: 'Employee added!' });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to add employee' });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PageHeader title="Add New Employee" />

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <Section>
        <form onSubmit={handleSubmit}>
          {/* Two-column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              label="Name"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="john@example.com"
              onChange={handleChange}
              required
            />
            <Select
              label="Department"
              name="department"
              options={departmentOptions}
              onChange={handleChange}
              required
            />
            <Input
              label="Salary"
              type="number"
              name="salary"
              onChange={handleChange}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button variant="primary" type="submit">
              Save Employee
            </Button>
            <Button variant="secondary" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Section>
    </div>
  );
};
```

---

### 3. Dashboard/Stats Pages

```jsx
import { Card, Grid, Badge, PageHeader } from '@/constants/componentUtils';

const Dashboard = () => {
  return (
    <div className="p-6">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Admin!"
      />

      {/* 3-Column Grid */}
      <Grid columns={3} gap="md" className="mb-12">
        <Card>
          <h3 className="text-2xl font-bold text-teal-600">150</h3>
          <p className="text-gray-600">Total Employees</p>
          <Badge variant="success" className="mt-2">Active</Badge>
        </Card>
        <Card>
          <h3 className="text-2xl font-bold text-yellow-600">5</h3>
          <p className="text-gray-600">Departments</p>
        </Card>
        <Card>
          <h3 className="text-2xl font-bold text-red-600">$500K</h3>
          <p className="text-gray-600">Monthly Payroll</p>
        </Card>
      </Grid>

      {/* Leave Status Grid */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Leave Summary</h2>
        <Grid columns={4}>
          <Card>
            <p className="text-gray-600 text-sm">Total Leaves</p>
            <p className="text-2xl font-bold">45</p>
          </Card>
          <Card>
            <p className="text-gray-600 text-sm">Approved</p>
            <p className="text-2xl font-bold text-green-600">32</p>
          </Card>
          <Card>
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-2xl font-bold text-orange-600">10</p>
          </Card>
          <Card>
            <p className="text-gray-600 text-sm">Rejected</p>
            <p className="text-2xl font-bold text-red-600">3</p>
          </Card>
        </Grid>
      </div>
    </div>
  );
};
```

---

### 4. Card-Based Layouts

```jsx
import { Card, Badge, Button } from '@/constants/componentUtils';

const EmployeeCard = ({ employee }) => {
  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{employee.name}</h3>
          <p className="text-gray-600 text-sm">{employee.designation}</p>
        </div>
        <Badge variant="success">{employee.status}</Badge>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p><span className="font-medium">Email:</span> {employee.email}</p>
        <p><span className="font-medium">Department:</span> {employee.department}</p>
        <p><span className="font-medium">Salary:</span> ${employee.salary}</p>
      </div>

      <div className="flex gap-2">
        <Button size="sm" variant="primary">View</Button>
        <Button size="sm" variant="secondary">Edit</Button>
        <Button size="sm" variant="danger">Delete</Button>
      </div>
    </Card>
  );
};
```

---

### 5. Form with Validation

```jsx
import { Input, Select, Button, Section, Alert } from '@/constants/componentUtils';

const EditEmployee = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Submit form
  };

  return (
    <Section title="Edit Employee">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <div className="flex gap-4 mt-6">
          <Button type="submit">Update</Button>
          <Button variant="secondary" type="button">Cancel</Button>
        </div>
      </form>
    </Section>
  );
};
```

---

### 6. Status Badges & Indicators

```jsx
import { Badge, Button } from '@/constants/componentUtils';

const LeaveRequest = ({ leave }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending Review</Badge>;
      case 'rejected':
        return <Badge variant="error">Rejected</Badge>;
      default:
        return <Badge variant="info">{status}</Badge>;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">{leave.employeeName}</h3>
        {getStatusBadge(leave.status)}
      </div>
      <p className="text-sm text-gray-600">{leave.reason}</p>
      <div className="mt-3 flex gap-2">
        {leave.status === 'pending' && (
          <>
            <Button size="sm" variant="primary">Approve</Button>
            <Button size="sm" variant="danger">Reject</Button>
          </>
        )}
      </div>
    </div>
  );
};
```

---

## Color Variants Reference

### Button Variants
- `primary` - Teal background (main actions)
- `secondary` - Gray background (secondary actions)
- `danger` - Red background (destructive actions)

### Badge Variants
- `primary` - Teal
- `success` - Green
- `error` - Red
- `warning` - Yellow
- `info` - Blue

### Alert Types
- `success` - Green alert
- `error` - Red alert
- `warning` - Yellow alert
- `info` - Blue alert

---

## Spacing Guide

```
Padding:    p-1 (1px) to p-8 (32px)
Margin:     m-1 (1px) to m-8 (32px)
Gap:        gap-1 (1px) to gap-8 (32px)

Breakpoints:
- Mobile:   max-width: 640px (default)
- Tablet:   md: 768px
- Desktop:  lg: 1024px
```

---

## File Size Changes

The new design system significantly improves maintainability:
- ✅ Centralized design tokens in `designTokens.js`
- ✅ Reusable components in `componentUtils.jsx`
- ✅ Consistent global styles in `index.css`
- ✅ Single source of truth for styling

---

## Next Steps

1. **Gradually migrate** all components to use the new utilities
2. **Remove custom stylesheets** as components are updated
3. **Update team** on design system usage
4. **Maintain consistency** going forward

For questions or additions to the design system, see DESIGN_SYSTEM.md
