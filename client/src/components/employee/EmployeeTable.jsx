import React from 'react';
import { formatCurrency, getPerformanceBgColor } from '../../utils/helperFunctions';

export const EmployeeTable = ({ employees, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-semibold">Name</th>
            <th className="px-4 py-2 text-left font-semibold">Email</th>
            <th className="px-4 py-2 text-left font-semibold">Department</th>
            <th className="px-4 py-2 text-left font-semibold">Performance</th>
            <th className="px-4 py-2 text-left font-semibold">Experience</th>
            <th className="px-4 py-2 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{emp.name}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{emp.email}</td>
              <td className="px-4 py-2">{emp.department}</td>
              <td className="px-4 py-2">
                <span className={`badge badge-success`}>{emp.performanceScore}/100</span>
              </td>
              <td className="px-4 py-2">{emp.experience} years</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(emp._id)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(emp._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
