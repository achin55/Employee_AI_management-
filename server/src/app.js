import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import { loggerMiddleware } from './middleware/loggerMiddleware.js';
import { errorMiddleware, notFoundMiddleware } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// Database Connection
connectDB();

// Routes
app.use('/api', routes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 Handler
app.use(notFoundMiddleware);

// Error Handler
app.use(errorMiddleware);

export default app;
