# Installation & Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- OpenRouter API key

## Project Structure
```
employee-ai-system/
├── client/          # React frontend
├── server/          # Express backend
├── package.json     # Root package
└── docker-compose.yml
```

## Installation Steps

### 1. Clone or Setup Project
```bash
cd employee-ai-system
```

### 2. Install Dependencies
```bash
# Install all dependencies
npm run install-all

# Or manually:
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 3. Environment Setup

#### Server (.env)
Create `server/.env`:
```
PORT=5000
MONGO_URI=mongodb://Achin:admin@ac-gkxo5tk-shard-00-00.nooj3hz.mongodb.net:27017,ac-gkxo5tk-shard-00-01.nooj3hz.mongodb.net:27017,ac-gkxo5tk-shard-00-02.nooj3hz.mongodb.net:27017/Employee_ESE?ssl=true&replicaSet=atlas-12738f-shard-0&authSource=admin&appName=Cluster5
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
OPENROUTER_API_KEY=your_openrouter_api_key_here
NODE_ENV=development
```

#### Client (.env)
Create `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Employee AI System
```

### 4. Database Setup (Optional - if using local MongoDB)
```bash
mongod
```

### 5. Seed Sample Data (Optional)
```bash
cd server
npm run seed
```

## Running the Application

### Development Mode
```bash
# From root directory
npm run dev

# Or separately:
npm run dev:client      # Terminal 1
npm run dev:server      # Terminal 2
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API: http://localhost:5000/api

### Production Build
```bash
npm run build
npm run start
```

## Docker Setup

### Using Docker Compose
```bash
docker-compose up -d
```

Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

Stop containers:
```bash
docker-compose down
```

## First Time Setup

1. **Sign Up** - Create a new account at `/signup`
2. **Login** - Login with your credentials
3. **Dashboard** - View the dashboard
4. **Add Employees** - Add employee data manually or seed the database
5. **Analytics** - View employee analytics and performance metrics
6. **AI Features** - Generate AI recommendations for employees

## Default Seeded Employees (if using seed)
- Aman Verma (Development) - Performance: 92%
- Priya Sharma (Design) - Performance: 88%
- Rahul Kumar (Development) - Performance: 72%
- Neha Singh (Marketing) - Performance: 85%
- Vikram Patel (Finance) - Performance: 78%
- Ananya Das (HR) - Performance: 86%
- Arjun Nair (Operations) - Performance: 65%
- Sanya Desai (Development) - Performance: 90%

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - User login
- GET `/api/auth/profile` - Get user profile

### Employees
- GET `/api/employees` - Get all employees
- POST `/api/employees` - Create new employee
- GET `/api/employees/:id` - Get employee by ID
- PUT `/api/employees/:id` - Update employee
- DELETE `/api/employees/:id` - Delete employee
- GET `/api/employees/search?q=term` - Search employees
- POST `/api/employees/filter` - Filter employees

### AI Features
- GET `/api/ai/promotion/:employeeId` - Get promotion recommendation
- GET `/api/ai/training/:employeeId` - Get training suggestions
- GET `/api/ai/feedback/:employeeId` - Get AI feedback
- GET `/api/ai/analysis/:employeeId` - Get comprehensive analysis
- GET `/api/ai/ranking` - Get employee ranking

### Analytics
- GET `/api/analytics/data` - Get analytics data
- GET `/api/analytics/department/:department` - Department analytics
- GET `/api/analytics/trends` - Performance trends

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error
- Verify MongoDB URI is correct
- Check if MongoDB service is running
- Ensure IP whitelist is configured in MongoDB Atlas

### API Not Responding
- Check if backend server is running
- Verify API URL in frontend .env file
- Check CORS settings in backend

### CORS Issues
The backend is configured with CORS enabled. If issues persist, check server configuration.

## Performance Tips
- Use pagination for large datasets
- Cache API responses where possible
- Optimize database queries with indexes
- Use CDN for static assets in production

## Security Notes
- Change JWT_SECRET in production
- Store API keys securely
- Use HTTPS in production
- Implement rate limiting
- Validate all inputs on backend

## Support
For issues or questions, refer to the API documentation in `server/src/docs/api-docs.md`
