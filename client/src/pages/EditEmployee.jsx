import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import EmployeeForm from '../components/employee/EmployeeForm';
import { employeeService } from '../services/employeeService';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';

export const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await employeeService.getEmployeeById(id);
      setEmployee(response.data.employee);
    } catch (error) {
      toast.error('Failed to fetch employee');
      navigate('/employees');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await employeeService.updateEmployee(id, formData);
      toast.success('Employee updated successfully!');
      navigate(`/employees/${id}`);
    } catch (error) {
      toast.error('Failed to update employee');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !employee) return <Loader />;

  return (
    <MainLayout>
      <div className="space-y-6 fade-in">
        <h1 className="text-3xl font-bold">Edit Employee</h1>
        <EmployeeForm onSubmit={handleSubmit} initialData={employee} isLoading={isLoading} />
      </div>
    </MainLayout>
  );
};

export default EditEmployee;
