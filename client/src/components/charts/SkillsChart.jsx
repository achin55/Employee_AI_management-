import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const SkillsChart = ({ skillsData }) => {
  const topSkills = Object.entries(skillsData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Most Common Skills</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topSkills}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsChart;
