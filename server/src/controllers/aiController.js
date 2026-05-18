import * as aiService from '../services/aiService.js';
import * as employeeService from '../services/employeeService.js';
import { responseHandler } from '../utils/responseHandler.js';

export const getPromotionRecommendation = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const employee = await employeeService.getEmployeeById(employeeId);

    if (!employee) {
      return responseHandler.notFound(res, 'Employee not found');
    }

    const recommendation = await aiService.generatePromotionRecommendation(employee);

    return responseHandler.success(res, 200, 'Promotion recommendation generated', {
      employeeId,
      recommendation,
    });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const getEmployeeRanking = async (req, res, next) => {
  try {
    const { department } = req.query;

    let employees;

    if (department) {
      employees = await employeeService.getEmployeesByDepartment(department);
    } else {
      const result = await employeeService.getAllEmployees({}, { performanceScore: -1 }, 1, 100);
      employees = result.employees;
    }

    if (!employees || employees.length === 0) {
      return responseHandler.notFound(res, 'No employees found');
    }

    const ranking = await aiService.generateEmployeeRanking(employees);

    return responseHandler.success(res, 200, 'Employee ranking generated', { ranking });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const getTrainingSuggestions = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const employee = await employeeService.getEmployeeById(employeeId);

    if (!employee) {
      return responseHandler.notFound(res, 'Employee not found');
    }

    const suggestions = await aiService.generateTrainingSuggestions(employee);

    return responseHandler.success(res, 200, 'Training suggestions generated', {
      employeeId,
      suggestions,
    });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const getAIFeedback = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const employee = await employeeService.getEmployeeById(employeeId);

    if (!employee) {
      return responseHandler.notFound(res, 'Employee not found');
    }

    const feedback = await aiService.generateAIFeedback(employee);

    return responseHandler.success(res, 200, 'AI feedback generated', {
      employeeId,
      feedback,
    });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const getComprehensiveAnalysis = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const employee = await employeeService.getEmployeeById(employeeId);

    if (!employee) {
      return responseHandler.notFound(res, 'Employee not found');
    }

    const analysis = await aiService.generateComprehensiveAnalysis(employee);

    return responseHandler.success(res, 200, 'Comprehensive analysis generated', {
      employeeId,
      analysis,
    });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};
