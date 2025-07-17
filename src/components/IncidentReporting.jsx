import React, { useState } from 'react';

const pageStyle = { padding: '2rem', maxWidth: 1200, margin: '0 auto' };
const formStyle = { background: '#f0fdf4', padding: '2rem', borderRadius: 8, marginBottom: '2rem' };
const inputStyle = { width: '100%', padding: '0.75rem', margin: '0.5em 0', border: '1px solid #ccc', borderRadius: 4, fontSize: '1rem' };
const buttonStyle = { background: '#047857', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: 4, cursor: 'pointer', marginRight: '1em', fontSize: '1rem' };
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

  const [reports] = useState([
    { id: 1, type: 'Equipment Malfunction', severity: 'Medium', time: '2024-03-15 14:30', status: 'Resolved' },
    { id: 2, type: 'Slip/Trip Hazard', severity: 'Low', time: '2024-03-14 10:00', status: 'Closed' },
    { id: 3, type: 'Chemical Spill', severity: 'High', time: '2024-03-13 16:00', status: 'In Progress' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Incident report submitted successfully!');
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
        <form onSubmit={handleSubmit}>
          <div>
            <label>Incident Type:</label>
            <select
              name="incidentType"
              value={formData.incidentType}
              onChange={handleChange}
              style={inputStyle}
              required
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
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Building, floor, area, or coordinates"
              style={inputStyle}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Time:</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                style={inputStyle}
                required
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
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what happened, who was involved, and any immediate actions taken..."
              style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
              required
            />
          </div>
          <div>
            <label>Upload Photos/Videos:</label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              <input
                type="checkbox"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleChange}
              />
              Submit anonymously
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>
              <input
                type="checkbox"
                name="notifySupervisor"
                checked={formData.notifySupervisor}
                onChange={handleChange}
              />
              Notify supervisor immediately
            </label>
          </div>
          <div>
            <button type="submit" style={buttonStyle}>Submit Report</button>
            <button type="button" style={{ ...buttonStyle, background: '#666' }}>Save Draft</button>
            <button type="button" style={{ ...buttonStyle, background: '#dc3545' }}>Cancel</button>
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