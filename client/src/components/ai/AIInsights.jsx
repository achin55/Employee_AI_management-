import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { RecommendationCard } from './RecommendationCard';
import toast from 'react-hot-toast';

export const AIInsights = ({ employeeId }) => {
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateInsights = async () => {
    setIsLoading(true);
    try {
      const response = await aiService.getComprehensiveAnalysis(employeeId);
      setInsights(response.data.analysis);
      toast.success('Insights generated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate insights');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button onClick={generateInsights} disabled={isLoading} className="btn-primary">
        {isLoading ? 'Generating...' : 'Generate AI Insights'}
      </button>

      {insights && (
        <RecommendationCard
          title="Comprehensive Analysis"
          content={insights}
          isLoading={false}
        />
      )}
    </div>
  );
};

export default AIInsights;
