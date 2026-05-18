import React from 'react';
import { Star, Award } from 'lucide-react';

export const EmployeeRanking = ({ employees }) => {
  const sortedEmployees = [...employees].sort(
    (a, b) => b.performanceScore - a.performanceScore
  );

  return (
    <div className="space-y-4">
      {sortedEmployees.map((emp, idx) => (
        <div key={emp._id} className="card flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full font-bold">
              {idx + 1}
            </div>
            <div>
              <h4 className="font-bold">{emp.name}</h4>
              <p className="text-sm text-gray-600">{emp.department}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">
              {emp.performanceScore}
            </span>
            <Star size={20} className="text-yellow-500 fill-yellow-500" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeRanking;
