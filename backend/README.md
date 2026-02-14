# Civic Issue Reporting System - Backend API

A comprehensive backend system for reporting and managing civic issues like potholes, broken streetlights, garbage overflow, and water leakage with location tracking and image evidence.

## Features

- 🔐 **User Authentication** - JWT-based auth with user and admin roles
- 📍 **Location Tracking** - Geospatial queries for finding nearby issues
- 📸 **Image Upload** - Multer-based image storage for issue evidence
- 👥 **Role-Based Access** - Separate permissions for users and admins
- 📊 **Admin Dashboard** - Statistics and issue management
- 🔄 **Status Tracking** - Track issues from Pending to Resolved
- 🗺️ **Nearby Issues** - Find issues within a specific radius

## Tech Stack

- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Geospatial Indexing** - Location-based queries

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account or local MongoDB

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

3. Run the server:
```bash
npm run server
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "role": "user"  // optional, defaults to "user"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

---

### Issue Management

#### Create Issue Report
```http
POST /api/issues
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Large pothole on Main Street",
  "description": "Deep pothole causing accidents",
  "category": "Pothole",
  "coordinates": [77.5946, 12.9716],  // [longitude, latitude]
  "address": "Main Street, near City Mall",
  "priority": "High",  // optional: Low, Medium, High, Critical
  "image": <file>
}
```

**Categories**: `Pothole`, `Broken Streetlight`, `Garbage Overflow`, `Water Leakage`, `Road Damage`, `Other`

#### Get All Issues (with filters)
```http
GET /api/issues?status=Pending&category=Pothole&page=1&limit=10
Authorization: Bearer <token>
```

Query Parameters:
- `status` - Filter by status (Pending, Verified, In Progress, Resolved, Rejected)
- `category` - Filter by category
- `priority` - Filter by priority
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Note**: Regular users only see their own issues. Admins see all issues.

#### Get Single Issue
```http
GET /api/issues/:id
Authorization: Bearer <token>
```

#### Get Nearby Issues
```http
GET /api/issues/nearby/:longitude/:latitude/:distance
Authorization: Bearer <token>
```

Example: Get issues within 5km of location
```http
GET /api/issues/nearby/77.5946/12.9716/5
```

#### Delete Issue
```http
DELETE /api/issues/:id
Authorization: Bearer <token>
```

---

### Admin Only Routes

#### Update Issue Status
```http
PUT /api/issues/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "Verified",
  "priority": "Critical",
  "adminNotes": "Verified location, scheduled for repair"
}
```

#### Get Issue Statistics
```http
GET /api/issues/admin/stats
Authorization: Bearer <admin_token>
```

Returns:
```json
{
  "success": true,
  "data": {
    "total": 150,
    "byStatus": {
      "pending": 45,
      "verified": 30,
      "inProgress": 25,
      "resolved": 40,
      "rejected": 10
    },
    "byCategory": [...],
    "byPriority": [...]
  }
}
```

---

## Data Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (user/admin),
  createdAt: Date
}
```

### Issue Schema
```javascript
{
  title: String,
  description: String,
  category: Enum,
  location: {
    type: Point,
    coordinates: [longitude, latitude]
  },
  address: String,
  image: String (filename),
  status: Enum (Pending/Verified/In Progress/Resolved/Rejected),
  priority: Enum (Low/Medium/High/Critical),
  reportedBy: ObjectId (ref: User),
  adminNotes: String,
  resolvedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Issue Status Workflow

1. **Pending** - Initial status when user reports
2. **Verified** - Admin confirms issue is valid
3. **In Progress** - Issue is being worked on
4. **Resolved** - Issue has been fixed
5. **Rejected** - Invalid or duplicate report

## Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```

Common status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- File upload validation (images only, 5MB max)
- Protected routes with middleware

## Testing the API

You can use tools like:
- **Postman** - Import endpoints and test
- **Thunder Client** (VS Code extension)
- **cURL** - Command line testing

Example cURL request:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   └── issueController.js   # Issue management logic
│   ├── middleware/
│   │   ├── auth.js              # JWT & role verification
│   │   ├── error.js             # Error handler
│   │   └── upload.js            # Multer config
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Issue.js             # Issue schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── issueRoutes.js       # Issue endpoints
│   └── server.js                # Main app file
├── uploads/                     # Uploaded images
├── .env                         # Environment variables
└── package.json
```

## Next Steps

### For Frontend Integration:
1. Connect to these APIs from your React/Vue/Angular app
2. Implement map integration (Google Maps/Leaflet) for location selection
3. Build admin dashboard UI
4. Add real-time notifications (Socket.io)

### Potential Enhancements:
- SMS/Email notifications
- Real-time updates with WebSockets
- Image compression before upload
- Cloud storage (AWS S3, Cloudinary)
- PDF report generation
- Analytics dashboard with charts
- Mobile app integration

## Database Setup Tips

1. **Create Admin User**: After registration, manually update a user's role to "admin" in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

2. **Geospatial Index**: Automatically created by the Issue model for location queries

## Support

For issues or questions, please create an issue in the repository.

---

Built for civic engagement and efficient issue resolution 🌆
