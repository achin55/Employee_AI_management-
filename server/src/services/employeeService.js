import Employee from '../models/Employee.js';

export const createEmployee = async (employeeData) => {
  try {
    const employee = new Employee(employeeData);
    await employee.save();
    return employee;
  } catch (error) {
    throw error;
  }
};

export const getAllEmployees = async (filters = {}, sort = {}, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const query = {};

    if (filters.department) {
      query.department = filters.department;
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.skills && filters.skills.length > 0) {
      query.skills = { $in: filters.skills };
    }

    if (filters.minPerformance) {
      query.performanceScore = { $gte: filters.minPerformance };
    }

    const employees = await Employee.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Employee.countDocuments(query);

    return {
      employees,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  try {
    const employee = await Employee.findById(id);
    return employee;
  } catch (error) {
    throw error;
  }
};

export const updateEmployee = async (id, updateData) => {
  try {
    const employee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    return employee;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const employee = await Employee.findByIdAndDelete(id);
    return employee;
  } catch (error) {
    throw error;
  }
};

export const searchEmployees = async (searchTerm) => {
  try {
    const employees = await Employee.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { position: { $regex: searchTerm, $options: 'i' } },
        { skills: { $regex: searchTerm, $options: 'i' } },
      ],
    });
    return employees;
  } catch (error) {
    throw error;
  }
};

export const filterEmployees = async (filters) => {
  try {
    const query = {};

    if (filters.department) {
      query.department = filters.department;
    }

    if (filters.skill) {
      query.skills = { $in: [filters.skill] };
    }

    if (filters.minPerformance) {
      query.performanceScore = { $gte: filters.minPerformance };
    }

    if (filters.maxPerformance) {
      if (!query.performanceScore) {
        query.performanceScore = {};
      }
      query.performanceScore.$lte = filters.maxPerformance;
    }

    if (filters.status) {
      query.status = filters.status;
    }

    const employees = await Employee.find(query).sort({ performanceScore: -1 });
    return employees;
  } catch (error) {
    throw error;
  }
};

export const getTopPerformers = async (limit = 10) => {
  try {
    const employees = await Employee.find()
      .sort({ performanceScore: -1 })
      .limit(limit);
    return employees;
  } catch (error) {
    throw error;
  }
};

export const getEmployeesByDepartment = async (department) => {
  try {
    const employees = await Employee.find({ department });
    return employees;
  } catch (error) {
    throw error;
  }
};

export const getEmployeesBySkill = async (skill) => {
  try {
    const employees = await Employee.find({ skills: skill });
    return employees;
  } catch (error) {
    throw error;
  }
};
