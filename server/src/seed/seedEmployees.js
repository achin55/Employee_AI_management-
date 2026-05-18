import mongoose from 'mongoose';
import Employee from '../models/Employee.js';
import connectDB from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleEmployees = [
  {
    name: 'Aman Verma',
    email: 'aman.verma@company.com',
    phone: '+91-9876543210',
    department: 'Development',
    position: 'Senior Developer',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
    performanceScore: 92,
    experience: 5,
    salary: 80000,
    manager: 'Raj Kumar',
    projects: ['E-Commerce Platform', 'AI Dashboard'],
    certifications: ['AWS Solutions Architect', 'React Certified'],
    ratings: {
      teamwork: 5,
      communication: 4,
      problemSolving: 5,
      leadership: 4,
      technical: 5,
    },
    promotionEligible: true,
    trainingNeeded: [],
    status: 'active',
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@company.com',
    phone: '+91-9876543211',
    department: 'Design',
    position: 'UI/UX Designer',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    performanceScore: 88,
    experience: 3,
    salary: 65000,
    manager: 'Raj Kumar',
    projects: ['Mobile App Redesign'],
    certifications: ['Google UX Certificate'],
    ratings: {
      teamwork: 4,
      communication: 5,
      problemSolving: 4,
      leadership: 3,
      technical: 4,
    },
    promotionEligible: false,
    trainingNeeded: ['Leadership'],
    status: 'active',
  },
  {
    name: 'Rahul Kumar',
    email: 'rahul.kumar@company.com',
    phone: '+91-9876543212',
    department: 'Development',
    position: 'Junior Developer',
    skills: ['JavaScript', 'React', 'HTML/CSS'],
    performanceScore: 72,
    experience: 1,
    salary: 45000,
    manager: 'Aman Verma',
    projects: ['Frontend Enhancement'],
    certifications: [],
    ratings: {
      teamwork: 3,
      communication: 3,
      problemSolving: 3,
      leadership: 2,
      technical: 3,
    },
    promotionEligible: false,
    trainingNeeded: ['Advanced JavaScript', 'Backend Development'],
    status: 'active',
  },
  {
    name: 'Neha Singh',
    email: 'neha.singh@company.com',
    phone: '+91-9876543213',
    department: 'Marketing',
    position: 'Marketing Manager',
    skills: ['Digital Marketing', 'SEO', 'Social Media', 'Analytics'],
    performanceScore: 85,
    experience: 4,
    salary: 70000,
    manager: 'CEO',
    projects: ['Brand Campaign 2024'],
    certifications: ['Google Analytics', 'Digital Marketing'],
    ratings: {
      teamwork: 4,
      communication: 5,
      problemSolving: 4,
      leadership: 4,
      technical: 3,
    },
    promotionEligible: true,
    trainingNeeded: [],
    status: 'active',
  },
  {
    name: 'Vikram Patel',
    email: 'vikram.patel@company.com',
    phone: '+91-9876543214',
    department: 'Finance',
    position: 'Financial Analyst',
    skills: ['Excel', 'Python', 'Financial Modeling', 'Tableau'],
    performanceScore: 78,
    experience: 2,
    salary: 55000,
    manager: 'CFO',
    projects: ['Budget Forecasting'],
    certifications: ['CPA'],
    ratings: {
      teamwork: 3,
      communication: 3,
      problemSolving: 4,
      leadership: 2,
      technical: 4,
    },
    promotionEligible: false,
    trainingNeeded: ['Leadership', 'Communication'],
    status: 'active',
  },
  {
    name: 'Ananya Das',
    email: 'ananya.das@company.com',
    phone: '+91-9876543215',
    department: 'HR',
    position: 'HR Manager',
    skills: ['Recruitment', 'Employee Relations', 'Payroll', 'Training'],
    performanceScore: 86,
    experience: 6,
    salary: 72000,
    manager: 'CEO',
    projects: ['Employee Engagement Program'],
    certifications: ['SHRM-CP'],
    ratings: {
      teamwork: 5,
      communication: 5,
      problemSolving: 4,
      leadership: 5,
      technical: 3,
    },
    promotionEligible: true,
    trainingNeeded: [],
    status: 'active',
  },
  {
    name: 'Arjun Nair',
    email: 'arjun.nair@company.com',
    phone: '+91-9876543216',
    department: 'Operations',
    position: 'Operations Coordinator',
    skills: ['Process Management', 'Excel', 'Documentation'],
    performanceScore: 65,
    experience: 1,
    salary: 40000,
    manager: 'Ananya Das',
    projects: ['Process Automation'],
    certifications: [],
    ratings: {
      teamwork: 2,
      communication: 2,
      problemSolving: 2,
      leadership: 1,
      technical: 2,
    },
    promotionEligible: false,
    trainingNeeded: ['Communication', 'Leadership', 'Technical Skills'],
    status: 'active',
  },
  {
    name: 'Sanya Desai',
    email: 'sanya.desai@company.com',
    phone: '+91-9876543217',
    department: 'Development',
    position: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'MongoDB', 'PostgreSQL', 'Docker'],
    performanceScore: 90,
    experience: 4,
    salary: 85000,
    manager: 'Aman Verma',
    projects: ['API Development', 'Database Optimization'],
    certifications: ['AWS Developer Associate'],
    ratings: {
      teamwork: 4,
      communication: 4,
      problemSolving: 5,
      leadership: 4,
      technical: 5,
    },
    promotionEligible: true,
    trainingNeeded: [],
    status: 'active',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Drop old indexes and clear existing employees
    try {
      await Employee.collection.dropIndex('name_text_email_text_department_1_skills_1');
    } catch (err) {
      // Index might not exist, that's okay
    }
    
    await Employee.deleteMany({});
    await Employee.collection.dropIndexes().catch(() => {});

    // Insert sample data
    await Employee.insertMany(sampleEmployees);

    console.log('✓ Database seeded successfully with sample employees');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
