import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyCases.css';

const MyCases = () => {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/cases/${user.id}`);
        const data = await res.json();
        if (res.ok) {
          setCases(data);
        } else {
          alert(data.message || 'Failed to load cases');
        }
      } catch (err) {
        console.error('Error fetching cases:', err);
        alert('Server error while fetching cases');
      }
    };

    fetchCases();
  }, [user.id]);

  return (
    <div className="my-cases">
      <div className="top-bar">
        <h2>My Filed Cases</h2>
        <button className="back-button" onClick={() => navigate('/petitioner-dashboard')}>
          ⬅ Back to Dashboard
        </button>
      </div>

      {cases.length === 0 ? (
        <p>No cases filed yet.</p>
      ) : (
        <table className="case-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Document</th>
              <th>Status</th>
              <th>Filed On</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c._id}>
                <td>{c.title}</td>
                <td>{c.category}</td>
                <td>{c.description}</td>
                <td>
                  {c.document ? (
                    <a
                      href={`http://localhost:5000/uploads/${c.document}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>{c.status}</td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyCases;
