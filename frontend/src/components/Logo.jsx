import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium', variant = 'default' }) => {
  return (
    <div className={`logo logo-${size} logo-${variant}`}>
      <div className="logo-icon">
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Justice Scale Icon */}
          <path 
            d="M16 4L12 8H20L16 4Z" 
            fill="currentColor"
          />
          <rect 
            x="15" 
            y="8" 
            width="2" 
            height="16" 
            fill="currentColor"
          />
          <circle 
            cx="8" 
            cy="20" 
            r="4" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          <circle 
            cx="24" 
            cy="20" 
            r="4" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          <line 
            x1="8" 
            y1="16" 
            x2="24" 
            y2="16" 
            stroke="currentColor" 
            strokeWidth="2"
          />
          <line 
            x1="16" 
            y1="16" 
            x2="16" 
            y2="8" 
            stroke="currentColor" 
            strokeWidth="2"
          />
        </svg>
      </div>
      <span className="logo-text">Justice Flow</span>
    </div>
  );
};

export default Logo;
