# Employee AI System - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### 1. Signup
- **POST** `/auth/signup`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```
- **Response:** `{ token, user }`

### 2. Login
- **POST** `/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:** `{ token, user }`

### 3. Get Profile
- **GET** `/auth/profile`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** `{ user }`

### 4. Update Profile
- **PUT** `/auth/profile`
- **Headers:** `Authorization: Bearer {token}`
- **Body:**
```json
{
  "name": "Updated Name",
  "profilePicture": "url"
}
```

## Employee Endpoints

### 1. Create Employee
- **POST** `/employees`
- **Headers:** `Authorization: Bearer {token}`
- **Body:**
```json
{
  "name": "Aman Verma",
  "email": "aman@company.com",
  "department": "Development",
  "position": "Senior Developer",
  "skills": ["React", "Node.js", "MongoDB"],
  "performanceScore": 85,
  "experience": 3,
  "phone": "+91-9876543210",
  "salary": 80000,
  "manager": "Raj Kumar",
  "status": "active"
}
```

### 2. Get All Employees
- **GET** `/employees`
- **Query Parameters:**
  - `page` (default: 1)
  - `limit` (default: 10)
  - `department`
  - `status`
  - `minPerformance`
- **Headers:** `Authorization: Bearer {token}`

### 3. Get Employee by ID
- **GET** `/employees/:id`
- **Headers:** `Authorization: Bearer {token}`

### 4. Update Employee
- **PUT** `/employees/:id`
- **Headers:** `Authorization: Bearer {token}`
- **Body:** Same as Create Employee

### 5. Delete Employee
- **DELETE** `/employees/:id`
- **Headers:** `Authorization: Bearer {token}`

### 6. Search Employees
- **GET** `/employees/search?q=searchTerm`
- **Headers:** `Authorization: Bearer {token}`

### 7. Filter Employees
- **POST** `/employees/filter`
- **Headers:** `Authorization: Bearer {token}`
- **Body:**
```json
{
  "department": "Development",
  "skill": "React",
  "minPerformance": 70,
  "status": "active"
}
```

### 8. Top Performers
- **GET** `/employees/top-performers?limit=10`
- **Headers:** `Authorization: Bearer {token}`

### 9. Get by Department
- **GET** `/employees/department/:department`
- **Headers:** `Authorization: Bearer {token}`

### 10. Get by Skill
- **GET** `/employees/skill/:skill`
- **Headers:** `Authorization: Bearer {token}`

## AI Endpoints

### 1. Promotion Recommendation
- **GET** `/ai/promotion/:employeeId`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** AI-generated promotion assessment

### 2. Employee Ranking
- **GET** `/ai/ranking?department=Development`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** AI-generated ranking

### 3. Training Suggestions
- **GET** `/ai/training/:employeeId`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** AI-generated training recommendations

### 4. AI Feedback
- **GET** `/ai/feedback/:employeeId`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** AI-generated feedback

### 5. Comprehensive Analysis
- **GET** `/ai/analysis/:employeeId`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** Complete AI analysis

## Analytics Endpoints

### 1. Get Analytics Data
- **GET** `/analytics/data`
- **Headers:** `Authorization: Bearer {token}`
- **Response:** Overall analytics including trends and stats

### 2. Department Analytics
- **GET** `/analytics/department/:department`
- **Headers:** `Authorization: Bearer {token}`

### 3. Performance Trends
- **GET** `/analytics/trends`
- **Headers:** `Authorization: Bearer {token}`

## Error Responses

All endpoints return errors in the following format:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Status Codes
- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error
