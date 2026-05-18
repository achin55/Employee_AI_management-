import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { employeeService } from '../services/employeeService';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';
import SearchBar from '../components/common/SearchBar';
import FilterBox from '../components/common/FilterBox';
import EmployeeList from '../components/employee/EmployeeList';
import Pagination from '../components/common/Pagination';

export const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    minPerformance: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, filters]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await employeeService.getAllEmployees({
        page: currentPage,
        limit: 10,
        ...filters,
      });

      setEmployees(response.data.employees);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      toast.error('Failed to fetch employees');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length > 2) {
      searchEmployees(value);
    }
  };

  const searchEmployees = async (query) => {
    try {
      const response = await employeeService.searchEmployees(query);
      setEmployees(response.data.employees);
    } catch (error) {
      toast.error('Search failed');
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeService.deleteEmployee(id);
        toast.success('Employee deleted successfully');
        fetchEmployees();
      } catch (error) {
        toast.error('Failed to delete employee');
      }
    }
  };

  const handleEditEmployee = (id) => {
    navigate(`/employees/${id}/edit`);
  };

  if (isLoading && currentPage === 1) return <Loader />;

  return (
    <MainLayout>
      <div className="space-y-6 fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Employees</h1>
          <button
            onClick={() => navigate('/employees/add')}
            className="btn-primary"
          >
            Add New Employee
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <SearchBar
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search employees..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1">
            <FilterBox filters={filters} onFilterChange={setFilters} />
          </div>

          <div className="lg:col-span-3">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <EmployeeList
                  employees={employees}
                  onDelete={handleDeleteEmployee}
                  onEdit={handleEditEmployee}
                />
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Employees;
