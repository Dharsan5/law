import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('Petitioner');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Extra fields
  const [barId, setBarId] = useState('');
  const [lawLicense, setLawLicense] = useState(null);
  const [judgeCode, setJudgeCode] = useState('');
  const [judgeIdProof, setJudgeIdProof] = useState(null);

  const handleRegister = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('role', role);
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);

  if (role === 'Lawyer') {
    formData.append('barId', barId);
    formData.append('lawLicense', lawLicense);
  } else if (role === 'Judge') {
    formData.append('judgeCode', judgeCode);
    formData.append('judgeIdProof', judgeIdProof);
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert('Registration successful!');
      console.log('User Registered!!');
      navigate('/login');
    } else {
      alert(`Error: ${data.message || 'Registration failed'}`);
      console.error('Registration error:', data);
    }
  } catch (error) {
    console.error('Network error:', error);
    alert('Network error! Please try again.');
  }
};


  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="text-center">Register for JustiFlow</h2>
        <form onSubmit={handleRegister}>
          {/* Role Selection */}
          <div className="form-group">
            <label>Choose Role</label>
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Admin">Admin</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Judge">Judge</option>
              <option value="Petitioner">Petitioner</option>
            </select>
          </div>

          {/* Common Fields */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Create Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Lawyer Fields */}
          {role === 'Lawyer' && (
            <>
              <div className="form-group">
                <label>Bar Council ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Bar Council ID"
                  value={barId}
                  onChange={(e) => setBarId(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Upload Law License</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => setLawLicense(e.target.files[0])}
                  required
                />
              </div>
            </>
          )}

          {/* Judge Fields */}
          {role === 'Judge' && (
            <>
              <div className="form-group">
                <label>Judge Code</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Judge Code"
                  value={judgeCode}
                  onChange={(e) => setJudgeCode(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Upload Official ID Proof</label>
                <input
                  type="file"
                  className="form-control"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => setJudgeIdProof(e.target.files[0])}
                  required
                />
              </div>
            </>
          )}

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
