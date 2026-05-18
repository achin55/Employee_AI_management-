export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculateAverageRating = (ratings) => {
  const values = Object.values(ratings || {});
  if (values.length === 0) return 0;
  return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
};

export const getPerformanceColor = (score) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

export const getPerformanceBgColor = (score) => {
  if (score >= 80) return 'bg-green-100';
  if (score >= 60) return 'bg-yellow-100';
  return 'bg-red-100';
};

export const truncateText = (text, length = 100) => {
  if (text && text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sortEmployeesByPerformance = (employees) => {
  return [...employees].sort(
    (a, b) => b.performanceScore - a.performanceScore
  );
};

export const groupEmployeesByDepartment = (employees) => {
  return employees.reduce((acc, emp) => {
    if (!acc[emp.department]) {
      acc[emp.department] = [];
    }
    acc[emp.department].push(emp);
    return acc;
  }, {});
};

export const extractUniqueSkills = (employees) => {
  const skills = new Set();
  employees.forEach((emp) => {
    emp.skills.forEach((skill) => skills.add(skill));
  });
  return Array.from(skills);
};
