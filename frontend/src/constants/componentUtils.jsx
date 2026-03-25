/**
 * Component Utilities - Pre-built, consistent component styles
 * Use these instead of manually writing Tailwind classes
 */

import React from 'react';
import { COMPONENTS, PADDING, BORDER_RADIUS, TYPOGRAPHY } from './designTokens';

// Button Component - USE THIS FOR ALL BUTTONS
export const Button = ({ 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  children, 
  className = '',
  ...props 
}) => {
  let baseClass = COMPONENTS.button[variant] || COMPONENTS.button.primary;
  
  if (disabled) {
    baseClass += ` ${COMPONENTS.button.disabled}`;
  }

  const sizeClass = size === 'sm' ? 'px-3 py-1 text-sm' : 'px-4 py-2';
  
  return (
    <button 
      className={`${baseClass} ${sizeClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Input Component - USE THIS FOR ALL TEXT INPUTS
export const Input = ({
  label,
  type = 'text',
  required = false,
  error = null,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className={TYPOGRAPHY.label}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`${COMPONENTS.input} ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// Select Component - USE THIS FOR ALL DROPDOWNS
export const Select = ({
  label,
  options = [],
  required = false,
  error = null,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className={TYPOGRAPHY.label}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        className={`${COMPONENTS.input} ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// Card Component - USE THIS FOR SECTIONS
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`${COMPONENTS.card} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Section Component - USE THIS FOR PAGE SECTIONS
export const Section = ({ title, children, className = '', ...props }) => {
  return (
    <div className={`${COMPONENTS.section} ${className}`} {...props}>
      {title && <h2 className={`${TYPOGRAPHY.heading.h3} mb-4`}>{title}</h2>}
      {children}
    </div>
  );
};

// Header Component - USE THIS FOR PAGE HEADERS
export const PageHeader = ({ title, subtitle = null, action = null, className = '' }) => {
  return (
    <div className={`flex justify-between items-start mb-6 ${className}`}>
      <div>
        <h1 className={TYPOGRAPHY.heading.h2}>{title}</h1>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

// Container Component - USE THIS FOR PAGE CONTAINERS
export const Container = ({ children, className = '', ...props }) => {
  return (
    <div className={`${COMPONENTS.container} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Grid Component - USE THIS FOR GRID LAYOUTS
export const Grid = ({ children, columns = 1, gap = 'md', className = '', ...props }) => {
  const gridClass = `grid grid-cols-1 ${columns >= 2 ? 'md:grid-cols-2' : ''} ${columns >= 3 ? 'lg:grid-cols-3' : ''} gap-6`;
  return (
    <div className={`${gridClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Badge Component - USE THIS FOR STATUS BADGES
export const Badge = ({ variant = 'primary', children, className = '' }) => {
  const variantClass = {
    primary: 'bg-teal-100 text-teal-800',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${variantClass[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Loading Spinner Component
export const LoadingSpinner = ({ className = '' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
    </div>
  );
};

// Empty State Component
export const EmptyState = ({ title = 'No data found', message = '', action = null }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className={TYPOGRAPHY.heading.h4}>{title}</p>
      {message && <p className="text-gray-600 mt-2">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

// Alert Component
export const Alert = ({ type = 'info', title = '', message = '', onClose = null }) => {
  const typeClass = {
    success: 'bg-green-50 border-green-300 text-green-800',
    error: 'bg-red-50 border-red-300 text-red-800',
    warning: 'bg-yellow-50 border-yellow-300 text-yellow-800',
    info: 'bg-blue-50 border-blue-300 text-blue-800',
  };

  return (
    <div className={`border-l-4 p-4 rounded ${typeClass[type]} mb-4`}>
      {title && <h4 className="font-semibold">{title}</h4>}
      {message && <p className="text-sm mt-1">{message}</p>}
      {onClose && (
        <button onClick={onClose} className="text-sm underline mt-2">
          Dismiss
        </button>
      )}
    </div>
  );
};
