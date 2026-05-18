import api from './api';

export const employeeService = {
  createEmployee: async (employeeData) => {
    const response = await api.post('/employees', employeeData);
    return response.data;
  },

  getAllEmployees: async (params = {}) => {
    const response = await api.get('/employees', { params });
    return response.data;
  },

  getEmployeeById: async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },

  updateEmployee: async (id, employeeData) => {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
  },

  deleteEmployee: async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  },

  searchEmployees: async (query) => {
    const response = await api.get('/employees/search', { params: { q: query } });
    return response.data;
  },

  filterEmployees: async (filters) => {
    const response = await api.post('/employees/filter', filters);
    return response.data;
  },

  getTopPerformers: async (limit = 10) => {
    const response = await api.get('/employees/top-performers', {
      params: { limit },
    });
    return response.data;
  },

  getEmployeesByDepartment: async (department) => {
    const response = await api.get(`/employees/department/${department}`);
    return response.data;
  },

  getEmployeesBySkill: async (skill) => {
    const response = await api.get(`/employees/skill/${skill}`);
    return response.data;
  },
};
