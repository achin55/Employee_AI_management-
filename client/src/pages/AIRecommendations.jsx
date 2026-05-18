import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { employeeService } from '../services/employeeService';
import { aiService } from '../services/aiService';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';
import RecommendationCard from '../components/ai/RecommendationCard';
import { Sparkles } from 'lucide-react';

export const AIRecommendations = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState({
    promotion: null,
    training: null,
    feedback: null,
    analysis: null,
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await employeeService.getAllEmployees({ limit: 100 });
      setEmployees(response.data.employees);
      if (response.data.employees.length > 0) {
        setSelectedEmployee(response.data.employees[0]);
      }
    } catch (error) {
      toast.error('Failed to fetch employees');
    } finally {
      setIsLoading(false);
    }
  };

  const generateRecommendations = async () => {
    if (!selectedEmployee) {
      toast.error('Please select an employee');
      return;
    }

    setIsLoading(true);
    try {
      const [promotion, training, feedback, analysis] = await Promise.all([
        aiService.getPromotionRecommendation(selectedEmployee._id),
        aiService.getTrainingSuggestions(selectedEmployee._id),
        aiService.getAIFeedback(selectedEmployee._id),
        aiService.getComprehensiveAnalysis(selectedEmployee._id),
      ]);

      setRecommendations({
        promotion: promotion.data.recommendation,
        training: training.data.suggestions,
        feedback: feedback.data.feedback,
        analysis: analysis.data.analysis,
      });

      toast.success('Recommendations generated!');
    } catch (error) {
      toast.error('Failed to generate recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && employees.length === 0) return <Loader />;

  return (
    <MainLayout>
      <div className="space-y-6 fade-in">
        <div className="flex items-center space-x-2 mb-8">
          <Sparkles size={32} className="text-blue-600" />
          <h1 className="text-3xl font-bold">AI Recommendations</h1>
        </div>

        {/* Employee Selection */}
        <div className="card">
          <label className="block text-sm font-semibold mb-3">Select Employee</label>
          <select
            value={selectedEmployee?._id || ''}
            onChange={(e) => {
              const emp = employees.find((e) => e._id === e.target.value);
              setSelectedEmployee(emp);
            }}
            className="input-field w-full md:w-1/3"
          >
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name} - {emp.position}
              </option>
            ))}
          </select>

          <button
            onClick={generateRecommendations}
            disabled={isLoading || !selectedEmployee}
            className="mt-4 btn-primary"
          >
            {isLoading ? 'Generating...' : 'Generate All Recommendations'}
          </button>
        </div>

        {/* Recommendations */}
        {recommendations.promotion && (
          <div className="space-y-6">
            <RecommendationCard
              title="Promotion Assessment"
              content={recommendations.promotion}
              isLoading={false}
            />

            <RecommendationCard
              title="Training Suggestions"
              content={recommendations.training}
              isLoading={false}
            />

            <RecommendationCard
              title="Performance Feedback"
              content={recommendations.feedback}
              isLoading={false}
            />

            <RecommendationCard
              title="Comprehensive Analysis"
              content={recommendations.analysis}
              isLoading={false}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AIRecommendations;
