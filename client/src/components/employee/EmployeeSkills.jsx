import React from 'react';

export const EmployeeSkills = ({ employee }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {employee.skills.map((skill, idx) => (
          <span
            key={idx}
            className="badge badge-primary px-4 py-2 text-sm font-semibold"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EmployeeSkills;
