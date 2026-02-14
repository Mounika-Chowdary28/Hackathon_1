import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { issuesAPI } from '../services/api';
import { toast } from 'react-toastify';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentIssues, setRecentIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, issuesRes] = await Promise.all([
        issuesAPI.getStats(),
        issuesAPI.getAll({ limit: 5 }),
      ]);

      setStats(statsRes.data.data);
      setRecentIssues(issuesRes.data.data);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      Pending: 'badge-pending',
      Verified: 'badge-verified',
      'In Progress': 'badge-progress',
      Resolved: 'badge-resolved',
      Rejected: 'badge-rejected',
    };
    return `badge ${classes[status] || ''}`;
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>🛡️ Admin Dashboard</h1>
            <p>Manage and monitor all reported issues</p>
          </div>
          <div className="admin-actions">
            <Link to="/admin/issues" className="btn btn-primary">
              Manage Issues
            </Link>
            <Link to="/admin/map" className="btn btn-outline">
              View Map
            </Link>
          </div>
        </div>

        {stats && (
          <>
            <div className="admin-stats-grid">
              <div className="admin-stat-card total">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <div className="stat-number">{stats.total}</div>
                  <div className="stat-label">Total Issues</div>
                </div>
              </div>

              <div className="admin-stat-card pending">
                <div className="stat-icon">⏳</div>
                <div className="stat-info">
                  <div className="stat-number">{stats.byStatus.pending}</div>
                  <div className="stat-label">Pending Review</div>
                </div>
              </div>

              <div className="admin-stat-card verified">
                <div className="stat-icon">✓</div>
                <div className="stat-info">
                  <div className="stat-number">{stats.byStatus.verified}</div>
                  <div className="stat-label">Verified</div>
                </div>
              </div>

              <div className="admin-stat-card progress">
                <div className="stat-icon">🔧</div>
                <div className="stat-info">
                  <div className="stat-number">{stats.byStatus.inProgress}</div>
                  <div className="stat-label">In Progress</div>
                </div>
              </div>

              <div className="admin-stat-card resolved">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <div className="stat-number">{stats.byStatus.resolved}</div>
                  <div className="stat-label">Resolved</div>
                </div>
              </div>

              <div className="admin-stat-card rejected">
                <div className="stat-icon">❌</div>
                <div className="stat-info">
                  <div className="stat-number">{stats.byStatus.rejected}</div>
                  <div className="stat-label">Rejected</div>
                </div>
              </div>
            </div>

            <div className="analytics-row">
              <div className="analytics-card">
                <h3>Issues by Category</h3>
                <div className="category-list">
                  {stats.byCategory.map((cat) => (
                    <div key={cat._id} className="category-item">
                      <span className="category-name">{cat._id}</span>
                      <div className="category-bar-container">
                        <div
                          className="category-bar"
                          style={{
                            width: `${(cat.count / stats.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="category-count">{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analytics-card">
                <h3>Issues by Priority</h3>
                <div className="priority-list">
                  {stats.byPriority.map((pri) => (
                    <div key={pri._id} className="priority-item">
                      <span className={`priority-badge priority-${pri._id.toLowerCase()}`}>
                        {pri._id}
                      </span>
                      <div className="priority-bar-container">
                        <div
                          className="priority-bar"
                          style={{
                            width: `${(pri.count / stats.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="priority-count">{pri.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="recent-issues-section">
          <div className="section-header">
            <h2>Recent Reports</h2>
            <Link to="/admin/issues" className="view-all-link">
              View All →
            </Link>
          </div>

          <div className="issues-list">
            {recentIssues.map((issue) => (
              <div key={issue._id} className="issue-row card">
                <div className="issue-thumbnail">
                  <img
                    src={`http://localhost:5000/uploads/${issue.image}`}
                    alt={issue.title}
                  />
                </div>
                <div className="issue-info">
                  <h4>{issue.title}</h4>
                  <p>{issue.description}</p>
                  <div className="issue-details">
                    <span className="badge">{issue.category}</span>
                    <span>📍 {issue.address}</span>
                    <span>👤 {issue.reportedBy?.name}</span>
                    <span>📅 {new Date(issue.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="issue-status-col">
                  <span className={getStatusBadgeClass(issue.status)}>
                    {issue.status}
                  </span>
                  <span className={`priority-${issue.priority.toLowerCase()}`}>
                    {issue.priority} Priority
                  </span>
                  <Link to={`/issues/${issue._id}`} className="btn btn-outline btn-sm">
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
