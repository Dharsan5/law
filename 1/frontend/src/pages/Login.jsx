import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [role, setRole] = useState('Petitioner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role}),
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Welcome back, ${data.user.name}!`);

      localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));

  switch (data.user.role) {
    case 'Admin':
      window.location.href = '/admin-dashboard';
      break;
    case 'Lawyer':
      window.location.href = '/lawyer-dashboard';
      break;
    case 'Judge':
      window.location.href = '/judge-dashboard';
      break;
    case 'Petitioner':
      window.location.href = '/petitioner-dashboard';
      break;
    default:
      window.location.href = '/';
  }
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Network error. Please try again.');
  }
};


  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="text-center">Login to JustiFlow</h2>
        <form onSubmit={handleLogin}>
          {/* Role Selection */}
          <div className="form-group">
            <label>Select Role</label>
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

          {/* Email */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
