import React from 'react';
import './Home.css';
import courtImage from '../assets/court.jpg';
const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero text-center">
        <div className="hero-content">
          <h1>Welcome to JustiFlow</h1>
          <p className="lead">
            A smarter way to manage, track, and attend legal case hearings online.
          </p>
          <img src={courtImage} alt="Court Illustration" className="hero-img" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h4>Secure Login</h4>
            <p>Access your portal using role-based secure authentication.</p>
          </div>
          <div className="feature-card">
            <h4>Case Management</h4>
            <p>Upload, edit, and view case details with real-time updates.</p>
          </div>
          <div className="feature-card">
            <h4>Hearing Schedule</h4>
            <p>Get notified and attend your hearing online or in person.</p>
          </div>
          <div className="feature-card">
            <h4>AI Integration</h4>
            <p>Auto-tag cases, get smart summaries, and search quickly with AI.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-to-use-section">
        <h2 className="section-title">How to Use JustiFlow</h2>
        <ol className="how-to-list">
          <li>Register or log in as a Citizen, Lawyer, Judge, or Admin.</li>
          <li>Submit a new case or view assigned cases on your dashboard.</li>
          <li>Track hearing dates, upload documents, and chat securely.</li>
          <li>Join hearings online or view summary reports powered by AI.</li>
        </ol>
      </section>
    </div>
  );
};

export default Home;
