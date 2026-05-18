import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { RecommendationCard } from './RecommendationCard';
import toast from 'react-hot-toast';
import { BookOpen } from 'lucide-react';

export const TrainingSuggestions = ({ employeeId }) => {
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateTraining = async () => {
    setIsLoading(true);
    try {
      const response = await aiService.getTrainingSuggestions(employeeId);
      setSuggestions(response.data.suggestions);
      toast.success('Training suggestions generated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate suggestions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen size={20} className="text-green-600" />
        <h3 className="text-lg font-bold">Training Recommendations</h3>
      </div>

      <button onClick={generateTraining} disabled={isLoading} className="btn-success">
        {isLoading ? 'Generating...' : 'Get Training Suggestions'}
      </button>

      {suggestions && (
        <RecommendationCard
          title="Training & Development Plan"
          content={suggestions}
          isLoading={false}
        />
      )}
    </div>
  );
};

export default TrainingSuggestions;
