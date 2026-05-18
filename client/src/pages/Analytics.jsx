import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { employeeService } from '../services/employeeService';
import api from '../services/api';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';
import PerformanceChart from '../components/charts/PerformanceChart';
import DepartmentChart from '../components/charts/DepartmentChart';
import SkillsChart from '../components/charts/SkillsChart';

export const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/analytics/data');
      setAnalytics(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch analytics');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;
  if (!analytics) return <div>No analytics data available</div>;

  return (
    <MainLayout>
      <div className="space-y-6 fade-in">
        <h1 className="text-3xl font-bold">Analytics & Reports</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-blue-50">
            <p className="text-gray-600 text-sm">Total Employees</p>
            <h3 className="text-3xl font-bold">{analytics.totalEmployees}</h3>
          </div>
          <div className="card bg-green-50">
            <p className="text-gray-600 text-sm">Average Performance</p>
            <h3 className="text-3xl font-bold">{analytics.averagePerformance.toFixed(2)}%</h3>
          </div>
          <div className="card bg-purple-50">
            <p className="text-gray-600 text-sm">Top Skills</p>
            <h3 className="text-3xl font-bold">{analytics.skillsFrequency.length}</h3>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          {analytics.departmentStats && analytics.departmentStats.length > 0 && (
            <DepartmentChart data={analytics.departmentStats} />
          )}

          {analytics.skillsFrequency && analytics.skillsFrequency.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Top 10 Skills</h3>
              <div className="space-y-2">
                {analytics.skillsFrequency.slice(0, 10).map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span>{skill._id}</span>
                    <div className="flex items-center space-x-2">
                      <div className="bg-blue-600 rounded-full" style={{ width: skill.count * 20, height: 10 }}></div>
                      <span className="font-bold">{skill.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analytics.ratingStats && (
            <div className="card">
              <h3 className="text-lg font-bold mb-4">Average Ratings</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(analytics.ratingStats).map(([key, value]) => (
                  value && (
                    <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 capitalize">{key}</p>
                      <p className="text-2xl font-bold text-blue-600">{value.toFixed(2)}/5</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;
