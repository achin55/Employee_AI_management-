export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateEmployeeForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Valid email is required';
  }

  if (!formData.department) {
    errors.department = 'Department is required';
  }

  if (!formData.position || formData.position.trim() === '') {
    errors.position = 'Position is required';
  }

  if (!Array.isArray(formData.skills) || formData.skills.length === 0) {
    errors.skills = 'At least one skill is required';
  }

  if (
    isNaN(formData.performanceScore) ||
    formData.performanceScore < 0 ||
    formData.performanceScore > 100
  ) {
    errors.performanceScore = 'Performance score must be between 0 and 100';
  }

  if (isNaN(formData.experience) || formData.experience < 0) {
    errors.experience = 'Experience must be a positive number';
  }

  return errors;
};

export const validateLoginForm = (formData) => {
  const errors = {};

  if (!validateEmail(formData.email)) {
    errors.email = 'Valid email is required';
  }

  if (!validatePassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

export const validateSignupForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Valid email is required';
  }

  if (!validatePassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};
