import express from 'express';
import authRoutes from './authRoutes.js';
import employeeRoutes from './employeeRoutes.js';
import aiRoutes from './aiRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';

const router = express.Router();

// Root API endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Employee AI Management System API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      employees: '/api/employees',
      ai: '/api/ai',
      analytics: '/api/analytics',
    },
  });
});

router.use('/auth', authRoutes);
router.use('/employees', employeeRoutes);
router.use('/ai', aiRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
