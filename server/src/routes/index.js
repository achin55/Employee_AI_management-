import express from 'express';
import authRoutes from './authRoutes.js';
import employeeRoutes from './employeeRoutes.js';
import aiRoutes from './aiRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/employees', employeeRoutes);
router.use('/ai', aiRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
