import React, { createContext, useState, useCallback } from 'react';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    minPerformance: 0,
  });

  const updateEmployees = useCallback((newEmployees) => {
    setEmployees(newEmployees);
  }, []);

  const addEmployee = useCallback((employee) => {
    setEmployees((prev) => [employee, ...prev]);
  }, []);

  const removeEmployee = useCallback((employeeId) => {
    setEmployees((prev) => prev.filter((emp) => emp._id !== employeeId));
  }, []);

  const updateEmployee = useCallback((employeeId, updates) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp._id === employeeId ? { ...emp, ...updates } : emp))
    );
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const value = {
    employees,
    selectedEmployee,
    setSelectedEmployee,
    isLoading,
    setIsLoading,
    filters,
    updateEmployees,
    addEmployee,
    removeEmployee,
    updateEmployee,
    updateFilters,
  };

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
};
