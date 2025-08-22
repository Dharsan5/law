import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [role, setRole] = useState('Petitioner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Welcome back, ${data.user.name}!`);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Delay navigation to show success message
        setTimeout(() => {
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
        }, 1500);
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'Admin': return '';
      case 'Judge': return '';
      case 'Lawyer': return '';
      case 'Petitioner': return '';
      default: return '';
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to access your Justice Flow account</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Role Selection */}
          <div className="form-group">
            <label>
              {getRoleIcon(role)} Select Your Role
            </label>
            <div className="role-selector">
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                disabled={isLoading}
              >
                <option value="Petitioner">Petitioner</option>
                <option value="Lawyer">Lawyer</option>
                <option value="Judge">Judge</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="security-badge">
          Your data is protected with enterprise-grade security
        </div>

        <div className="login-footer">
          <p>Don't have an account yet?</p>
          <Link to="/register">
            Create a new account →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
