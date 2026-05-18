import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { DEPARTMENTS, SKILLS_OPTIONS } from '../../utils/constants';
import { validateEmployeeForm } from '../../utils/validators';

export const EmployeeForm = ({ onSubmit, initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      skills: [],
      performanceScore: 0,
      experience: 0,
      salary: 0,
      manager: '',
      status: 'active',
    }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['performanceScore', 'experience', 'salary'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSkillToggle = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateEmployeeForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the errors');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter employee name"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter email"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter phone number"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-semibold mb-2">Department *</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select Department</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-red-600 text-sm mt-1">{errors.department}</p>
          )}
        </div>

        {/* Position */}
        <div>
          <label className="block text-sm font-semibold mb-2">Position *</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter position"
          />
          {errors.position && <p className="text-red-600 text-sm mt-1">{errors.position}</p>}
        </div>

        {/* Manager */}
        <div>
          <label className="block text-sm font-semibold mb-2">Manager</label>
          <input
            type="text"
            name="manager"
            value={formData.manager}
            onChange={handleChange}
            className="input-field"
            placeholder="Manager name"
          />
        </div>

        {/* Performance Score */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Performance Score ({formData.performanceScore}/100) *
          </label>
          <input
            type="range"
            min="0"
            max="100"
            name="performanceScore"
            value={formData.performanceScore}
            onChange={handleChange}
            className="w-full"
          />
          {errors.performanceScore && (
            <p className="text-red-600 text-sm mt-1">{errors.performanceScore}</p>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Years of Experience *
          </label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="input-field"
            min="0"
            placeholder="0"
          />
          {errors.experience && (
            <p className="text-red-600 text-sm mt-1">{errors.experience}</p>
          )}
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-semibold mb-2">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="input-field"
            min="0"
            placeholder="0"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-field"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on-leave">On Leave</option>
          </select>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-6">
        <label className="block text-sm font-semibold mb-4">Skills *</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SKILLS_OPTIONS.map((skill) => (
            <label key={skill} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.skills.includes(skill)}
                onChange={() => handleSkillToggle(skill)}
                className="mr-2"
              />
              <span className="text-sm">{skill}</span>
            </label>
          ))}
        </div>
        {errors.skills && <p className="text-red-600 text-sm mt-2">{errors.skills}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full btn-primary disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : initialData ? 'Update Employee' : 'Add Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;
