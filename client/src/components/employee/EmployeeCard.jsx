import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Briefcase, TrendingUp, Award } from 'lucide-react';
import { formatCurrency, getPerformanceColor, getPerformanceBgColor } from '../../utils/helperFunctions';

export const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  const navigate = useNavigate();

  return (
    <div className="card card-hover">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold">{employee.name}</h3>
          <p className="text-sm text-gray-500">{employee.position}</p>
        </div>
        <span className={`badge badge-primary`}>{employee.department}</span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Mail size={16} className="mr-2" />
          {employee.email}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Briefcase size={16} className="mr-2" />
          {employee.experience} years experience
        </div>
        <div className="flex items-center text-sm">
          <TrendingUp size={16} className="mr-2" />
          <span className={`font-bold ${getPerformanceColor(employee.performanceScore)}`}>
            {employee.performanceScore}/100
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {employee.skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="badge-success text-xs">
              {skill}
            </span>
          ))}
          {employee.skills.length > 3 && (
            <span className="badge-warning text-xs">+{employee.skills.length - 3}</span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/employees/${employee._id}`)}
          className="flex-1 btn-primary text-sm"
        >
          View
        </button>
        <button onClick={() => onEdit(employee._id)} className="flex-1 btn-secondary text-sm">
          Edit
        </button>
        <button onClick={() => onDelete(employee._id)} className="flex-1 btn-danger text-sm">
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
