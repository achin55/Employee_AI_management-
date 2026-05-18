import React from 'react';
import { Sparkles, Loader } from 'lucide-react';

export const RecommendationCard = ({ title, content, isLoading = false }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles size={24} className="text-blue-600" />
        <h3 className="text-lg font-bold text-blue-900">{title}</h3>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader className="animate-spin" size={24} />
          <span className="ml-2">Generating recommendation...</span>
        </div>
      ) : (
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
