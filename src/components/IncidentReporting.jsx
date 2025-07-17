import React, { useState } from 'react';
import '../styles/card.css';
import '../styles/form.css';
import '../styles/badge.css';

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

  const [reports] = useState([
    { id: 1, type: 'Equipment Malfunction', severity: 'Medium', time: '2024-03-15 14:30', status: 'Resolved' },
    { id: 2, type: 'Slip/Trip Hazard', severity: 'Low', time: '2024-03-14 10:00', status: 'Closed' },
    { id: 3, type: 'Chemical Spill', severity: 'High', time: '2024-03-13 16:00', status: 'In Progress' }
  ]);

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

  return (
    <div style={pageStyle}>
      <h1>📝 Incident Reporting</h1>
      <div style={formStyle}>
        <h2>Report New Incident</h2>
        <form onSubmit={handleSubmit} role="form" aria-label="Incident reporting form">
          <div>
            <label htmlFor="incidentType">Incident Type:</label>
            <select
              id="incidentType"
              name="incidentType"
              value={formData.incidentType}
              onChange={handleChange}
              style={inputStyle}
              required
              aria-label="Incident type"
            >
              <option value="">Select incident type...</option>
              <option value="equipment">Equipment Malfunction</option>
              <option value="slip">Slip/Trip Hazard</option>
              <option value="fire">Fire/Smoke</option>
              <option value="chemical">Chemical Spill</option>
              <option value="electrical">Electrical Hazard</option>
              <option value="fall">Fall from Height</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Building, floor, area, or coordinates"
              style={inputStyle}
              required
              aria-label="Location"
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="date">Date:</label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={inputStyle}
                required
                aria-label="Date"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="time">Time:</label>
              <input
                id="time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                style={inputStyle}
                required
                aria-label="Time"
              />
            </div>
          </div>
          <div>
            <label>Severity:</label>
            <div style={{ marginBottom: '1rem' }}>
              {['Low', 'Medium', 'High', 'Critical'].map(level => (
                <label key={level} style={{ marginRight: '1rem' }}>
                  <input
                    type="radio"
                    name="severity"
                    value={level}
                    checked={formData.severity === level}
                    onChange={handleChange}
                    aria-label={level + ' severity'}
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what happened, who was involved, and any immediate actions taken..."
              style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
              required
              aria-label="Description"
            />
          </div>
          <div>
            <label htmlFor="fileUpload">Upload Photos/Videos:</label>
            <input
              id="fileUpload"
              type="file"
              multiple
              accept="image/*,video/*"
              style={inputStyle}
              aria-label="Upload photos or videos"
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="anonymous">
              <input
                id="anonymous"
                type="checkbox"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleChange}
                aria-label="Submit anonymously"
              />
              Submit anonymously
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="notifySupervisor">
              <input
                id="notifySupervisor"
                type="checkbox"
                name="notifySupervisor"
                checked={formData.notifySupervisor}
                onChange={handleChange}
                aria-label="Notify supervisor immediately"
              />
              Notify supervisor immediately
            </label>
          </div>
          {error && (
            <div role="alert" aria-live="assertive" style={{ color: 'var(--color-danger)', marginBottom: '1rem', fontWeight: 600 }}>
              {error}
            </div>
          )}
          <div>
            <button type="submit" style={buttonStyle} aria-label="Submit report">Submit Report</button>
            <button type="button" style={{ ...buttonStyle, background: '#666' }} aria-label="Save draft">Save Draft</button>
            <button type="button" style={{ ...buttonStyle, background: '#dc3545' }} aria-label="Cancel">Cancel</button>
          </div>
        </form>
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