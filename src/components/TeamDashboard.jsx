import React from 'react';
import '../styles/nav.css';
import '../styles/card.css';
import '../styles/form.css';
import '../styles/badge.css';

const pageStyle = { padding: '2rem', maxWidth: 1200, margin: '0 auto' };

function TeamDashboard() {
  return (
    <div style={pageStyle}>
      <h1>👷‍♂️ Team Dashboard</h1>
      <p>Supervisor view: worker locations, health, and risk levels.</p>
    </div>
  );
}

export default TeamDashboard; 