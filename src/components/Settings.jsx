import React from 'react';
import '../styles/nav.css';
import '../styles/card.css';
import '../styles/form.css';

const pageStyle = { padding: '2rem', maxWidth: 1200, margin: '0 auto' };

function Settings() {
  return (
    <div style={pageStyle}>
      <h1>⚙️ Settings</h1>
      <p>Integrations, preferences, and account management.</p>
    </div>
  );
}

export default Settings; 