import React from 'react';

export const FilterBox = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <h3 className="font-bold text-lg">Filters</h3>

      <div>
        <label className="block text-sm font-semibold mb-2">Department</label>
        <select
          value={filters.department || ''}
          onChange={(e) =>
            onFilterChange({ ...filters, department: e.target.value })
          }
          className="input-field"
        >
          <option value="">All Departments</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Min Performance Score
        </label>
        <input
          type="number"
          min="0"
          max="100"
          value={filters.minPerformance || 0}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              minPerformance: parseInt(e.target.value),
            })
          }
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Status</label>
        <select
          value={filters.status || ''}
          onChange={(e) =>
            onFilterChange({ ...filters, status: e.target.value })
          }
          className="input-field"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="on-leave">On Leave</option>
        </select>
      </div>

      <button
        onClick={() =>
          onFilterChange({ department: '', status: '', minPerformance: 0 })
        }
        className="w-full btn-secondary"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBox;
