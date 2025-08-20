import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBell,
  FaUsers,
  FaGavel,
  FaChartLine,
  FaUserCheck,
  FaCogs,
  FaFolderOpen,
  FaClipboardCheck,
} from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Dummy stats (replace with API later)
  const [stats, setStats] = useState({
    totalUsers: 1240,
    totalCases: 312,
    totalHearings: 87,
    pendingApprovals: 14,
  });

  // Example polling every 30s (replace with real fetch)
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((s) => ({
        ...s,
        // tiny random fluctuation to look “live”
        totalUsers: s.totalUsers + Math.floor(Math.random() * 2),
        totalCases: s.totalCases,
        totalHearings: s.totalHearings,
        pendingApprovals: s.pendingApprovals,
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const notifications = [
    "New lawyer registered for approval.",
    "Hearing scheduled for Case #123.",
    "Judge John Doe updated their profile.",
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">Welcome, Admin</h2>
        <div className="notifications">
          <FaBell
            className="notification-icon"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          />
          {showNotifications && (
            <div className="notifications-dropdown">
              <h4>Notifications</h4>
              <ul>
                {notifications.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Live Stats Bar */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon-wrap users">
            <FaUsers />
          </div>
          <div className="stat-text">
            <span className="stat-label">Total Users</span>
            <span className="stat-value">{stats.totalUsers}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap cases">
            <FaFolderOpen />
          </div>
          <div className="stat-text">
            <span className="stat-label">Total Cases</span>
            <span className="stat-value">{stats.totalCases}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap hearings">
            <FaGavel />
          </div>
          <div className="stat-text">
            <span className="stat-label">Total Hearings</span>
            <span className="stat-value">{stats.totalHearings}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap approvals">
            <FaClipboardCheck />
          </div>
          <div className="stat-text">
            <span className="stat-label">Pending Approvals</span>
            <span className="stat-value">{stats.pendingApprovals}</span>
          </div>
        </div>
      </div>

      {/* Main Tiles */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <FaUserCheck className="card-icon" />
          <h3>Manage Lawyers</h3>
          <p>View and approve registered lawyers.</p>
          <Link to="/admin/lawyers"><button>Go</button></Link>
        </div>

        <div className="dashboard-card">
          <FaGavel className="card-icon" />
          <h3>Manage Judges</h3>
          <p>View and approve registered judges.</p>
          <Link to="/admin/judges"><button>Go</button></Link>
        </div>

        <div className="dashboard-card">
          <FaUsers className="card-icon" />
          <h3>All Users</h3>
          <p>View list of all registered users.</p>
          <Link to="/admin/users"><button>Go</button></Link>
        </div>

        <div className="dashboard-card">
          <FaGavel className="card-icon" />
          <h3>Case Management</h3>
          <p>View, assign, and close cases.</p>
          <Link to="/admin/cases"><button>Go</button></Link>
        </div>

        <div className="dashboard-card">
          <FaChartLine className="card-icon" />
          <h3>System Analytics</h3>
          <p>View platform usage statistics.</p>
          <Link to="/admin/analytics"><button>Go</button></Link>
        </div>

        <div className="dashboard-card">
          <FaCogs className="card-icon" />
          <h3>Settings</h3>
          <p>Manage platform configurations.</p>
          <Link to="/admin/settings"><button>Go</button></Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


/*
useEffect(() => {
  const fetchStats = async () => {
    const res = await fetch("http://localhost:5000/api/admin/stats", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    setStats(data);
  };
  fetchStats();
}, []);*/