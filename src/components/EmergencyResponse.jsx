import React, { useState } from 'react';
import '../styles/card.css';
import '../styles/form.css';
import '../styles/badge.css';
import { EmergencyAlert, EmergencyContactManager } from './safety/SafetyComponents';

const pageStyle = { padding: '2rem', maxWidth: 1200, margin: '0 auto' };

function EmergencyResponse() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'critical', message: 'Fire alarm activated in Building A', acknowledged: false },
    { id: 2, type: 'warning', message: 'Chemical spill detected in Lab 3', acknowledged: false },
    { id: 3, type: 'info', message: 'Emergency drill scheduled for tomorrow', acknowledged: false }
  ]);

  const [contacts] = useState([
    { id: 1, name: 'John Smith', role: 'Safety Manager', phone: '555-0101' },
    { id: 2, name: 'Sarah Johnson', role: 'Emergency Coordinator', phone: '555-0102' },
    { id: 3, name: 'Mike Wilson', role: 'First Aid Officer', phone: '555-0103' }
  ]);

  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleAddContact = (contact) => {
    console.log('Adding contact:', contact);
  };

  const handleEditContact = (contact) => {
    console.log('Editing contact:', contact);
  };

  const handleDeleteContact = (contactId) => {
    console.log('Deleting contact:', contactId);
  };

  return (
    <div style={pageStyle}>
      <h1>🚨 Emergency Response</h1>
      <p>Emergency alerts, protocols, and contact management.</p>
      
      {/* Emergency Alerts */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Active Alerts</h2>
        {alerts.filter(alert => !alert.acknowledged).map(alert => (
          <div key={alert.id} style={{ marginBottom: '1rem' }}>
            <EmergencyAlert
              type={alert.type}
              message={alert.message}
              onAcknowledge={() => handleAcknowledgeAlert(alert.id)}
            />
          </div>
        ))}
        {alerts.filter(alert => !alert.acknowledged).length === 0 && (
          <div style={{ 
            padding: '1rem', 
            background: '#10b981', 
            color: 'white', 
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            ✅ No active emergency alerts
          </div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div style={{ marginBottom: '2rem' }}>
        <EmergencyContactManager
          contacts={contacts}
          onAddContact={handleAddContact}
          onEditContact={handleEditContact}
          onDeleteContact={handleDeleteContact}
        />
      </div>

      {/* Emergency Procedures */}
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '1rem', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#ef4444', marginBottom: '1rem' }}>Emergency Procedures</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
            <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>🚨 Fire Emergency</h3>
            <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Pull nearest fire alarm</li>
              <li>Call emergency services (911)</li>
              <li>Evacuate immediately</li>
              <li>Go to designated assembly point</li>
            </ol>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>⚠️ Chemical Spill</h3>
            <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Evacuate the area</li>
              <li>Call safety manager</li>
              <li>Do not attempt cleanup</li>
              <li>Wait for hazmat team</li>
            </ol>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
            <h3 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>🆘 Medical Emergency</h3>
            <ol style={{ margin: 0, paddingLeft: '1.5rem' }}>
              <li>Call emergency services (911)</li>
              <li>Contact first aid officer</li>
              <li>Do not move injured person</li>
              <li>Secure the area</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyResponse; 