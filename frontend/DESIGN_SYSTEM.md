# UI Design System Guide

## Overview
This document outlines the unified design system for the Employee Management System. All components and pages should follow these guidelines to ensure a seamless and uniform UI experience.

## Table of Contents
1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Components](#components)
5. [Usage Examples](#usage-examples)

---

## Color Palette

### Primary Colors
- **Teal 600** (Primary): `#0d9488` - Used for main actions, navigation highlights
- **Teal 700** (Hover): `#0a7a6e` - Used for button hover states
- **Teal 800** (Active): `#085d56` - Used for button active states

### Secondary Colors
- **Gray 800**: `#1f2937` - Sidebar background
- **Gray 100**: `#f3f4f6` - Page background
- **Gray 700**: `#374151` - Secondary text

### Status Colors
- **Success**: `#10b981` (Green)
- **Error**: `#ef4444` (Red)
- **Warning**: `#f59e0b` (Amber)
- **Info**: `#3b82f6` (Blue)

### Text Colors
- **Dark**: `#1f2937` - Primary text
- **Medium**: `#6b7280` - Secondary text
- **Light**: `#9ca3af` - Tertiary text
- **White**: `#ffffff` - On colored backgrounds

---

## Typography

### Heading Sizes
```
h1: text-4xl font-bold    (32px)
h2: text-3xl font-bold    (28px)
h3: text-2xl font-bold    (24px)
h4: text-xl font-semibold (20px)
h5: text-lg font-semibold (18px)
```

### Body Text
```
Large: text-base font-normal  (16px)
Normal: text-sm font-normal   (14px)
Small: text-xs font-normal    (12px)
```

### Labels
```
Label: text-sm font-medium (14px, semi-bold)
```

---

## Spacing & Layout

### Spacing Scale (Base Unit: 4px)
```
xs: 4px   (gap-1, p-1, m-1)
sm: 8px   (gap-2, p-2, m-2)
md: 16px  (gap-4, p-4, m-4)
lg: 24px  (gap-6, p-6, m-6)
xl: 32px  (gap-8, p-8, m-8)
```

### Layout Widths
```
Sidebar: w-64 (256px) - Fixed width
Navbar: h-12 (48px) - Fixed height
Container: max-w-7xl - Max content width
Padding: px-4 - Default horizontal padding
```

### Margin Standards
- Page sections: `mb-6`
- Section titles: `mb-4`
- Form groups: `mb-4`
- Between elements: `mb-2` to `mb-4`

---

## Components

### Use the Component Utility Library!
Instead of writing custom Tailwind classes everywhere, use the pre-built components in `src/constants/componentUtils.jsx`:

### Button Component
```jsx
import { Button } from '@/constants/componentUtils';

// Primary button (default)
<Button onClick={handleClick}>Click Me</Button>

// Secondary button
<Button variant="secondary">Secondary</Button>

// Danger button
<Button variant="danger">Delete</Button>

// Disabled button
<Button disabled>Disabled</Button>

// Small button
<Button size="sm">Small</Button>
```

### Input Component
```jsx
import { Input } from '@/constants/componentUtils';

<Input
  label="Email Address"
  type="email"
  placeholder="Enter email"
  required
  error={emailError}
/>
```

### Select Component
```jsx
import { Select } from '@/constants/componentUtils';

<Select
  label="Department"
  options={[
    { value: 'hr', label: 'Human Resources' },
    { value: 'it', label: 'Information Technology' },
  ]}
  required
/>
```

### Card Component
```jsx
import { Card } from '@/constants/componentUtils';

<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

### Section Component
```jsx
import { Section } from '@/constants/componentUtils';

<Section title="Employee Details">
  {/* Content */}
</Section>
```

### PageHeader Component
```jsx
import { PageHeader, Button } from '@/constants/componentUtils';

<PageHeader
  title="Manage Employees"
  subtitle="View and manage all employees"
  action={<Button>Add Employee</Button>}
/>
```

### Grid Component
```jsx
import { Grid } from '@/constants/componentUtils';

<Grid columns={3} gap="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

### Badge Component
```jsx
import { Badge } from '@/constants/componentUtils';

<Badge variant="success">Active</Badge>
<Badge variant="error">Inactive</Badge>
<Badge variant="warning">Pending</Badge>
```

### Alert Component
```jsx
import { Alert } from '@/constants/componentUtils';

<Alert
  type="success"
  title="Success!"
  message="Employee added successfully"
  onClose={() => setShowAlert(false)}
/>
```

---

## Usage Examples

### Example 1: Form Page
```jsx
import { PageHeader, Section, Input, Select, Button, Container } from '@/constants/componentUtils';

const AddEmployee = () => {
  const [formData, setFormData] = useState({});

  return (
    <div className="p-6">
      <PageHeader
        title="Add New Employee"
        subtitle="Enter employee details below"
      />
      
      <Container>
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Name"
              placeholder="Enter full name"
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter email"
              required
            />
            <Select
              label="Department"
              options={departmentOptions}
              required
            />
            <Input
              label="Phone"
              placeholder="Enter phone"
            />
          </div>
          
          <div className="mt-6 flex gap-4">
            <Button variant="primary">Save Employee</Button>
            <Button variant="secondary">Cancel</Button>
          </div>
        </Section>
      </Container>
    </div>
  );
};
```

### Example 2: List Page
```jsx
import { PageHeader, Button, Badge, Section } from '@/constants/componentUtils';
import DataTable from 'react-data-table-component';

const EmployeeList = () => {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => (
        <Badge variant={row.status === 'active' ? 'success' : 'error'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="p-6">
      <PageHeader
        title="Manage Employees"
        action={<Button>Add Employee</Button>}
      />
      
      <Section>
        <DataTable columns={columns} data={employees} pagination />
      </Section>
    </div>
  );
};
```

### Example 3: Dashboard Cards
```jsx
import { Card, Grid, Badge } from '@/constants/componentUtils';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      
      <Grid columns={3}>
        <Card>
          <h3 className="text-2xl font-bold">100</h3>
          <p className="text-gray-600">Total Employees</p>
        </Card>
        
        <Card>
          <h3 className="text-2xl font-bold">5</h3>
          <p className="text-gray-600">Departments</p>
        </Card>
        
        <Card>
          <h3 className="text-2xl font-bold">$50K</h3>
          <p className="text-gray-600">Avg Salary</p>
        </Card>
      </Grid>
    </div>
  );
};
```

---

## Best Practices

### ✅ DO:
- Use component utilities from `componentUtils.jsx`
- Use design tokens from `designTokens.js`
- Maintain consistent spacing between elements
- Use the color palette defined above
- Test responsive design on mobile devices
- Keep heading hierarchy consistent (h1 > h2 > h3, etc.)
- Use semantic HTML elements

### ❌ DON'T:
- Don't write custom inline Tailwind classes for buttons/inputs
- Don't mix different color schemes on the same page
- Don't create new spacing values; use the scale provided
- Don't use arbitrary colors; reference the palette
- Don't nest components without proper aria labels
- Don't forget to add labels to form inputs
- Don't use hardcoded hex values; use Tailwind classes

---

## Responsive Design Guidelines

### Breakpoints
- Mobile-first approach
- sm: 640px
- md: 768px (main breakpoint)
- lg: 1024px
- xl: 1280px

### Container Padding
- Mobile (< 768px): `px-4`
- Desktop (≥ 768px): `px-6`

### Grid Columns
- Mobile: `grid-cols-1`
- Tablet: `md:grid-cols-2`
- Desktop: `lg:grid-cols-3`

---

## Migration Guide

### Before (Old - Inconsistent):
```jsx
<div className="p=6">  {/* WRONG SYNTAX */}
  <h3 className="text-2xl font-bold">Title</h3>
  <input className="px-4 py-0.5 border" />
  <button className="px-4 py-1 bg-teal-600 rounded text-white">Click</button>
</div>
```

### After (New - Consistent):
```jsx
import { PageHeader, Input, Button, Section } from '@/constants/componentUtils';

<Section title="Title">
  <Input label="Email" type="email" />
  <Button variant="primary">Click</Button>
</Section>
```

---

## File Structure
```
src/
├── constants/
│   ├── designTokens.js       # Design tokens
│   └── componentUtils.jsx    # Reusable components
├── components/
│   ├── dashboard/
│   ├── employees/
│   ├── departments/
│   └── ...
├── pages/
├── context/
└── utils/
```

---

## Support & Questions
If you have questions about the design system or need to add new components, refer to `componentUtils.jsx` or `designTokens.js`.

Last Updated: 2024
