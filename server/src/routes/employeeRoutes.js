import express from 'express';
import * as employeeController from '../controllers/employeeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateEmployee, validateRequest } from '../middleware/validateMiddleware.js';

const router = express.Router();

// ==============================
// PUBLIC ROUTES (No Authentication Required)
// ==============================

// Get all employees
router.get('/', employeeController.getAllEmployees);

// Get employee by ID
router.get('/:id', employeeController.getEmployeeById);

// Get top performers
router.get('/top-performers', employeeController.getTopPerformers);

// Search employees
router.get('/search', employeeController.searchEmployees);

// Get employees by department
router.get('/department/:department', employeeController.getEmployeesByDepartment);

// Get employees by skill
router.get('/skill/:skill', employeeController.getEmployeesBySkill);

// ==============================
// PROTECTED ROUTES (Require JWT Authentication)
// ==============================

// Create employee
router.post('/', authMiddleware, validateEmployee, validateRequest, employeeController.createEmployee);

// Filter employees
router.post('/filter', authMiddleware, employeeController.filterEmployees);

// Update employee
router.put('/:id', authMiddleware, employeeController.updateEmployee);

// Delete employee
router.delete('/:id', authMiddleware, employeeController.deleteEmployee);

export default router;
