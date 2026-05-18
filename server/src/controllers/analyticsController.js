import * as analyticsService from '../services/analyticsService.js';
import { responseHandler } from '../utils/responseHandler.js';

export const getAnalyticsData = async (req, res, next) => {
  try {
    const data = await analyticsService.getAnalyticsData();

    return responseHandler.success(res, 200, 'Analytics data fetched', data);
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const getDepartmentAnalytics = async (req, res, next) => {
  try {
    const { department } = req.params;

    const data = await analyticsService.getDepartmentAnalytics(department);

    return responseHandler.success(res, 200, 'Department analytics fetched', data);
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const getPerformanceTrends = async (req, res, next) => {
  try {
    const trends = await analyticsService.getPerformanceTrends();

    return responseHandler.success(res, 200, 'Performance trends fetched', { trends });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};
