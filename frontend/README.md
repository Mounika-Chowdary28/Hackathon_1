# Civic Issue Reporting System - Frontend

A modern React-based frontend for reporting and managing civic issues like potholes, broken streetlights, garbage overflow, and water leakage.

## Features

- 🔐 **User Authentication** - Register and login functionality
- 📝 **Issue Reporting** - Report issues with image upload and GPS location
- 🗺️ **Interactive Maps** - Select location using Leaflet maps
- 📊 **Dashboard** - View all issues with filters
- 👤 **User Profile** - Track your reported issues
- 👨‍💼 **Admin Panel** - Admin can verify and update issue status
- 📱 **Responsive Design** - Works on desktop and mobile

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Leaflet** - Interactive maps
- **React Toastify** - Notifications
- **CSS3** - Custom styling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Backend server running on `http://localhost:5000`

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and visit:

```
http://localhost:3000
```

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── Navbar.css
│   │   └── ProtectedRoute.jsx   # Route protection
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication state
│   ├── pages/
│   │   ├── Login.jsx            # Login page
│   │   ├── Register.jsx         # Registration page
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── ReportIssue.jsx      # Report new issue
│   │   ├── IssueDetail.jsx      # Issue details
│   │   └── Auth.css             # Auth styles
│   ├── services/
│   │   └── api.js               # API configuration
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Available Scripts

### `npm run dev`

Runs the app in development mode on port 3000.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run preview`

Preview the production build locally.

## User Guide

### For Citizens

1. **Register/Login**
   - Create an account or login with existing credentials
   
2. **Report an Issue**
   - Click "Report New Issue" button
   - Fill in issue details (title, category, description)
   - Upload an image of the issue
   - Select location on map or use current location
   - Submit the report

3. **Track Issues**
   - View all your reported issues on dashboard
   - Check issue status (Pending → Verified → In Progress → Resolved)
   - View detailed information and location on map

### For Admins

1. **Login as Admin**
   - Login with admin credentials
   - View all reported issues from all users

2. **Manage Issues**
   - Click on any issue to view details
   - Update issue status
   - Change priority level
   - Add admin notes
   - Track resolution progress

3. **Dashboard Statistics**
   - View total issues count
   - See breakdown by status
   - Filter by category, status, and priority

## Features in Detail

### Authentication
- JWT-based authentication
- Secure password handling
- Persistent login sessions

### Issue Reporting
- Multi-step form with validation
- Image upload with preview
- Interactive map for location selection
- GPS location detection
- Real-time form validation

### Dashboard
- View all issues in grid layout
- Filter by status, category, and priority
- Search functionality
- Pagination support
- Issue statistics (Admin only)

### Issue Details
- Full issue information
- Location map
- Reporter details
- Status history
- Admin controls (Admin only)

### Map Integration
- OpenStreetMap integration
- Click to select location
- Current location detection
- Marker placement
- Zoom controls

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/api`.

### Endpoints Used

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/issues` - Create issue
- `GET /api/issues` - Get all issues
- `GET /api/issues/:id` - Get single issue
- `PUT /api/issues/:id/status` - Update status (Admin)
- `DELETE /api/issues/:id` - Delete issue
- `GET /api/issues/admin/stats` - Get statistics (Admin)

## Styling

The app uses custom CSS with CSS variables for theming:

- Primary color: Blue (#2563eb)
- Success color: Green (#10b981)
- Warning color: Orange (#f59e0b)
- Danger color: Red (#ef4444)

Responsive breakpoints:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## Environment Variables

The API URL is configured in `src/services/api.js`:

```javascript
const API_URL = 'http://localhost:5000/api';
```

For production, update this to your production API URL.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Map not loading
- Check internet connection
- Ensure Leaflet CSS is loaded in `index.html`

### Images not displaying
- Verify backend server is running
- Check CORS configuration
- Ensure uploads folder exists in backend

### Login issues
- Clear browser cache and cookies
- Check backend API is running
- Verify credentials

## Performance Optimization

- Lazy loading for routes
- Image optimization
- Debounced search
- Pagination for large datasets
- Memoized components

## Security Features

- JWT token authentication
- Protected routes
- XSS protection
- CSRF protection
- Input validation
- File upload validation

## Future Enhancements

- [ ] Email notifications
- [ ] Real-time updates with WebSockets
- [ ] Issue comments and discussions
- [ ] Export reports as PDF
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Progressive Web App (PWA)

## License

This project is part of a hackathon submission.

## Support

For issues and questions, please contact the development team.

---

Built with ❤️ for better civic engagement
