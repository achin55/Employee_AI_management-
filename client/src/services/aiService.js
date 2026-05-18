import api from './api';

export const aiService = {
  getPromotionRecommendation: async (employeeId) => {
    const response = await api.get(`/ai/promotion/${employeeId}`);
    return response.data;
  },

  getEmployeeRanking: async (department = null) => {
    const response = await api.get('/ai/ranking', {
      params: { ...(department && { department }) },
    });
    return response.data;
  },

  getTrainingSuggestions: async (employeeId) => {
    const response = await api.get(`/ai/training/${employeeId}`);
    return response.data;
  },

  getAIFeedback: async (employeeId) => {
    const response = await api.get(`/ai/feedback/${employeeId}`);
    return response.data;
  },

  getComprehensiveAnalysis: async (employeeId) => {
    const response = await api.get(`/ai/analysis/${employeeId}`);
    return response.data;
  },
};
