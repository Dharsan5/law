import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PetitionerVideoForm = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caseNumber.trim()) {
      alert('Please enter a valid case number');
      return;
    }

    setLoading(true);
    // Navigate to video conference with case number
    navigate(`/video-conference/${caseNumber}?role=petitioner`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Join Hearing - Petitioner</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="caseNumber" className="form-label">
                    Case Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="caseNumber"
                    value={caseNumber}
                    onChange={(e) => setCaseNumber(e.target.value)}
                    placeholder="Enter your case number"
                    required
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Joining...' : 'Join Video Conference'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/petitioner-dashboard')}
                  >
                    Back to Dashboard
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetitionerVideoForm;
