import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import EmployeeForm from '../components/employee/EmployeeForm';
import { employeeService } from '../services/employeeService';
import toast from 'react-hot-toast';

export const AddEmployee = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await employeeService.createEmployee(formData);
      toast.success('Employee added successfully!');
      navigate('/employees');
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Failed to add employee';
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 fade-in">
        <h1 className="text-3xl font-bold">Add New Employee</h1>
        <EmployeeForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </MainLayout>
  );
};

export default AddEmployee;
