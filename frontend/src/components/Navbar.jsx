import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'Admin': return '#dc3545';
      case 'Judge': return '#6f42c1';
      case 'Lawyer': return '#fd7e14';
      case 'Petitioner': return '#20c997';
      default: return '#6c757d';
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Justice Flow
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/${user.role.toLowerCase()}-dashboard`}
                  >
                    Dashboard
                  </Link>
                </li>
                
                {/* User Profile Section */}
                <li className="nav-item">
                  <div className="user-profile">
                    <div 
                      className="user-avatar"
                      style={{ backgroundColor: getRoleBadgeColor(user.role) }}
                    >
                      {getUserInitials(user.name)}
                    </div>
                    <div className="user-info">
                      <p className="user-name">{user.name}</p>
                      <p className="user-role">{user.role}</p>
                    </div>
                  </div>
                </li>
                
                <li className="nav-item">
                  <button className="btn btn-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
