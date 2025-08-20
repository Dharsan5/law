import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import './PetitionerDashboard.css';

const PetitionerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [notifications] = useState([
    { id: 1, message: "Your case #C-2025-01 hearing is scheduled for Aug 20, 2025." },
    { id: 2, message: "Judge has reviewed your submitted documents for case #C-2025-02." },
    { id: 3, message: "Reminder: Submit missing affidavit for case #C-2025-03 by Aug 18." }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="petitioner-dashboard">
      <div className="dashboard-header">
        <h2>Welcome, {user?.name || "Petitioner"}</h2>

        {/* Notification Bell */}
        <div className="notification-wrapper">
          <button
            className="notification-bell"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell size={22} />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notifications-dropdown">
              <h4>Notifications</h4>
              {notifications.length > 0 ? (
                notifications.map((note) => (
                  <div key={note.id} className="notification-item">
                    {note.message}
                  </div>
                ))
              ) : (
                <p>No new notifications</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>File New Case</h3>
          <p>Submit a new petition to start your case.</p>
          <button onClick={() => navigate('/file-case')}>File Case</button>
        </div>

        <div className="dashboard-card">
          <h3>My Cases</h3>
          <p>Track all the cases you have filed.</p>
          <button onClick={() => navigate('/my-cases')}>View Cases</button>
        </div>

        <div className="dashboard-card">
          <h3>Join Live Hearing</h3>
          <p>Join the e-Hearing with the Judge & Lawyer.</p>
          <button onClick={() => navigate('/petitioner-video-form')}>Join Hearing</button>
        </div>

        <div className="dashboard-card">
          <h3>Contact Lawyer</h3>
          <p>Reach your assigned lawyer for consultation.</p>
          <button onClick={() => window.location.href = 'mailto:lawyer@example.com'}>
            Email Lawyer
          </button>
        </div>

        <div className="dashboard-card">
          <h3>Contact Judge</h3>
          <p>Send official queries to the judge's chamber.</p>
          <button onClick={() => window.location.href = 'mailto:judge@example.com'}>
            Email Judge
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetitionerDashboard;
