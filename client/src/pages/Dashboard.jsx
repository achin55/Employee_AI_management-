import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { employeeService } from '../services/employeeService';
import toast from 'react-hot-toast';
import { Users, TrendingUp, Award, Zap } from 'lucide-react';
import Loader from '../components/common/Loader';
import PerformanceChart from '../components/charts/PerformanceChart';
import RankingChart from '../components/charts/RankingChart';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    averagePerformance: 0,
    topPerformers: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await employeeService.getAllEmployees({ limit: 100 });
      const employees = response.data.employees;

      const avgScore =
        employees.reduce((sum, emp) => sum + emp.performanceScore, 0) /
        employees.length;

      const topPerformers = [...employees]
        .sort((a, b) => b.performanceScore - a.performanceScore)
        .slice(0, 5);

      setStats({
        totalEmployees: employees.length,
        averagePerformance: avgScore.toFixed(2),
        topPerformers,
        allEmployees: employees,
      });
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <MainLayout>
      <div className="space-y-6 fade-in">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={() => navigate('/employees/add')}
            className="btn-primary"
          >
            Add Employee
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Employees</p>
                <h3 className="text-3xl font-bold">{stats.totalEmployees}</h3>
              </div>
              <Users size={40} className="text-blue-600" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Performance</p>
                <h3 className="text-3xl font-bold">{stats.averagePerformance}%</h3>
              </div>
              <TrendingUp size={40} className="text-green-600" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Top Performers</p>
                <h3 className="text-3xl font-bold">{stats.topPerformers.length}</h3>
              </div>
              <Award size={40} className="text-purple-600" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">AI Features</p>
                <h3 className="text-3xl font-bold">4</h3>
              </div>
              <Zap size={40} className="text-orange-600" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stats.allEmployees && stats.allEmployees.length > 0 && (
            <>
              <PerformanceChart data={stats.allEmployees.slice(0, 10)} />
              <RankingChart data={stats.allEmployees} />
            </>
          )}
        </div>

        {/* Top Performers */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Top 5 Performers</h3>
          <div className="space-y-3">
            {stats.topPerformers.map((emp, idx) => (
              <div key={emp._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-blue-600">#{idx + 1}</span>
                  <div>
                    <p className="font-semibold">{emp.name}</p>
                    <p className="text-sm text-gray-600">{emp.position}</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {emp.performanceScore}/100
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
