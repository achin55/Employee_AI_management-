import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { RecommendationCard } from './RecommendationCard';
import toast from 'react-hot-toast';
import { MessageSquare } from 'lucide-react';

export const FeedbackGenerator = ({ employeeId }) => {
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateFeedback = async () => {
    setIsLoading(true);
    try {
      const response = await aiService.getAIFeedback(employeeId);
      setFeedback(response.data.feedback);
      toast.success('Feedback generated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate feedback');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <MessageSquare size={20} className="text-orange-600" />
        <h3 className="text-lg font-bold">AI Feedback</h3>
      </div>

      <button onClick={generateFeedback} disabled={isLoading} className="btn-secondary">
        {isLoading ? 'Generating...' : 'Generate Feedback'}
      </button>

      {feedback && (
        <RecommendationCard
          title="Performance Feedback"
          content={feedback}
          isLoading={false}
        />
      )}
    </div>
  );
};

export default FeedbackGenerator;
