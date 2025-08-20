import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminStyles.css';

const ManageJudges = () => {
  const [judges, setJudges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/judges')
      .then(res => res.json())
      .then(data => setJudges(data))
      .catch(err => console.error(err));
  }, []);

  const handleVerify = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/verify-judge/${id}`, {
        method: 'PATCH'
      });
      const data = await res.json();
      if (res.ok) {
        alert('Judge verified!');
        setJudges(judges.map(j => j._id === id ? { ...j, verified: true } : j));
      }
    } catch (err) {
      console.error(err);
      alert('Error verifying judge');
    }
  };

  return (
    <div className="admin-section">
      <h2>Manage Judges</h2>
      <p>View and verify registered judges.</p>

      <button className="back-btn" onClick={() => navigate('/admin-dashboard')}>
        ← Back to Dashboard
      </button>

      <div className="admin-table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Judge Code</th>
              <th>ID Proof</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {judges.map(judge => (
              <tr key={judge._id}>
                <td>{judge.name}</td>
                <td>{judge.email}</td>
                <td>{judge.judgeCode}</td>
                <td>
                  <a href={`http://localhost:5000/uploads/${judge.judgeIdProof}`} target="_blank" rel="noreferrer">
                    View
                  </a>
                </td>
                <td>
                  {judge.verified ? (
                    <span style={{ color: 'green' }}>Verified</span>
                  ) : (
                    <button onClick={() => handleVerify(judge._id)}>Verify</button>
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

export default ManageJudges;
