import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">Justice Flow</div>
            <p className="footer-description">
              Transforming legal proceedings through digital innovation. 
              Providing secure, efficient, and accessible legal services 
              for the modern justice system.
            </p>
            <p className="footer-tagline">
              "Justice Through Technology"
            </p>
          </div>
          
          <div className="footer-section">
            <h3>Legal Services</h3>
            <ul>
              <li><a href="/case-filing">Case Filing</a></li>
              <li><a href="/document-management">Document Management</a></li>
              <li><a href="/virtual-hearings">Virtual Hearings</a></li>
              <li><a href="/legal-consultation">Legal Consultation</a></li>
              <li><a href="/case-tracking">Case Tracking</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/support">Support Center</a></li>
              <li><a href="/resources">Legal Resources</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">L</div>
                <span>KEC,Erode</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">P</div>
                <span>+91 9080105868</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">E</div>
                <span>justiceflow.com</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">T</div>
                <span>24/7 Digital Services</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          
          <p>&copy; {currentYear} Justice Flow Legal Portal. All rights reserved.</p>
          <p>Licensed Legal Technology Provider | Bar Certified Platform</p>
          
          <div className="footer-legal">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/legal-disclaimer">Legal Disclaimer</a>
            <a href="/accessibility">Accessibility</a>
            <a href="/compliance">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
