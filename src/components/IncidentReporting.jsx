import React, { useState, useEffect } from 'react';
import '../styles/card.css';
import '../styles/form.css';
import '../styles/badge.css';
import { IncidentReportForm } from './safety/SafetyComponents';
import dataService from '../services/dataService';

const pageStyle = { padding: '2rem', maxWidth: 1200, margin: '0 auto' };
const formStyle = { background: 'var(--color-bg-card)', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow-card)', width: '100%', maxWidth: 600, border: '1px solid var(--color-border)', margin: '0 auto' };
const inputStyle = { width: '100%', padding: '1rem', margin: '0.5rem 0', border: '1.5px solid var(--color-border)', borderRadius: '0.7rem', fontSize: '1.1rem', background: 'var(--color-bg-card)', color: 'var(--color-text)' };
const buttonStyle = { background: 'var(--color-primary)', color: 'white', padding: '1rem 2.2rem', border: 'none', borderRadius: 999, cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', margin: '0.5rem 0.5rem 0.5rem 0' };
const reportCardStyle = { background: 'white', padding: '1rem', margin: '0.5rem 0', borderRadius: 4, border: '1px solid #ddd' };

function IncidentReporting() {
  const [formData, setFormData] = useState({
    incidentType: '',
    location: '',
    date: '',
    time: '',
    severity: '',
    description: '',
    anonymous: false,
    notifySupervisor: false
  });
  const [error, setError] = useState('');

  const [reports, setReports] = useState([]);

  // Load incidents from data service
  useEffect(() => {
    const incidents = dataService.getIncidents();
    setReports(incidents.slice(0, 5)); // Show 5 most recent
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Simulate error for demonstration
    if (!formData.incidentType || !formData.location || !formData.date || !formData.time || !formData.severity || !formData.description) {
      setError('Please fill out all required fields.');
      return;
    }
    setError('');
    // alert('Incident report submitted successfully!');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleIncidentSubmit = (data) => {
    console.log('Incident submitted:', data);
    // Use data service to save incident
    const savedIncident = dataService.addIncident(data);
    console.log('Saved incident:', savedIncident);
    alert('Incident report submitted successfully!');
    
    // Refresh the reports list
    const incidents = dataService.getIncidents();
    setReports(incidents.slice(0, 5)); // Show 5 most recent
  };

  return (
    <div style={pageStyle}>
      <h1>📝 Incident Reporting</h1>
      
      {/* New Enhanced Incident Report Form */}
      <div style={{ marginBottom: '2rem' }}>
        <IncidentReportForm onSubmit={handleIncidentSubmit} />
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h2>Recent Reports</h2>
        {reports.map(report => (
          <div key={report.id} style={reportCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{report.type}</strong> - {report.severity} - {report.time}
              </div>
              <span style={{
                background: report.status === 'Resolved' ? '#4caf50' :
                  report.status === 'Closed' ? '#666' : '#dc3545',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.8rem'
              }}>
                {report.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncidentReporting; 