import React from 'react';
import '../styles/card.css';
import '../styles/form.css';
import '../styles/badge.css';

const pageStyle = { padding: '2rem', maxWidth: 1200, margin: '0 auto' };

function HazardAlerts() {
  return (
    <div style={pageStyle}>
      <h1>⚠️ Hazard Alerts</h1>
      <p>Real-time alerts and hazard notifications for your worksite.</p>
    </div>
  );
}

export default HazardAlerts; 