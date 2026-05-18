export const DEPARTMENTS = [
  'Development',
  'Design',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Operations',
  'Management',
];

export const EMPLOYEE_STATUS = ['active', 'inactive', 'on-leave'];

export const SKILLS_OPTIONS = [
  'React',
  'Node.js',
  'MongoDB',
  'AWS',
  'Python',
  'JavaScript',
  'TypeScript',
  'Docker',
  'Kubernetes',
  'PostgreSQL',
  'MySQL',
  'HTML/CSS',
  'Figma',
  'Adobe XD',
  'Digital Marketing',
  'SEO',
  'Excel',
  'Tableau',
  'Leadership',
  'Communication',
];

export const RATING_SCALE = {
  1: 'Poor',
  2: 'Below Average',
  3: 'Average',
  4: 'Good',
  5: 'Excellent',
};

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
  },
  EMPLOYEES: {
    BASE: '/employees',
    SEARCH: '/employees/search',
    FILTER: '/employees/filter',
    TOP_PERFORMERS: '/employees/top-performers',
  },
  AI: {
    PROMOTION: '/ai/promotion',
    RANKING: '/ai/ranking',
    TRAINING: '/ai/training',
    FEEDBACK: '/ai/feedback',
    ANALYSIS: '/ai/analysis',
  },
  ANALYTICS: {
    DATA: '/analytics/data',
    DEPARTMENT: '/analytics/department',
    TRENDS: '/analytics/trends',
  },
};
