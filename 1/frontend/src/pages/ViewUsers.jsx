import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminStyles.css';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div className="admin-section">
      <h2>All Registered Users</h2>
      <p>List of all users in the system.</p>

      <button className="back-btn" onClick={() => navigate('/admin-dashboard')}>
        ← Back to Dashboard
      </button>

      <div className="admin-table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td style={{ color: user.verified ? 'green' : 'gray' }}>
                  {user.verified ? 'Active' : 'Pending'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewUsers;
