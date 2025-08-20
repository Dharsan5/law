import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminStyles.css';

const ManageLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/lawyers')
      .then(res => res.json())
      .then(data => setLawyers(data))
      .catch(err => console.error('Failed to fetch lawyers', err));
  }, []);

  const handleVerify = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/verify-lawyer/${id}`, {
        method: 'PATCH'
      });

      if (res.ok) {
        alert('Lawyer verified!');
        setLawyers(prev =>
          prev.map(lawyer => lawyer._id === id ? { ...lawyer, verified: true } : lawyer)
        );
      } else {
        alert('Verification failed');
      }
    } catch (err) {
      console.error('Verification error:', err);
    }
  };

  return (
    <div className="admin-section">
      <h2>Manage Lawyers</h2>
      <p>View and verify registered lawyers.</p>

      <button className="back-btn" onClick={() => navigate('/admin-dashboard')}>
        ← Back to Dashboard
      </button>

      <div className="admin-table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Bar ID</th>
              <th>License</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lawyers.map(lawyer => (
              <tr key={lawyer._id}>
                <td>{lawyer.name}</td>
                <td>{lawyer.email}</td>
                <td>{lawyer.barId}</td>
                <td>
                  <a
                    href={`http://localhost:5000/uploads/${lawyer.lawLicense}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View
                  </a>
                </td>
                <td>
                  {lawyer.verified ? (
                    <span style={{ color: 'green' }}>Verified</span>
                  ) : (
                    <button onClick={() => handleVerify(lawyer._id)}>Verify</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLawyers;
