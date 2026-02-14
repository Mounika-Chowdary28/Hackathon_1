import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-brand">
            🏙️ Civic Issues
          </Link>

          <div className="nav-menu">
            {!user ? (
              <>
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/map" className="nav-link">
                  Map View
                </Link>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </>
            ) : isAdmin ? (
              <>
                <Link to="/admin/dashboard" className="nav-link">
                  Admin Dashboard
                </Link>
                <Link to="/admin/issues" className="nav-link">
                  Manage Issues
                </Link>
                <Link to="/map" className="nav-link">
                  Map View
                </Link>
                <span className="admin-badge">Admin</span>
                <div className="user-menu">
                  <span className="user-name">{user.name}</span>
                  <button onClick={handleLogout} className="btn btn-outline btn-sm">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/map" className="nav-link">
                  Map View
                </Link>
                <Link to="/report" className="nav-link">
                  Report Issue
                </Link>
                <Link to="/my-reports" className="nav-link">
                  My Reports
                </Link>
                <div className="user-menu">
                  <span className="user-name">{user.name}</span>
                  <button onClick={handleLogout} className="btn btn-outline btn-sm">
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
