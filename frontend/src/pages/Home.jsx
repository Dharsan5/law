import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import courtImage from '../assets/court.jpg';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to JustiFlow</h1>
          <p className="lead">
            A smarter way to manage, track, and attend legal case hearings online.
            Experience the future of legal proceedings with our comprehensive digital platform.
          </p>
          <img src={courtImage} alt="Court Illustration" className="hero-img" />
          
          <div className="hero-cta">
            <Link to="/register" className="cta-button cta-primary">
              Get Started
            </Link>
            <Link to="/login" className="cta-button cta-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <h2 className="section-title">
          Trusted by Legal Professionals
        </h2>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Cases Managed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Legal Professionals</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">99%</span>
            <span className="stat-label">Success Rate</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support Available</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h4>Secure Authentication</h4>
            <p>Multi-layered security with role-based access control. Your data is protected with enterprise-grade encryption and authentication protocols.</p>
          </div>
          <div className="feature-card">
            <h4>Smart Case Management</h4>
            <p>Upload, organize, and track case documents with AI-powered categorization. Real-time updates and collaborative tools for legal teams.</p>
          </div>
          <div className="feature-card">
            <h4>Intelligent Scheduling</h4>
            <p>Automated hearing scheduling with conflict detection. Get smart notifications and reminders for all your important legal proceedings.</p>
          </div>
          <div className="feature-card">
            <h4>AI-Powered Insights</h4>
            <p>Advanced AI algorithms for case analysis, document summarization, and predictive insights to enhance your legal strategy.</p>
          </div>
          <div className="feature-card">
            <h4>Secure Communication</h4>
            <p>End-to-end encrypted messaging between all parties. Maintain client confidentiality with our secure communication platform.</p>
          </div>
          <div className="feature-card">
            <h4>Analytics & Reporting</h4>
            <p>Comprehensive dashboards and reports. Track case progress, performance metrics, and generate detailed analytics for better decision making.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-to-use-section">
        <h2 className="section-title">How JustiFlow Works</h2>
        <ol className="how-to-list">
          <li>
            <div className="step-content">
              <div className="step-title">Create Your Account</div>
              Register as a Citizen, Lawyer, Judge, or Admin with our secure registration system. Complete your profile with necessary credentials and verification.
            </div>
          </li>
          <li>
            <div className="step-content">
              <div className="step-title">Access Your Dashboard</div>
              Navigate to your personalized dashboard where you can view all relevant cases, schedules, and important notifications in one centralized location.
            </div>
          </li>
          <li>
            <div className="step-content">
              <div className="step-title">Manage Cases & Documents</div>
              Submit new cases, upload supporting documents, and track the progress of ongoing legal proceedings with real-time status updates.
            </div>
          </li>
          <li>
            <div className="step-content">
              <div className="step-title">Join Virtual Hearings</div>
              Participate in secure video conferences for hearings, access AI-generated summaries, and collaborate with all parties involved in the case.
            </div>
          </li>
        </ol>
      </section>
    </div>
  );
};

export default Home;
