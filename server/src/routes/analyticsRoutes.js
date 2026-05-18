import express from 'express';
import * as analyticsController from '../controllers/analyticsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/data', authMiddleware, analyticsController.getAnalyticsData);
router.get('/department/:department', authMiddleware, analyticsController.getDepartmentAnalytics);
router.get('/trends', authMiddleware, analyticsController.getPerformanceTrends);

export default router;
