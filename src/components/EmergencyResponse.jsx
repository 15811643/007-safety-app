import React from 'react';
import '../styles/card.css';
import '../styles/form.css';
import '../styles/badge.css';

const pageStyle = { padding: '2rem', maxWidth: 1200, margin: '0 auto' };

function EmergencyResponse() {
  return (
    <div style={pageStyle}>
      <h1>🚨 Emergency Response</h1>
      <p>One-tap SOS, protocols, and GPS tracking for workers.</p>
    </div>
  );
}

export default EmergencyResponse; 