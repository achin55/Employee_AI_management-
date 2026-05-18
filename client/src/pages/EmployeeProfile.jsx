import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { employeeService } from '../services/employeeService';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';
import EmployeeDetails from '../components/employee/EmployeeDetails';
import EmployeeSkills from '../components/employee/EmployeeSkills';
import EmployeeAnalytics from '../components/employee/EmployeeAnalytics';
import AIInsights from '../components/ai/AIInsights';
import PromotionSuggestion from '../components/ai/PromotionSuggestion';
import TrainingSuggestions from '../components/ai/TrainingSuggestions';
import FeedbackGenerator from '../components/ai/FeedbackGenerator';
import { ArrowLeft } from 'lucide-react';

export const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await employeeService.getEmployeeById(id);
      setEmployee(response.data.employee);
    } catch (error) {
      toast.error('Failed to fetch employee');
      navigate('/employees');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;
  if (!employee) return <div>Employee not found</div>;

  return (
    <MainLayout>
      <div className="space-y-6 fade-in">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/employees')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={20} />
            <span>Back to Employees</span>
          </button>
        </div>

        {/* Employee Details */}
        <EmployeeDetails employee={employee} />

        {/* Skills and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmployeeSkills employee={employee} />
          <EmployeeAnalytics employee={employee} />
        </div>

        {/* AI Recommendations */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">AI-Powered Recommendations</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PromotionSuggestion employeeId={id} />
            <TrainingSuggestions employeeId={id} />
          </div>

          <FeedbackGenerator employeeId={id} />
          <AIInsights employeeId={id} />
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeProfile;
