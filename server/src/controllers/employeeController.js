import * as employeeService from '../services/employeeService.js';
import { responseHandler } from '../utils/responseHandler.js';

export const createEmployee = async (req, res, next) => {
  try {
    const employeeData = req.body;

    const employee = await employeeService.createEmployee(employeeData);

    return responseHandler.created(res, 'Employee created successfully', { employee });
  } catch (error) {
    if (error.code === 11000) {
      return responseHandler.error(res, 400, 'Email already exists');
    }
    return responseHandler.error(res, 500, error.message);
  }
};

export const getAllEmployees = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, department, status, minPerformance } = req.query;

    const filters = {
      ...(department && { department }),
      ...(status && { status }),
      ...(minPerformance && { minPerformance: Number(minPerformance) }),
    };

    const sort = req.query.sort ? JSON.parse(req.query.sort) : { createdAt: -1 };

    const result = await employeeService.getAllEmployees(
      filters,
      sort,
      Number(page),
      Number(limit)
    );

    return responseHandler.success(res, 200, 'Employees fetched', result);
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await employeeService.getEmployeeById(id);

    if (!employee) {
      return responseHandler.notFound(res, 'Employee not found');
    }

    return responseHandler.success(res, 200, 'Employee fetched', { employee });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const employee = await employeeService.updateEmployee(id, updateData);

    if (!employee) {
      return responseHandler.notFound(res, 'Employee not found');
    }

    return responseHandler.success(res, 200, 'Employee updated', { employee });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await employeeService.deleteEmployee(id);

    if (!employee) {
      return responseHandler.notFound(res, 'Employee not found');
    }

    return responseHandler.success(res, 200, 'Employee deleted', { employee });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const searchEmployees = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return responseHandler.badRequest(res, 'Search query is required');
    }

    const employees = await employeeService.searchEmployees(q);

    return responseHandler.success(res, 200, 'Employees searched', { employees });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const filterEmployees = async (req, res, next) => {
  try {
    const filters = req.body;

    const employees = await employeeService.filterEmployees(filters);

    return responseHandler.success(res, 200, 'Employees filtered', { employees });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const getTopPerformers = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    const employees = await employeeService.getTopPerformers(Number(limit));

    return responseHandler.success(res, 200, 'Top performers fetched', { employees });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const getEmployeesByDepartment = async (req, res, next) => {
  try {
    const { department } = req.params;

    const employees = await employeeService.getEmployeesByDepartment(department);

    return responseHandler.success(res, 200, 'Department employees fetched', { employees });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const getEmployeesBySkill = async (req, res, next) => {
  try {
    const { skill } = req.params;

    const employees = await employeeService.getEmployeesBySkill(skill);

    return responseHandler.success(res, 200, 'Skill-based employees fetched', { employees });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};
