import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { RecommendationCard } from './RecommendationCard';
import toast from 'react-hot-toast';
import { TrendingUp } from 'lucide-react';

export const PromotionSuggestion = ({ employeeId }) => {
  const [suggestion, setSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generatePromotion = async () => {
    setIsLoading(true);
    try {
      const response = await aiService.getPromotionRecommendation(employeeId);
      setSuggestion(response.data.recommendation);
      toast.success('Promotion recommendation generated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate recommendation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp size={20} className="text-purple-600" />
        <h3 className="text-lg font-bold">Promotion Recommendation</h3>
      </div>

      <button onClick={generatePromotion} disabled={isLoading} className="btn-primary">
        {isLoading ? 'Analyzing...' : 'Check Promotion Eligibility'}
      </button>

      {suggestion && (
        <RecommendationCard
          title="Promotion Assessment"
          content={suggestion}
          isLoading={false}
        />
      )}
    </div>
  );
};

export default PromotionSuggestion;
