import express from 'express';
import * as aiController from '../controllers/aiController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/promotion/:employeeId', authMiddleware, aiController.getPromotionRecommendation);
router.get('/ranking', authMiddleware, aiController.getEmployeeRanking);
router.get('/training/:employeeId', authMiddleware, aiController.getTrainingSuggestions);
router.get('/feedback/:employeeId', authMiddleware, aiController.getAIFeedback);
router.get('/analysis/:employeeId', authMiddleware, aiController.getComprehensiveAnalysis);

export default router;
