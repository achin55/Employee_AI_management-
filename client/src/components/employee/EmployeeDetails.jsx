import React from 'react';
import { Mail, Phone, Briefcase, Building, Calendar } from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/helperFunctions';

export const EmployeeDetails = ({ employee }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold">{employee.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <Mail size={20} className="text-blue-600" />
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-semibold">{employee.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Phone size={20} className="text-blue-600" />
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="font-semibold">{employee.phone || 'N/A'}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Briefcase size={20} className="text-blue-600" />
          <div>
            <p className="text-xs text-gray-500">Position</p>
            <p className="font-semibold">{employee.position}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Building size={20} className="text-blue-600" />
          <div>
            <p className="text-xs text-gray-500">Department</p>
            <p className="font-semibold">{employee.department}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Calendar size={20} className="text-blue-600" />
          <div>
            <p className="text-xs text-gray-500">Join Date</p>
            <p className="font-semibold">{formatDate(employee.joinDate)}</p>
          </div>
        </div>

        {employee.salary && (
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-green-600">$</span>
            <div>
              <p className="text-xs text-gray-500">Salary</p>
              <p className="font-semibold">{formatCurrency(employee.salary)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
