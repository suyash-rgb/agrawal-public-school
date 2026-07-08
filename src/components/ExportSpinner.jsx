import React from 'react';

export default function ExportSpinner({ isVisible, progress, text }) {
  if (!isVisible) return null;
  
  return (
    <div className="export-spinner-overlay">
      <div className="spinner-card">
        <div className="loader-circle"></div>
        <h3>Generating PDF Pages</h3>
        <p>Rendering student ID card sheets. Please wait...</p>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span>{text}</span>
      </div>
    </div>
  );
}
