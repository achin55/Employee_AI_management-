import express from 'express';
import * as employeeController from '../controllers/employeeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateEmployee, validateRequest } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, validateEmployee, validateRequest, employeeController.createEmployee);
router.get('/', authMiddleware, employeeController.getAllEmployees);
router.get('/top-performers', authMiddleware, employeeController.getTopPerformers);
router.get('/search', authMiddleware, employeeController.searchEmployees);
router.post('/filter', authMiddleware, employeeController.filterEmployees);
router.get('/department/:department', authMiddleware, employeeController.getEmployeesByDepartment);
router.get('/skill/:skill', authMiddleware, employeeController.getEmployeesBySkill);
router.get('/:id', authMiddleware, employeeController.getEmployeeById);
router.put('/:id', authMiddleware, employeeController.updateEmployee);
router.delete('/:id', authMiddleware, employeeController.deleteEmployee);

export default router;
