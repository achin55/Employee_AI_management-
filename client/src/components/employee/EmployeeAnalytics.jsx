import React from 'react';
import { TrendingUp } from 'lucide-react';

export const EmployeeAnalytics = ({ employee }) => {
  const averageRating =
    (Object.values(employee.ratings || {}).reduce((a, b) => a + b, 0) /
      Object.keys(employee.ratings || {}).length ||
      0).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card">
        <h4 className="font-bold mb-3">Performance Metrics</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Overall Score</span>
            <span className="font-bold">{employee.performanceScore}/100</span>
          </div>
          <div className="flex justify-between">
            <span>Average Rating</span>
            <span className="font-bold">{averageRating}/5</span>
          </div>
          <div className="flex justify-between">
            <span>Experience</span>
            <span className="font-bold">{employee.experience} years</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="font-bold mb-3">Individual Ratings</h4>
        <div className="space-y-2 text-sm">
          {Object.entries(employee.ratings || {}).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <span className="font-bold">{value || 0}/5</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeAnalytics;
