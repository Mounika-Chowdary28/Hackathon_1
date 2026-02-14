import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaCamera, FaChartLine, FaShieldAlt, FaBell, FaUsers } from 'react-icons/fa';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <div className="hero-logo">🏙️</div>
          <h1 className="hero-title">
            Road<span className="highlight">Watch</span>
          </h1>
          <p className="hero-tagline">
            Report Road Issues with Location & Proof
          </p>
          <p className="hero-description">
            Empower your community by reporting potholes, broken streetlights, garbage overflow, 
            and water leakage. Track status and make a difference!
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary btn-large">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-large">
              Register
            </Link>
          </div>
          <Link to="/map" className="hero-link">
            <FaMapMarkedAlt /> View Public Issue Map
          </Link>
        </div>
        <div className="hero-scroll">
          <div className="scroll-indicator">↓</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose RoadWatch?</h2>
          <p className="section-subtitle">
            A complete platform for civic engagement and issue resolution
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaMapMarkedAlt />
              </div>
              <h3>GPS Location Tracking</h3>
              <p>
                Report issues with exact GPS coordinates. Click on the map or use your 
                current location for precise reporting.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaCamera />
              </div>
              <h3>Image Proof Upload</h3>
              <p>
                Add visual evidence by uploading photos of the issue. Images help 
                authorities verify and prioritize problems faster.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <h3>Real-Time Status Tracking</h3>
              <p>
                Track your reported issues from submission to resolution. Get updates 
                on Pending, Verified, In Progress, and Resolved statuses.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>Admin Verification</h3>
              <p>
                All reports are reviewed by administrators who verify authenticity, 
                assign priorities, and coordinate resolution efforts.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaBell />
              </div>
              <h3>Smart Alerts</h3>
              <p>
                Get notified about nearby issues already reported. Avoid duplicate 
                reports and see what's happening in your area.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaUsers />
              </div>
              <h3>Community Impact</h3>
              <p>
                Join thousands of citizens making their communities better. View 
                statistics and see the collective impact of civic engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Report civic issues in 3 simple steps
          </p>
          
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p>
                Register with your name, email, and phone number. 
                Login securely to access the dashboard.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Report Issue</h3>
              <p>
                Fill in details, upload a photo, and mark the exact 
                location on the interactive map.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Track & Resolve</h3>
              <p>
                Monitor your report status, get updates from admins, 
                and see when issues are resolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">What Can You Report?</h2>
          
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-emoji">🕳️</div>
              <h4>Potholes</h4>
              <p>Road damage and dangerous potholes</p>
            </div>

            <div className="category-card">
              <div className="category-emoji">💡</div>
              <h4>Streetlights</h4>
              <p>Broken or non-functional street lighting</p>
            </div>

            <div className="category-card">
              <div className="category-emoji">🗑️</div>
              <h4>Garbage Overflow</h4>
              <p>Waste management and sanitation issues</p>
            </div>

            <div className="category-card">
              <div className="category-emoji">💧</div>
              <h4>Water Leakage</h4>
              <p>Water supply and drainage problems</p>
            </div>

            <div className="category-card">
              <div className="category-emoji">🚧</div>
              <h4>Road Damage</h4>
              <p>General road infrastructure issues</p>
            </div>

            <div className="category-card">
              <div className="category-emoji">📋</div>
              <h4>Other Issues</h4>
              <p>Any other civic-related problems</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">1,247</div>
              <div className="stat-label">Issues Reported</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">892</div>
              <div className="stat-label">Issues Resolved</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5,431</div>
              <div className="stat-label">Active Citizens</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Make a Difference?</h2>
          <p>Join our community and start reporting issues today</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-large">
              Get Started - It's Free
            </Link>
            <Link to="/login" className="btn btn-outline btn-large">
              Already have an account?
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>🏙️ RoadWatch</h3>
              <p>Making communities better, one report at a time.</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/map">View Map</Link>
            </div>
            <div className="footer-contact">
              <h4>Contact</h4>
              <p>support@roadwatch.com</p>
              <p>© 2026 RoadWatch. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
