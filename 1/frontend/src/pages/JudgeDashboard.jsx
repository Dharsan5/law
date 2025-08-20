import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JudgeDashboard.css';

const JudgeDashboard = () => {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated backend call - replace with actual API later
    const dummyCases = [
      {
        _id: 'case001',
        title: 'Land Dispute Case',
        petitioner: 'Ravi Kumar',
        lawyer: 'Adv. Meena Singh',
        status: 'In Progress',
        description: 'Dispute regarding 3 acres of land.',
      },
      {
        _id: 'case002',
        title: 'Fraud Complaint',
        petitioner: 'Kiran Rao',
        lawyer: 'Adv. Sanjay Reddy',
        status: 'Pending',
        description: 'Fraudulent transaction case.',
      },
    ];
    setCases(dummyCases);
  }, []);

  return (
    <div className="judge-dashboard">
      <h2>Welcome, Honorable Judge</h2>
      <p>Review assigned cases and give your judgments.</p>

      {cases.length === 0 ? (
        <p>No assigned cases at the moment.</p>
      ) : (
        <div className="case-list">
          {cases.map((c) => (
            <div key={c._id} className="case-card">
              <h3>{c.title}</h3>
              <p><strong>Petitioner:</strong> {c.petitioner}</p>
              <p><strong>Lawyer:</strong> {c.lawyer}</p>
              <p><strong>Description:</strong> {c.description}</p>
              <p><strong>Status:</strong> {c.status}</p>

              <div className="actions">
                <button className="view-btn">View Details</button>
                <button className="judgment-btn">Add Judgment</button>
                <button 
                  className="hearing-btn"
                  onClick={() => navigate('/judge-video-form')}
                >
                  Join Hearing
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JudgeDashboard;
