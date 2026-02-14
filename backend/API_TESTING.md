# API Testing Guide

## Quick Start

1. Start the server:
```bash
cd backend
npm run server
```

Server will run on: `http://localhost:5000`

## Test the APIs

### 1. Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"password123\",\"phone\":\"1234567890\"}"
```

### 2. Register an Admin
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Admin User\",\"email\":\"admin@example.com\",\"password\":\"admin123\",\"phone\":\"9876543210\",\"role\":\"admin\"}"
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"john@example.com\",\"password\":\"password123\"}"
```

**Save the token from response!**

### 4. Get Current User Info
```bash
curl -X GET http://localhost:5000/api/auth/me ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 5. Create an Issue Report
```bash
curl -X POST http://localhost:5000/api/issues ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -F "title=Large pothole on Main Street" ^
  -F "description=Deep pothole causing accidents" ^
  -F "category=Pothole" ^
  -F "coordinates=[77.5946,12.9716]" ^
  -F "address=Main Street, near City Mall" ^
  -F "priority=High" ^
  -F "image=@path/to/your/image.jpg"
```

### 6. Get All Issues
```bash
curl -X GET "http://localhost:5000/api/issues?page=1&limit=10" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 7. Filter Issues by Status
```bash
curl -X GET "http://localhost:5000/api/issues?status=Pending" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 8. Get Nearby Issues (within 5km)
```bash
curl -X GET "http://localhost:5000/api/issues/nearby/77.5946/12.9716/5" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 9. Update Issue Status (Admin Only)
```bash
curl -X PUT http://localhost:5000/api/issues/ISSUE_ID_HERE/status ^
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" ^
  -H "Content-Type: application/json" ^
  -d "{\"status\":\"Verified\",\"adminNotes\":\"Confirmed location\"}"
```

### 10. Get Issue Statistics (Admin Only)
```bash
curl -X GET http://localhost:5000/api/issues/admin/stats ^
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

## Using Postman

1. Import the following as a collection:
   - Base URL: `http://localhost:5000`
   - Create requests for each endpoint above
   - Set Authorization tab to "Bearer Token" and paste your JWT

2. For file upload:
   - Set Body to "form-data"
   - Add all fields as text except "image"
   - For "image", select "File" type and choose an image

## Testing with Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new request
3. Set method (GET, POST, PUT)
4. Add URL
5. Add Authorization header: `Bearer YOUR_TOKEN`
6. For POST requests, add body as JSON or Form

---

## Sample Data

### Categories
- Pothole
- Broken Streetlight
- Garbage Overflow
- Water Leakage
- Road Damage
- Other

### Statuses
- Pending (default for new issues)
- Verified (admin verified)
- In Progress (being fixed)
- Resolved (fixed)
- Rejected (invalid)

### Priorities
- Low
- Medium (default)
- High
- Critical

### Sample Coordinates (Bangalore)
- MG Road: [77.6040, 12.9762]
- Whitefield: [77.7500, 12.9698]
- Koramangala: [77.6270, 12.9352]
- Indiranagar: [77.6408, 12.9784]
