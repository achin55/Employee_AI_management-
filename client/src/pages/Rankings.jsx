import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { employeeService } from '../services/employeeService';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';
import EmployeeRanking from '../components/employee/EmployeeRanking';
import { TrendingUp } from 'lucide-react';

export const Rankings = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [allDepartments, setAllDepartments] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, [selectedDepartment]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await employeeService.getAllEmployees({ limit: 1000 });
      const emps = response.data.employees;

      // Extract departments
      const departments = [...new Set(emps.map((e) => e.department))];
      setAllDepartments(departments);

      // Filter by department if selected
      const filtered = selectedDepartment
        ? emps.filter((e) => e.department === selectedDepartment)
        : emps;

      setEmployees(filtered);
    } catch (error) {
      toast.error('Failed to fetch rankings');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <MainLayout>
      <div className="space-y-6 fade-in">
        <div className="flex items-center space-x-2 mb-8">
          <TrendingUp size={32} className="text-green-600" />
          <h1 className="text-3xl font-bold">Employee Rankings</h1>
        </div>

        {/* Department Filter */}
        <div className="card">
          <label className="block text-sm font-semibold mb-3">Filter by Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="input-field w-full md:w-1/3"
          >
            <option value="">All Departments</option>
            {allDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Rankings */}
        <EmployeeRanking employees={employees} />
      </div>
    </MainLayout>
  );
};

export default Rankings;
