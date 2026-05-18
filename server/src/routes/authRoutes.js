import express from 'express';
import * as authController from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  validateSignup,
  validateLogin,
  validateRequest,
} from '../middleware/validateMiddleware.js';

const router = express.Router();

router.post('/signup', validateSignup, validateRequest, authController.signup);
router.post('/login', validateLogin, validateRequest, authController.login);
router.get('/profile', authMiddleware, authController.getProfile);
router.put('/profile', authMiddleware, authController.updateProfile);
router.get('/users', authMiddleware, authController.getAllUsers);

export default router;
