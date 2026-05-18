import express from 'express';
import * as analyticsController from '../controllers/analyticsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Root analytics endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Analytics API',
    endpoints: {
      data: '/api/analytics/data',
      department: '/api/analytics/department/:department',
      trends: '/api/analytics/trends',
    },
  });
});

router.get('/data', authMiddleware, analyticsController.getAnalyticsData);
router.get('/department/:department', authMiddleware, analyticsController.getDepartmentAnalytics);
router.get('/trends', authMiddleware, analyticsController.getPerformanceTrends);

export default router;
