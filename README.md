# Civic Issue Reporting System

A full-stack web application for reporting and managing civic issues like potholes, broken streetlights, garbage overflow, and water leakage with GPS location tracking and image evidence.

## Website is open for Issues.

**Visit Here:** : [https://civicissues.vercel.app/](https://civicissues.vercel.app/)

## 🚀 Quick Start Guide

### Cloudinary Setup (Image Uploads)

This project uses [Cloudinary](https://cloudinary.com/) for image uploads. You must create a free Cloudinary account and add your credentials to the backend `.env` file:

1. Go to https://cloudinary.com/ and sign up for a free account.
2. In your Cloudinary dashboard, find your **Cloud name**, **API Key**, and **API Secret**.
3. Add these to your `backend/.env` file:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Note:** Without valid Cloudinary credentials, image uploads will not work in the application.

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Make sure `.env` file is configured with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run server
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
Hackathon/
├── backend/                    # Node.js + Express backend
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Request handlers
│   │   ├── middleware/        # Auth & error handling
│   │   ├── models/            # MongoDB schemas
│   │   ├── routes/            # API routes
│   │   └── server.js          # Main server file
│   ├── uploads/               # Uploaded images
│   ├── .env                   # Environment variables
│   └── package.json
│
└── frontend/                   # React frontend
    ├── src/
    │   ├── components/        # Reusable components
    │   ├── context/           # Global state management
    │   ├── pages/             # Page components
    │   ├── services/          # API integration
    │   ├── App.jsx            # Main app component
    │   └── main.jsx           # Entry point
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## ✨ Features

### User Features
- ✅ Register and login with JWT authentication
- ✅ Report issues with image upload
- ✅ Select exact location using interactive map
- ✅ Track your reported issues
- ✅ View issue status in real-time
- ✅ Filter issues by status, category, and priority

### Admin Features
- ✅ View all reported issues from all users
- ✅ Update issue status (Pending → Verified → In Progress → Resolved)
- ✅ Change priority levels
- ✅ Add admin notes to issues
- ✅ View dashboard statistics
- ✅ Verify or reject reported issues

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **Multer** - File uploads
- **Bcrypt** - Password hashing

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Leaflet** - Maps integration
- **React Toastify** - Notifications

## 📝 Usage

### For Citizens

1. **Register/Login**
   - Create an account with name, email, phone, and password
   - Login to access the dashboard

2. **Report an Issue**
   - Click "Report New Issue"
   - Fill in details: title, category, description, address
   - Upload an image (required)
   - Click on map to select exact location OR use "Use Current Location"
   - Submit the report

3. **Track Issues**
   - View all your issues on the dashboard
   - Click on any issue to see full details
   - Check status updates from admin

### For Admins

1. **Login as Admin**
   - Register a regular user first
   - Manually update the user's role to "admin" in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

2. **Manage Issues**
   - View all issues from all users
   - Click on any issue to view details
   - Update status: Pending → Verified → In Progress → Resolved/Rejected
   - Change priority level
   - Add admin notes

3. **View Statistics**
   - Dashboard shows total issues
   - Breakdown by status
   - Category distribution
   - Priority levels

## 🎨 Issue Categories

- **Pothole** - Road damage and potholes
- **Broken Streetlight** - Non-functional street lights
- **Garbage Overflow** - Waste management issues
- **Water Leakage** - Water supply problems
- **Road Damage** - General road infrastructure issues
- **Other** - Miscellaneous civic issues

## 📊 Issue Status Workflow

```
Pending → Verified → In Progress → Resolved
                                 ↓
                              Rejected
```

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- File upload validation (images only, 5MB max)
- Input validation and sanitization
- Role-based access control

## 📱 Screenshots

### Login Page
Clean authentication interface with email and password

### Dashboard
View all issues with filtering options and statistics

### Report Issue
Interactive form with map integration for location selection

### Issue Details
Complete issue information with location map and status updates

## 🧪 Testing the Application

### Using Postman/Thunder Client

See `backend/API_TESTING.md` for detailed API documentation and testing examples.

### Test Accounts

1. Create a regular user:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

2. Create an admin (register first, then update role in MongoDB)

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Issues
- `POST /api/issues` - Create issue (with image upload)
- `GET /api/issues` - Get all issues (with filters)
- `GET /api/issues/:id` - Get single issue
- `GET /api/issues/nearby/:lng/:lat/:distance` - Find nearby issues
- `PUT /api/issues/:id/status` - Update status (Admin only)
- `DELETE /api/issues/:id` - Delete issue
- `GET /api/issues/admin/stats` - Get statistics (Admin only)

## 🐛 Troubleshooting

### Backend not starting
- Check if MongoDB connection string is correct in `.env`
- Ensure all dependencies are installed: `npm install`
- Check if port 5000 is available

### Frontend not connecting to backend
- Verify backend is running on `http://localhost:5000`
- Check CORS configuration in backend
- Ensure API URL is correct in `frontend/src/services/api.js`

### Images not uploading
- Check if `uploads/` folder exists in backend
- Verify file size is less than 5MB
- Ensure image format is jpeg, jpg, png, or gif

### Map not loading
- Check internet connection (maps require external resources)
- Verify Leaflet CSS is loaded in `index.html`

## 🚀 Deployment

### Backend Deployment (e.g., Heroku, Railway)
1. Set environment variables
2. Update MONGO_URI to production database
3. Deploy using platform-specific commands

### Frontend Deployment (e.g., Vercel, Netlify)
1. Update API URL in `src/services/api.js` to production backend URL
2. Build: `npm run build`
3. Deploy the `dist` folder

## 📈 Future Enhancements

- [ ] Email/SMS notifications for status updates
- [ ] Real-time updates using WebSockets
- [ ] Comments and discussions on issues
- [ ] Export reports as PDF
- [ ] Analytics with charts
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Social media sharing

## 👥 Contributing

This is a hackathon project. Feel free to fork and enhance!

## 📄 License

This project is created for educational and civic engagement purposes.

## 🙏 Acknowledgments

- OpenStreetMap for map data
- Leaflet for map integration
- MongoDB Atlas for database hosting

---

**Built for Hackathon 2026** 🏆

For better civic engagement and efficient issue resolution! 🌆
