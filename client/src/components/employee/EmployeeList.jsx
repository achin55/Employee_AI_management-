import React from 'react';
import { EmployeeCard } from './EmployeeCard';
import { EmptyState } from '../common/EmptyState';

export const EmployeeList = ({ employees, onDelete, onEdit, isLoading = false }) => {
  if (!employees || employees.length === 0) {
    return <EmptyState title="No employees" message="Add your first employee to get started" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee._id}
          employee={employee}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
